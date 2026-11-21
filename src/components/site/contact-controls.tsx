"use client";

import { useState } from "react";

export function ContactForm({ copy }: { copy: {
  name: string; email: string; organization: string; service: string; message: string; submit: string; prototypeNote: string; prototypeStatus: string;
} }) {
  const [attempted, setAttempted] = useState(false);
  return (
    <form className="grid gap-5" onSubmit={(event) => { event.preventDefault(); setAttempted(true); }}>
      <p className="text-sm leading-6 text-muted">{copy.prototypeNote}</p>
      <label className="grid gap-2 text-sm font-bold text-navy">{copy.name} *<input autoComplete="name" className="form-control" name="name" required /></label>
      <label className="grid gap-2 text-sm font-bold text-navy">{copy.email} *<input autoComplete="email" className="form-control" name="email" required type="email" /></label>
      <label className="grid gap-2 text-sm font-bold text-navy">{copy.organization}<input autoComplete="organization" className="form-control" name="organization" /></label>
      <label className="grid gap-2 text-sm font-bold text-navy">{copy.service}<input className="form-control" name="service" /></label>
      <label className="grid gap-2 text-sm font-bold text-navy">{copy.message} *<textarea className="form-control min-h-36" name="message" required /></label>
      <button className="inline-flex min-h-12 w-fit items-center justify-center rounded-xl bg-coral px-5 py-3 text-sm font-bold text-navy-deep hover:bg-coral-hover" type="submit">{copy.submit}</button>
      {attempted && <p aria-live="polite" className="rounded-xl bg-stone p-4 text-sm text-navy" role="status">{copy.prototypeStatus}</p>}
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
