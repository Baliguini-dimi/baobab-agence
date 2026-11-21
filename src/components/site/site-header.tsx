"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/content/schema";
import type { SocialLink } from "@/config/contact";
import { Logo } from "@/components/brand/logo";
import { SocialLinks } from "@/components/site/social-links";

type Copy = {
  nav: Record<"home" | "services" | "ai" | "online" | "media" | "contact", string>;
  phone: string;
  email: string;
  address: string;
  socials: string;
  heroCta: string;
};

const servicePaths = {
  digitalSolutions: { fr: "solutions-numeriques", en: "digital-solutions" },
  aiAutomation: { fr: "ia-automatisation", en: "ai-automation" },
  onlinePresence: { fr: "presence-en-ligne", en: "online-presence" },
  mediaCoverage: { fr: "couverture-mediatique", en: "media-coverage" },
} satisfies Record<"digitalSolutions" | "aiAutomation" | "onlinePresence" | "mediaCoverage", Record<Locale, string>>;

export function SiteHeader({
  locale,
  copy,
  page,
  address,
  phone,
  email,
  socials,
  languageHref,
}: {
  locale: Locale;
  copy: Copy;
  page: "home" | "contact";
  address: string;
  phone: string | null;
  email: string | null;
  socials: SocialLink[];
  languageHref?: string;
}) {
  const [compact, setCompact] = useState(false);
  useEffect(() => {
    let previous = false;
    const onScroll = () => {
      const next = window.scrollY > 48;
      if (next !== previous) {
        previous = next;
        setCompact(next);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  const root = "/" + locale;
  const languageTarget = languageHref ?? (locale === "fr" ? "/en" : "/fr") + (page === "contact" ? "/contact" : "");
  const serviceNames = [copy.nav.services, copy.nav.ai, copy.nav.online, copy.nav.media];
  const serviceKeys = ["digitalSolutions", "aiAutomation", "onlinePresence", "mediaCoverage"] as const;

  return <>
    <div className="topbar bg-navy-deep text-cream">
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-2 text-xs sm:px-8">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {phone && <a href={"tel:" + phone}><span className="sr-only">{copy.phone}: </span>{phone}</a>}
          {email && <a href={"mailto:" + email}><span className="sr-only">{copy.email}: </span>{email}</a>}
          <span>{address}</span>
        </div>
        {socials.some((social) => social.url) && <SocialLinks label={copy.socials} links={socials} />}
      </div>
    </div>
    <header className="site-header sticky top-0 z-40 border-b border-navy/10 bg-paper/95 backdrop-blur" data-compact={compact}>
        <div className="site-header-inner mx-auto flex max-w-7xl flex-col gap-3 px-5 py-3 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center justify-between gap-4">
          <Link aria-label="Baobab, accueil" href={root}><Logo /></Link>
          <Link className="rounded-md px-2 py-1 text-xs font-bold text-navy md:hidden" href={languageTarget} lang={locale === "fr" ? "en" : "fr"}>{locale === "fr" ? "EN" : "FR"}</Link>
        </div>
        <nav aria-label={locale === "fr" ? "Navigation principale" : "Main navigation"} className="flex flex-wrap items-center gap-x-5 gap-y-1 text-sm font-semibold text-navy">
          <Link className="py-2 hover:underline hover:decoration-coral hover:underline-offset-4" href={root}>{copy.nav.home}</Link>
          <details className="services-menu relative">
            <summary className="cursor-pointer list-none py-2 hover:underline hover:decoration-coral hover:underline-offset-4">{copy.nav.services}<span aria-hidden="true" className="ml-2 text-xs">⌄</span></summary>
            <div className="services-menu-panel z-50 grid gap-1 bg-paper p-2 md:absolute md:left-0 md:top-full md:min-w-60 md:border md:border-navy/10 md:shadow-card">
              {serviceKeys.map((key, index) => <Link className="px-3 py-2 hover:bg-cream" href={"/" + locale + "/" + servicePaths[key][locale]} key={key}>{serviceNames[index]}</Link>)}
            </div>
          </details>
          <Link className="py-2 hover:underline hover:decoration-coral hover:underline-offset-4" href={"/" + locale + "/" + (locale === "fr" ? "a-propos" : "about")}>{locale === "fr" ? "À propos" : "About"}</Link>
          <Link className="py-2 hover:underline hover:decoration-coral hover:underline-offset-4" href={"/" + locale + "/faq"}>FAQ</Link>
          <Link className="py-2 hover:underline hover:decoration-coral hover:underline-offset-4" href={"/" + locale + "/contact"}>{copy.nav.contact}</Link>
        </nav>
        <div className="flex items-center gap-3">
          <Link aria-label={locale === "fr" ? "English" : "Français"} className="hidden rounded-md px-3 py-2 text-sm font-bold text-navy hover:bg-stone md:inline-flex" href={languageTarget} lang={locale === "fr" ? "en" : "fr"}>{locale === "fr" ? "EN" : "FR"}</Link>
          <Link className="inline-flex min-h-11 items-center justify-center rounded-md bg-coral px-4 py-2 text-sm font-bold text-navy-deep hover:bg-coral-hover" href={"/" + locale + "/contact"}>{copy.heroCta}</Link>
        </div>
      </div>
    </header>
  </>;
}
