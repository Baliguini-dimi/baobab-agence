import { createHmac, randomUUID } from "node:crypto";
import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";
import { Resend } from "resend";
import { contactFieldsSchema, contactSubmissionSchema } from "@/lib/forms/schema";
import { readFormServerEnv } from "@/lib/forms/server-env";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const MAX_BODY_BYTES = 16 * 1024;
const TURNSTILE_VERIFY_URL = "https://challenges.cloudflare.com/turnstile/v0/siteverify";

let rateLimiter: Ratelimit | undefined;

function json(body: { ok: boolean; code?: string }, status: number) {
  return Response.json(body, {
    status,
    headers: {
      "Cache-Control": "no-store, max-age=0",
      "X-Content-Type-Options": "nosniff",
    },
  });
}

function getRateLimiter(env: NonNullable<ReturnType<typeof readFormServerEnv>>) {
  if (!rateLimiter) {
    rateLimiter = new Ratelimit({
      redis: new Redis({ url: env.UPSTASH_REDIS_REST_URL, token: env.UPSTASH_REDIS_REST_TOKEN }),
      limiter: Ratelimit.slidingWindow(5, "10 m"),
      prefix: "baobab:public-forms",
      analytics: false,
    });
  }
  return rateLimiter;
}

async function readBodyWithinLimit(request: Request): Promise<string | null> {
  if (!request.body) return "";
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  let totalBytes = 0;
  let body = "";
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    totalBytes += value.byteLength;
    if (totalBytes > MAX_BODY_BYTES) {
      await reader.cancel();
      return null;
    }
    body += decoder.decode(value, { stream: true });
  }
  body += decoder.decode();
  return body;
}

async function verifyTurnstile(token: string, hostname: string, action: "contact" | "quote", secret: string) {
  const response = await fetch(TURNSTILE_VERIFY_URL, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ secret, response: token, idempotency_key: randomUUID() }),
    cache: "no-store",
    signal: AbortSignal.timeout(6000),
  });
  if (!response.ok) return false;
  const result: unknown = await response.json();
  if (!result || typeof result !== "object") return false;
  const verification = result as { success?: unknown; hostname?: unknown; action?: unknown };
  return verification.success === true && verification.hostname === hostname && verification.action === action;
}

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  let sameOrigin = false;
  try {
    sameOrigin = !!origin && new URL(origin).origin === new URL(request.url).origin;
  } catch {
    sameOrigin = false;
  }
  if (!sameOrigin) {
    return json({ ok: false, code: "ORIGIN_REJECTED" }, 403);
  }

  const contentType = (request.headers.get("content-type") ?? "").split(";")[0]?.trim().toLowerCase();
  if (contentType !== "application/json") {
    return json({ ok: false, code: "UNSUPPORTED_MEDIA_TYPE" }, 415);
  }
  const length = Number(request.headers.get("content-length") ?? 0);
  if (length > MAX_BODY_BYTES) return json({ ok: false, code: "PAYLOAD_TOO_LARGE" }, 413);

  const env = readFormServerEnv();
  if (!env) return json({ ok: false, code: "FORM_SERVICE_UNAVAILABLE" }, 503);

  const rawIp = request.headers.get("x-real-ip")?.trim() || request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const rateId = createHmac("sha256", env.RATE_LIMIT_HASH_SECRET).update(rawIp).digest("hex");
  try {
    const { success } = await getRateLimiter(env).limit(rateId);
    if (!success) return json({ ok: false, code: "RATE_LIMITED" }, 429);
  } catch {
    // Fail closed: do not send form data when the distributed limiter is unavailable.
    return json({ ok: false, code: "FORM_SERVICE_UNAVAILABLE" }, 503);
  }

  let rawBody: string | null;
  try {
    rawBody = await readBodyWithinLimit(request);
  } catch {
    return json({ ok: false, code: "INVALID_INPUT" }, 400);
  }
  if (rawBody === null) return json({ ok: false, code: "PAYLOAD_TOO_LARGE" }, 413);

  let input: unknown;
  try {
    input = JSON.parse(rawBody);
  } catch {
    return json({ ok: false, code: "INVALID_INPUT" }, 400);
  }

  const fields = contactFieldsSchema.safeParse(input);
  if (!fields.success) return json({ ok: false, code: "INVALID_INPUT" }, 400);
  if (fields.data.website) return json({ ok: true }, 200);

  const submission = contactSubmissionSchema.safeParse(input);
  if (!submission.success) return json({ ok: false, code: "INVALID_INPUT" }, 400);
  let verified = false;
  try {
    verified = await verifyTurnstile(
      submission.data.turnstileToken,
      env.TURNSTILE_EXPECTED_HOSTNAME,
      submission.data.requestType,
      env.TURNSTILE_SECRET_KEY,
    );
  } catch {
    return json({ ok: false, code: "FORM_SERVICE_UNAVAILABLE" }, 503);
  }
  if (!verified) return json({ ok: false, code: "INVALID_INPUT" }, 400);

  const { locale, requestType, name, email, phone, organization, service, message } = submission.data;
  const isFrench = locale === "fr";
  const subject = requestType === "quote"
    ? (isFrench ? "Demande de devis Baobab" : "Baobab quote request")
    : (isFrench ? "Message de contact Baobab" : "Baobab contact message");
  const text = [
    `Type: ${requestType}`,
    `${isFrench ? "Nom" : "Name"}: ${name}`,
    `Email: ${email}`,
    phone ? `${isFrench ? "Téléphone" : "Phone"}: ${phone}` : "",
    organization ? `Organisation: ${organization}` : "",
    service ? `Service: ${service}` : "",
    "",
    message,
  ].filter(Boolean).join("\n");

  try {
    const resend = new Resend(env.RESEND_API_KEY);
    const { error } = await resend.emails.send({
      from: env.RESEND_FROM_EMAIL,
      to: [env.CONTACT_TO_EMAIL],
      replyTo: email,
      subject,
      text,
    });
    if (error) return json({ ok: false, code: "FORM_SERVICE_UNAVAILABLE" }, 502);
  } catch {
    return json({ ok: false, code: "FORM_SERVICE_UNAVAILABLE" }, 502);
  }
  return json({ ok: true }, 200);
}
