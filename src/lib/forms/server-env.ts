import { z } from "zod";

const serverEnvSchema = z.object({
  TURNSTILE_SECRET_KEY: z.string().min(1),
  TURNSTILE_EXPECTED_HOSTNAME: z.string().trim().toLowerCase().min(1),
  UPSTASH_REDIS_REST_URL: z.url().refine((value) => new URL(value).protocol === "https:"),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
  RATE_LIMIT_HASH_SECRET: z.string().regex(/^[a-f0-9]{64}$/i),
  RESEND_API_KEY: z.string().min(1),
  RESEND_FROM_EMAIL: z.email(),
  CONTACT_TO_EMAIL: z.email(),
});

export type FormServerEnv = z.infer<typeof serverEnvSchema>;

export function readFormServerEnv(): FormServerEnv | null {
  const result = serverEnvSchema.safeParse(process.env);
  return result.success ? result.data : null;
}
