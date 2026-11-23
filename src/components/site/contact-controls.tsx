"use client";

import Script from "next/script";
import { useCallback, useEffect, useRef, useState, type FormEvent } from "react";
import { contactFieldsSchema, contactSubmissionSchema } from "@/lib/forms/schema";
import type { Locale } from "@/content/schema";

type TurnstileApi = {
  render: (target: HTMLElement, options: {
    sitekey: string;
    action: "contact" | "quote";
    callback: (token: string) => void;
    "expired-callback": () => void;
    "error-callback": () => void;
  }) => string;
  remove: (widgetId: string) => void;
  reset: (widgetId: string) => void;
};

declare global {
  interface Window { turnstile?: TurnstileApi; }
}

function TurnstileWidget({ siteKey, action, nonce, onToken, failed }: {
  siteKey: string; action: "contact" | "quote"; nonce?: string; onToken: (token: string) => void; failed: () => void;
}) {
  const target = useRef<HTMLDivElement>(null);
  const widgetId = useRef<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!ready || !target.current || !window.turnstile) return;
    widgetId.current = window.turnstile.render(target.current, {
      sitekey: siteKey,
      action,
      callback: onToken,
      "expired-callback": () => {
        failed();
        if (widgetId.current) window.turnstile?.reset(widgetId.current);
      },
      "error-callback": failed,
    });
    return () => {
      if (widgetId.current) window.turnstile?.remove(widgetId.current);
      widgetId.current = null;
    };
  }, [action, failed, onToken, ready, siteKey]);

  return <>
    <Script nonce={nonce} onReady={() => setReady(true)} src="https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit" strategy="afterInteractive" />
    <div aria-label="Cloudflare Turnstile" ref={target} />
  </>;
}

export function ContactForm({ copy, locale, nonce }: { locale: Locale; nonce?: string; copy: {
  name: string; email: string; organization: string; message: string; submit: string;
  phone: string; requestSubject: string; contactRequest: string; quoteDigital: string; quoteAi: string;
  quotePresence: string; quoteMedia: string; quoteOther: string;
  namePlaceholder: string; emailPlaceholder: string; phonePlaceholder: string; organizationPlaceholder: string; messagePlaceholder: string;
  privacyNotice: string; validationError: string; captchaRequired: string; captchaUnavailable: string;
  sending: string; sent: string; serverError: string; rateLimitError: string; honeypotLabel: string;
} }) {
  const siteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const [requestSubject, setRequestSubject] = useState("quote-digital");
  const [token, setToken] = useState("");
  const [status, setStatus] = useState("");
  const [sending, setSending] = useState(false);
  const [captchaRevision, setCaptchaRevision] = useState(0);
  const onToken = useCallback((next: string) => setToken(next), []);
  const onCaptchaFailure = useCallback(() => setToken(""), []);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("");
    const form = event.currentTarget;
    const formData = new FormData(form);
    const fields = contactFieldsSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!fields.success) { setStatus(copy.validationError); return; }
    if (!siteKey) { setStatus(copy.captchaUnavailable); return; }
    if (!token) { setStatus(copy.captchaRequired); return; }
    const submission = contactSubmissionSchema.safeParse({ ...fields.data, turnstileToken: token });
    if (!submission.success) { setStatus(copy.validationError); return; }

    setSending(true);
    try {
      const response = await fetch("/api/forms", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(submission.data),
      });
      if (response.ok) {
        setStatus(copy.sent);
        form.reset();
        setToken("");
      } else if (response.status === 429) {
        setStatus(copy.rateLimitError);
      } else {
        setStatus(copy.serverError);
      }
    } catch {
      setStatus(copy.serverError);
    } finally {
      setSending(false);
      setToken("");
      setCaptchaRevision((revision) => revision + 1);
    }
  }

  return (
    <form className="grid gap-5" noValidate onSubmit={submit}>
      <input name="locale" type="hidden" value={locale} />
      <label className="grid gap-2 text-sm font-bold text-navy">{copy.requestSubject} *<select className="form-control" name="requestSubject" onChange={(event) => { setRequestSubject(event.target.value); setToken(""); }} value={requestSubject}><option value="quote-digital">{copy.quoteDigital}</option><option value="quote-ai">{copy.quoteAi}</option><option value="quote-presence">{copy.quotePresence}</option><option value="quote-media">{copy.quoteMedia}</option><option value="quote-other">{copy.quoteOther}</option><option value="contact">{copy.contactRequest}</option></select></label>
      <label className="grid gap-2 text-sm font-bold text-navy">{copy.name} *<input autoComplete="name" className="form-control" maxLength={120} name="name" placeholder={copy.namePlaceholder} required /></label>
      <label className="grid gap-2 text-sm font-bold text-navy">{copy.email} *<input autoComplete="email" className="form-control" maxLength={254} name="email" placeholder={copy.emailPlaceholder} required type="email" /></label>
      <label className="grid gap-2 text-sm font-bold text-navy">{copy.phone}<input autoComplete="tel" className="form-control" maxLength={32} name="phone" placeholder={copy.phonePlaceholder} type="tel" /></label>
      <label className="grid gap-2 text-sm font-bold text-navy">{copy.organization}<input autoComplete="organization" className="form-control" maxLength={160} name="organization" placeholder={copy.organizationPlaceholder} /></label>
      <label className="grid gap-2 text-sm font-bold text-navy">{copy.message} *<textarea className="form-control min-h-36" maxLength={5000} minLength={10} name="message" placeholder={copy.messagePlaceholder} required /></label>
      <div aria-hidden="true" className="form-honeypot"><label>{copy.honeypotLabel}<input autoComplete="off" name="website" tabIndex={-1} type="text" /></label></div>
      {siteKey ? <TurnstileWidget action={requestSubject === "contact" ? "contact" : "quote"} failed={onCaptchaFailure} key={captchaRevision} nonce={nonce} onToken={onToken} siteKey={siteKey} /> : <p className="text-sm text-muted">{copy.captchaUnavailable}</p>}
      <p className="text-xs leading-5 text-muted">{copy.privacyNotice}</p>
      <button className="inline-flex min-h-12 w-fit items-center justify-center rounded-xl bg-coral px-5 py-3 text-sm font-bold text-navy-deep disabled:cursor-not-allowed disabled:opacity-60" disabled={sending || !siteKey} type="submit">{sending ? copy.sending : copy.submit}</button>
      {status && <p aria-live="polite" className="rounded-xl bg-stone p-4 text-sm text-navy" role="status">{status}</p>}
    </form>
  );
}

export function MapEmbed({ copy, query }: { copy: { mapButton: string; mapTitle: string }; query: string }) {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      {!visible ? (
        <button className="inline-flex min-h-12 items-center justify-center rounded-xl border border-navy/20 px-5 py-3 text-sm font-bold text-navy hover:bg-navy/5" onClick={() => setVisible(true)} type="button">{copy.mapButton}</button>
      ) : (
        <iframe className="aspect-video w-full rounded-2xl border-0" loading="lazy" referrerPolicy="no-referrer-when-downgrade" src={`https://www.google.com/maps?q=${encodeURIComponent(query)}&output=embed`} title={copy.mapTitle} />
      )}
    </div>
  );
}
