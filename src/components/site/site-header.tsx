import Link from "next/link";
import type { Locale } from "@/content/schema";
import { Logo } from "@/components/brand/logo";
import { ExternalArrowIcon } from "@/components/ui/external-arrow-icon";
import { HeaderScrollController } from "@/components/site/header-scroll-controller";
import { MobileMenu } from "@/components/site/mobile-menu";

type HeaderCopy = {
  nav: Record<"home" | "services" | "digital" | "ai" | "online" | "media" | "contact", string>;
  phone: string;
  call: string;
  email: string;
  address: string;
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
  address,
  phone,
  phoneDisplay,
  email,
  hoursLabel,
  hoursSummary,
  currentPath,
  languageHref,
}: {
  locale: Locale;
  copy: HeaderCopy;
  address: string;
  phone: string | null;
  phoneDisplay: string | null;
  email: string | null;
  hoursLabel: string;
  hoursSummary: string;
  currentPath: string;
  languageHref?: string;
}) {
  const root = "/" + locale;
  const languageTarget = languageHref ?? (locale === "fr" ? "/en" : "/fr");
  const contactHref = root + "/contact";
  const serviceNames = [copy.nav.digital, copy.nav.ai, copy.nav.online, copy.nav.media];
  const serviceKeys = ["digitalSolutions", "aiAutomation", "onlinePresence", "mediaCoverage"] as const;
  const serviceHref = (key: (typeof serviceKeys)[number]) => `/${locale}/${servicePaths[key][locale]}`;
  const currentService = serviceKeys.some((key) => currentPath === serviceHref(key));
  const isCurrent = (href: string) => currentPath === href;

  return <>
    <div className="header-topbar" data-header-topbar>
      <div className="header-topbar-inner mx-auto flex min-h-9 max-w-7xl items-center justify-between gap-5 px-5 sm:px-8">
        <div className="topbar-details flex-wrap items-center gap-x-5 gap-y-2 text-xs">
          {phone && <a href={`tel:${phone}`}><span className="sr-only">{copy.phone}: </span>{phoneDisplay}</a>}
          {email && <a href={`mailto:${email}`}><span className="sr-only">{copy.email}: </span>{email}</a>}
          <span><span className="sr-only">{copy.address}: </span>{address}</span>
          <span><span className="sr-only">{hoursLabel}: </span>{hoursSummary}</span>
        </div>
        {phone && <a className="topbar-call-mobile inline-flex min-h-9 items-center font-bold md:hidden" href={`tel:${phone}`}>{copy.call}</a>}
      </div>
    </div>
    <header className="site-header sticky top-0 z-40" data-baobab-header data-compact="false">
      <div className="site-header-inner mx-auto flex max-w-7xl items-center justify-between gap-3 px-5 sm:px-8">
        <Link aria-label="Baobab" aria-current={isCurrent(root) ? "page" : undefined} className="brand-panel" href={root}>
          <Logo className="brand-logo-header" decorative tone="light" />
        </Link>
        <nav aria-label={locale === "fr" ? "Navigation principale" : "Main navigation"} className="primary-navigation items-center text-sm font-semibold text-navy">
          <Link aria-current={isCurrent(root) ? "page" : undefined} className="primary-nav-link" href={root}>{copy.nav.home}</Link>
          <details className="services-menu relative">
            <summary aria-current={currentService ? "page" : undefined} className="primary-nav-link cursor-pointer list-none">{copy.nav.services}<span aria-hidden="true" className="ml-2 text-xs">⌄</span></summary>
            <div className="services-menu-panel z-50 grid gap-1 bg-paper p-2 md:absolute md:left-0 md:top-full md:min-w-60 md:border md:border-navy/10 md:shadow-card">
              {serviceKeys.map((key, index) => {
                const href = serviceHref(key);
                return <Link aria-current={isCurrent(href) ? "page" : undefined} className="service-menu-link" href={href} key={key}>{serviceNames[index]}</Link>;
              })}
            </div>
          </details>
          <Link aria-current={isCurrent(`${root}/${locale === "fr" ? "a-propos" : "about"}`) ? "page" : undefined} className="primary-nav-link" href={`${root}/${locale === "fr" ? "a-propos" : "about"}`}>{locale === "fr" ? "À propos" : "About"}</Link>
          <Link aria-current={isCurrent(`${root}/faq`) ? "page" : undefined} className="primary-nav-link" href={`${root}/faq`}>FAQ</Link>
          <Link aria-current={isCurrent(contactHref) ? "page" : undefined} className="primary-nav-link" href={contactHref}>{copy.nav.contact}</Link>
        </nav>
        <div className="desktop-header-actions items-center gap-3">
          <Link aria-label={locale === "fr" ? "English" : "Français"} className="language-switch" href={languageTarget} lang={locale === "fr" ? "en" : "fr"}>{locale === "fr" ? "EN" : "FR"}</Link>
          <Link className="header-quote-button inline-flex min-h-11 items-center justify-center gap-1 rounded-md bg-coral px-4 py-2 text-sm font-bold text-navy-deep" href={contactHref}>{copy.heroCta}<ExternalArrowIcon /></Link>
        </div>
      </div>
      <MobileMenu locale={locale} copy={copy} root={root} contactHref={contactHref} currentPath={currentPath} languageTarget={languageTarget} />
      <HeaderScrollController />
    </header>
  </>;
}
