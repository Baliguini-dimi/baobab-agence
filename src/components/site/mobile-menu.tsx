"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import type { Locale } from "@/content/schema";
import { ExternalArrowIcon } from "@/components/ui/external-arrow-icon";

type MenuCopy = {
  nav: Record<"home" | "services" | "digital" | "ai" | "online" | "media" | "contact", string>;
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

export function MobileMenu({ locale, copy, root, contactHref, currentPath, languageTarget }: {
  locale: Locale;
  copy: MenuCopy;
  root: string;
  contactHref: string;
  currentPath: string;
  languageTarget: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);
  const navigation = useRef<HTMLElement>(null);
  const serviceKeys = ["digitalSolutions", "aiAutomation", "onlinePresence", "mediaCoverage"] as const;
  const serviceNames = [copy.nav.digital, copy.nav.ai, copy.nav.online, copy.nav.media];

  useEffect(() => {
    if (!menuOpen) return;
    navigation.current?.querySelector<HTMLElement>("a, button")?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        requestAnimationFrame(() => menuButton.current?.focus());
        return;
      }
      if (event.key !== "Tab" || !navigation.current) return;
      const items = Array.from(navigation.current.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"));
      if (!items.length) return;
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

  const closeMenu = () => setMenuOpen(false);
  const linkProps = (href: string) => ({ "aria-current": currentPath === href ? "page" as const : undefined, onClick: closeMenu });

  return <>
    <div className="mobile-header-controls">
      <Link aria-label={locale === "fr" ? "English" : "Français"} className="mobile-language-switch" href={languageTarget} lang={locale === "fr" ? "en" : "fr"}>{locale === "fr" ? "EN" : "FR"}</Link>
      <button
        aria-controls="mobile-navigation"
        aria-expanded={menuOpen}
        aria-label={menuOpen ? copy.closeMenu : copy.openMenu}
        className="menu-toggle inline-flex size-10 items-center justify-center rounded-md text-cream focus-visible:outline-offset-2"
        onClick={() => setMenuOpen((open) => !open)}
        ref={menuButton}
        type="button"
      >
        {menuOpen ? <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24"><path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" /></svg> : <svg aria-hidden="true" className="size-6" fill="none" viewBox="0 0 24 24"><path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeLinecap="round" strokeWidth="1.8" /></svg>}
      </button>
    </div>
    <nav aria-label={locale === "fr" ? "Navigation mobile" : "Mobile navigation"} className="mobile-navigation-panel" hidden={!menuOpen} id="mobile-navigation" ref={navigation}>
      <div className="mx-auto grid max-w-7xl gap-1 px-5 py-4 sm:px-8">
        <Link className="mobile-navigation-link" href={root} {...linkProps(root)}>{copy.nav.home}</Link>
        <p className="mobile-navigation-label">{copy.nav.services}</p>
        {serviceKeys.map((key, index) => {
          const href = `/${locale}/${servicePaths[key][locale]}`;
          return <Link aria-current={currentPath === href ? "page" : undefined} className="mobile-navigation-link mobile-service-link" href={href} key={key} onClick={closeMenu}>{serviceNames[index]}</Link>;
        })}
        <Link className="mobile-navigation-link" href={`${root}/${locale === "fr" ? "a-propos" : "about"}`} {...linkProps(`${root}/${locale === "fr" ? "a-propos" : "about"}`)}>{locale === "fr" ? "À propos" : "About"}</Link>
        <Link className="mobile-navigation-link" href={`${root}/faq`} {...linkProps(`${root}/faq`)}>FAQ</Link>
        <Link className="mobile-navigation-link" href={contactHref} {...linkProps(contactHref)}>{copy.nav.contact}</Link>
        <Link className="mobile-quote-button mt-3 inline-flex min-h-12 items-center justify-center gap-1 rounded-md bg-accent px-4 py-3 text-center text-sm font-bold text-navy" href={contactHref} onClick={closeMenu}>{copy.heroCta}<ExternalArrowIcon /></Link>
      </div>
    </nav>
  </>;
}
