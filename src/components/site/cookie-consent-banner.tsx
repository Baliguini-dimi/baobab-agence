"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import type { Locale } from "@/content/schema";

type ConsentChoice = "essential" | "tracking";
const consentEvent = "baobab-consent-updated";
let consentChosenInCurrentTab = false;

function subscribeConsent(callback: () => void) {
  window.addEventListener(consentEvent, callback);
  return () => window.removeEventListener(consentEvent, callback);
}

function hasConsentChoice() {
  return consentChosenInCurrentTab || document.cookie.split(";").some((entry) => entry.trim().startsWith("baobab-cookie-consent="));
}

export function CookieConsentBanner({ copy, locale }: { locale: Locale; copy: {
  title: string; body: string; reject: string; accept: string; details: string;
} }) {
  const visible = !useSyncExternalStore(subscribeConsent, hasConsentChoice, () => false);

  function choose(choice: ConsentChoice) {
    const secure = window.location.protocol === "https:" ? "; Secure" : "";
    document.cookie = `baobab-cookie-consent=${choice}; Path=/; Max-Age=31536000; SameSite=Lax${secure}`;
    consentChosenInCurrentTab = true;
    window.dispatchEvent(new Event(consentEvent));
  }

  if (!visible) return null;
  return <aside aria-label={copy.title} className="cookie-consent" role="region">
    <div className="cookie-consent-copy"><h2 className="font-display text-lg font-extrabold text-navy">{copy.title}</h2><p className="mt-2 max-w-3xl text-sm leading-6 text-muted">{copy.body} <Link className="font-bold text-navy underline underline-offset-4" href={`/${locale}/cookies`}>{copy.details}</Link></p></div>
    <div className="flex shrink-0 flex-wrap gap-2"><button className="cookie-consent-reject" onClick={() => choose("essential")} type="button">{copy.reject}</button><button className="cookie-consent-accept" onClick={() => choose("tracking")} type="button">{copy.accept}</button></div>
  </aside>;
}
