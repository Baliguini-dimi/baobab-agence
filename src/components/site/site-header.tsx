"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import type { Locale } from "@/content/schema";
import type { SocialLink } from "@/config/contact";
import { Logo } from "@/components/brand/logo";
import { SocialLinks } from "@/components/site/social-links";

type Copy = {
  nav: Record<"home" | "services" | "ai" | "online" | "media" | "projects" | "blog" | "contact", string>;
  phone: string; email: string; address: string; socials: string;
};

export function SiteHeader({
  locale,
  copy,
  page,
  address,
  phone,
  email,
  socials,
}: {
  locale: Locale;
  copy: Copy;
  page: "home" | "contact";
  address: string;
  phone: string | null;
  email: string | null;
  socials: SocialLink[];
}) {
  const [compact, setCompact] = useState(false);

  useEffect(() => {
    let lastCompact = false;
    const onScroll = () => {
      const nextCompact = window.scrollY > 48;
      if (nextCompact !== lastCompact) {
        lastCompact = nextCompact;
        setCompact(nextCompact);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const root = `/${locale}`;
  const sectionPath = page === "home" ? "" : `${root}/`;
  const navItems = [
    [copy.nav.home, root],
    [copy.nav.services, `${sectionPath}#services`],
    [copy.nav.ai, `${sectionPath}#ia`],
    [copy.nav.online, `${sectionPath}#presence-en-ligne`],
    [copy.nav.media, `${sectionPath}#couverture-mediatique`],
    [copy.nav.projects, `${sectionPath}#realisations`],
    [copy.nav.blog, `${sectionPath}#blog`],
    [copy.nav.contact, `${root}/contact`],
  ] as const;

  return (
    <>
      <div className="topbar bg-navy-deep text-cream">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-x-6 gap-y-2 px-5 py-2 text-xs sm:px-8">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {phone && <a href={`tel:${phone}`}><span className="sr-only">{copy.phone}: </span>{phone}</a>}
            {email && <a href={`mailto:${email}`}><span className="sr-only">{copy.email}: </span>{email}</a>}
            <span>{address}</span>
          </div>
          {socials.length > 0 && <SocialLinks label={copy.socials} links={socials} />}
        </div>
      </div>
      <header className="site-header sticky top-0 z-40 border-b border-navy/10 bg-paper/95 backdrop-blur" data-compact={compact}>
        <div className="site-header-inner mx-auto flex max-w-7xl flex-col gap-2 px-5 py-3 sm:px-8 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center justify-between gap-4">
            <Link aria-label="Baobab, accueil" href={root}><Logo /></Link>
            <div className="flex items-center gap-1 md:hidden">
              <Link className="rounded-md px-2 py-1 text-xs font-bold text-navy" href={`${locale === "fr" ? "/en" : "/fr"}${page === "contact" ? "/contact" : ""}`} lang={locale === "fr" ? "en" : "fr"}>{locale === "fr" ? "EN" : "FR"}</Link>
            </div>
          </div>
          <nav aria-label={locale === "fr" ? "Navigation principale" : "Main navigation"} className="flex max-w-full gap-4 overflow-x-auto pb-1 text-xs font-semibold text-navy sm:gap-5 md:items-center md:pb-0 md:text-sm">
            {navItems.map(([label, href]) => <Link className="shrink-0 py-2 hover:text-coral-hover" href={href} key={href}>{label}</Link>)}
          </nav>
          <div className="hidden shrink-0 gap-1 md:flex">
            <Link aria-label={locale === "fr" ? "English" : "Français"} className={`rounded-lg px-3 py-2 text-sm font-bold ${locale === "fr" ? "bg-navy text-cream" : "text-navy hover:bg-stone"}`} href={`${locale === "fr" ? "/en" : "/fr"}${page === "contact" ? "/contact" : ""}`} lang={locale === "fr" ? "en" : "fr"}>{locale === "fr" ? "EN" : "FR"}</Link>
          </div>
        </div>
      </header>
    </>
  );
}
