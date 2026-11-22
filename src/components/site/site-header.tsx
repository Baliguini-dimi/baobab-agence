"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/content/schema";
import type { SocialLink } from "@/config/contact";
import { Logo } from "@/components/brand/logo";
import { SocialLinks } from "@/components/site/social-links";

type Copy = {
  nav: Record<"home" | "services" | "digital" | "ai" | "online" | "media" | "contact", string>;
  phone: string;
  call: string;
  email: string;
  address: string;
  socials: string;
  heroCta: string;
  openMenu: string;
  closeMenu: string;
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
  phoneDisplay,
  email,
  socials,
  languageHref,
}: {
  locale: Locale;
  copy: Copy;
  page: "home" | "contact";
  address: string;
  phone: string | null;
  phoneDisplay: string | null;
  email: string | null;
  socials: SocialLink[];
  languageHref?: string;
}) {
  const [compact, setCompact] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const mobileNavigation = useRef<HTMLElement>(null);

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

  useEffect(() => {
    if (!menuOpen) return;
    mobileNavigation.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        requestAnimationFrame(() => menuButton.current?.focus());
        return;
      }
      if (event.key !== "Tab" || !mobileNavigation.current) return;
      const items = Array.from(mobileNavigation.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
      if (items.length === 0) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [menuOpen]);

  const root = "/" + locale;
  const languageTarget = languageHref ?? (locale === "fr" ? "/en" : "/fr") + (page === "contact" ? "/contact" : "");
  const serviceNames = [copy.nav.digital, copy.nav.ai, copy.nav.online, copy.nav.media];
  const serviceKeys = ["digitalSolutions", "aiAutomation", "onlinePresence", "mediaCoverage"] as const;
  const aboutHref = root + "/" + (locale === "fr" ? "a-propos" : "about");
  const contactHref = root + "/contact";
  const languageLabel = locale === "fr" ? "EN" : "FR";

  return <>
    <div className="topbar bg-navy-deep text-cream">
      <div className="mx-auto flex min-h-9 max-w-7xl items-center justify-between gap-4 px-5 text-xs sm:px-8">
        <div className="hidden flex-wrap items-center gap-x-5 gap-y-2 md:flex">
          {phone && <a href={"tel:" + phone}><span className="sr-only">{copy.phone}: </span>{phoneDisplay}</a>}
          {email && <a href={"mailto:" + email}><span className="sr-only">{copy.email}: </span>{email}</a>}
          <span>{address}</span>
        </div>
        {phone && <a className="topbar-call-mobile inline-flex min-h-8 items-center rounded-sm font-bold md:hidden" href={"tel:" + phone}>{copy.call}</a>}
        {socials.some((social) => social.url) && <SocialLinks className="hidden md:flex" label={copy.socials} links={socials} />}
      </div>
    </div>
    <header className="site-header sticky top-0 z-40 border-b border-navy/10 bg-paper/95 backdrop-blur" data-compact={compact}>
      <div className="site-header-inner mx-auto flex h-14 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8 md:h-[4.25rem]">
        <Link aria-label="Baobab, accueil" href={root} onClick={() => setMenuOpen(false)}><Logo /></Link>
        <div className="mobile-header-controls flex items-center gap-2 md:hidden">
          <Link aria-label={locale === "fr" ? "English" : "Français"} className="rounded-md px-2 py-2 text-xs font-bold text-navy" href={languageTarget} lang={locale === "fr" ? "en" : "fr"}>{languageLabel}</Link>
          <button
            aria-controls="mobile-navigation"
            aria-expanded={menuOpen}
            aria-label={menuOpen ? copy.closeMenu : copy.openMenu}
            className="menu-toggle inline-flex size-10 items-center justify-center rounded-md text-navy hover:bg-cream focus-visible:outline-offset-2"
            onClick={() => setMenuOpen((open) => !open)}
            ref={menuButton}
            type="button"
          >
            {menuOpen ? (
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" className="size-6"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" /></svg>
            ) : (
              <svg aria-hidden="true" fill="none" viewBox="0 0 24 24" className="size-6"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" /></svg>
            )}
          </button>
        </div>
        <nav aria-label={locale === "fr" ? "Navigation principale" : "Main navigation"} className="hidden items-center gap-x-5 gap-y-1 text-sm font-semibold text-navy md:flex">
          <Link className="py-2 hover:underline hover:decoration-coral hover:underline-offset-4" href={root}>{copy.nav.home}</Link>
          <details className="services-menu relative">
            <summary className="cursor-pointer list-none py-2 hover:underline hover:decoration-coral hover:underline-offset-4">{copy.nav.services}<span aria-hidden="true" className="ml-2 text-xs">⌄</span></summary>
            <div className="services-menu-panel z-50 grid gap-1 bg-paper p-2 md:absolute md:left-0 md:top-full md:min-w-60 md:border md:border-navy/10 md:shadow-card">
              {serviceKeys.map((key, index) => <Link className="px-3 py-2 hover:bg-cream" href={"/" + locale + "/" + servicePaths[key][locale]} key={key}>{serviceNames[index]}</Link>)}
            </div>
          </details>
          <Link className="py-2 hover:underline hover:decoration-coral hover:underline-offset-4" href={aboutHref}>{locale === "fr" ? "À propos" : "About"}</Link>
          <Link className="py-2 hover:underline hover:decoration-coral hover:underline-offset-4" href={root + "/faq"}>FAQ</Link>
          <Link className="py-2 hover:underline hover:decoration-coral hover:underline-offset-4" href={contactHref}>{copy.nav.contact}</Link>
        </nav>
        <div className="hidden items-center gap-3 md:flex">
          <Link aria-label={locale === "fr" ? "English" : "Français"} className="rounded-md px-3 py-2 text-sm font-bold text-navy hover:bg-stone" href={languageTarget} lang={locale === "fr" ? "en" : "fr"}>{languageLabel}</Link>
          <Link className="inline-flex min-h-11 items-center justify-center rounded-md bg-coral px-4 py-2 text-sm font-bold text-navy-deep hover:bg-coral-hover" href={contactHref}>{copy.heroCta}</Link>
        </div>
      </div>
      <nav
        aria-label={locale === "fr" ? "Navigation mobile" : "Mobile navigation"}
        className="mobile-navigation-panel md:hidden"
        hidden={!menuOpen}
        id="mobile-navigation"
        ref={mobileNavigation}
      >
        <div className="mx-auto grid max-w-7xl gap-1 px-5 py-4 sm:px-8">
          <Link className="mobile-navigation-link" href={root} onClick={() => setMenuOpen(false)}>{copy.nav.home}</Link>
          <p className="mobile-navigation-label">{copy.nav.services}</p>
          {serviceKeys.map((key, index) => <Link className="mobile-navigation-link mobile-service-link" href={"/" + locale + "/" + servicePaths[key][locale]} key={key} onClick={() => setMenuOpen(false)}>{serviceNames[index]}</Link>)}
          <Link className="mobile-navigation-link" href={aboutHref} onClick={() => setMenuOpen(false)}>{locale === "fr" ? "À propos" : "About"}</Link>
          <Link className="mobile-navigation-link" href={root + "/faq"} onClick={() => setMenuOpen(false)}>FAQ</Link>
          <Link className="mobile-navigation-link" href={contactHref} onClick={() => setMenuOpen(false)}>{copy.nav.contact}</Link>
          <Link className="mobile-quote-button mt-3 inline-flex min-h-12 items-center justify-center rounded-md bg-coral px-4 py-3 text-center text-sm font-bold text-navy-deep" href={contactHref} onClick={() => setMenuOpen(false)}>{copy.heroCta}</Link>
        </div>
      </nav>
    </header>
  </>;
}
