import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import type { Locale } from "@/content/schema";
import { locales } from "@/content/schema";
import { pageCopy, pageSlugs, getPageKey, type SeoPageKey } from "@/content/seo-pages";
import { pageMetadata, jsonLd, localizedPath } from "@/lib/seo";
import { agencyContact } from "@/config/contact";
import { agencyMedia } from "@/config/media";
import { getOffers, getPosts, getProjects, getPresencePlanCatalog } from "@/content/queries";
import { formatIndicativeUsd, usdReference } from "@/config/currency";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { ServicePlanComparison } from "@/components/site/service-plan-comparison";
import messagesFr from "@/messages/fr.json";
import messagesEn from "@/messages/en.json";
import { PreviewImageGallery } from "@/components/site/preview-image-gallery";

const dictionaries = { fr: messagesFr, en: messagesEn };

export async function generateMetadata({ params }: { params: Promise<{ locale: string; section: string }> }): Promise<Metadata> {
  const { locale: rawLocale, section } = await params;
  if (!locales.includes(rawLocale as Locale)) return {};
  const locale = rawLocale as Locale;
  const key = getPageKey(locale, section);
  if (!key) return {};
  const copy = pageCopy[locale][key];
  return pageMetadata({
    locale,
    title: copy.title,
    description: copy.description,
    frPath: localizedPath("fr", `/${pageSlugs[key].fr}`, `/${pageSlugs[key].en}`),
    enPath: localizedPath("en", `/${pageSlugs[key].fr}`, `/${pageSlugs[key].en}`),
    noindex: key === "legal" || key === "privacy" || key === "equipment",
  });
}

function getServiceCategory(key: SeoPageKey) {
  if (key === "digital-solutions") return "digitalSolutions";
  if (key === "ai-automation") return "aiAutomation";
  if (key === "online-presence") return "onlinePresence";
  if (key === "media-coverage") return "mediaCoverage";
  return null;
}

export default async function ContentPage({ params }: { params: Promise<{ locale: string; section: string }> }) {
  const { locale: rawLocale, section } = await params;
  if (!locales.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;
  const key = getPageKey(locale, section);
  if (!key) notFound();
  const copy = pageCopy[locale][key];
  const dict = dictionaries[locale];
  const category = getServiceCategory(key);
  const [offers, planCatalog, projects, posts, requestHeaders] = await Promise.all([
    getOffers(),
    getPresencePlanCatalog(),
    getProjects(),
    getPosts(),
    headers(),
  ]);
  if (key === "projects" && projects.length === 0) notFound();
  if (key === "blog" && posts.length === 0) notFound();
  const nonce = requestHeaders.get("x-nonce") ?? undefined;
  const languagePath = (value: Locale) => localizedPath(value, `/${pageSlugs[key].fr}`, `/${pageSlugs[key].en}`);
  const currentUrl = languagePath(locale);
  const breadcrumbs = [
    { name: locale === "fr" ? "Accueil" : "Home", item: `/${locale}` },
    { name: copy.title, item: currentUrl },
  ];
  const faqSchema = key === "faq" ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: copy.sections.map(({ heading, body }) => ({ "@type": "Question", name: heading, acceptedAnswer: { "@type": "Answer", text: body } })),
  } : null;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map(({ name, item }, index) => ({ "@type": "ListItem", position: index + 1, name, item })),
  };
  const serviceSchema = category ? {
    "@context": "https://schema.org",
    "@type": "Service",
    name: copy.title,
    description: copy.description,
    areaServed: { "@type": "City", name: "Abidjan" },
    provider: { "@type": "Organization", name: "Baobab", telephone: agencyContact.phone, email: agencyContact.email },
  } : null;
  const pageOffers = category ? offers.filter((offer) => offer.category === category) : [];
  return <>
    {faqSchema && <script nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />}
    {breadcrumbSchema && <script nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />}
    {serviceSchema && <script nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(serviceSchema) }} />}
    <SiteHeader locale={locale} copy={dict.home} address={agencyContact.address} phone={agencyContact.phone} phoneDisplay={agencyContact.phoneDisplay} email={agencyContact.email} hoursLabel={dict.home.hoursTitle} hoursSummary={dict.home.hoursSummary} currentPath={currentUrl} languageHref={languagePath(locale === "fr" ? "en" : "fr")} />
    <main>
      <section className="bg-cream px-5 py-14 sm:px-8 md:py-20">
        <div className="mx-auto max-w-7xl"><Heading as="h1" eyebrow={copy.eyebrow}>{copy.title}</Heading>{!(["about", "digital-solutions", "ai-automation", "online-presence", "media-coverage", "faq"] as SeoPageKey[]).includes(key) && <p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{copy.intro}</p>}
        </div>
      </section>
      {key === "about" ? <section className="px-5 py-14 sm:px-8 md:py-20"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <aside className="editorial-aside"><p className="text-lg leading-8 text-muted">{copy.intro}</p><div className="pull-quote mt-8 border-l-2 border-coral pl-5"><h2 className="font-display text-lg font-bold text-navy">{copy.sections[0]?.heading}</h2><blockquote className="mt-2 font-display text-2xl font-bold leading-snug text-navy">{copy.sections[0]?.body}</blockquote></div><dl className="fact-grid mt-8"><div><dt>{locale === "fr" ? "Fondée en" : "Founded in"}</dt><dd>2026</dd></div><div><dt>{locale === "fr" ? "Équipe" : "Team"}</dt><dd>{locale === "fr" ? "Une dizaine de personnes" : "Around ten people"}</dd></div><div><dt>{locale === "fr" ? "Adresse" : "Location"}</dt><dd>{agencyContact.address}</dd></div></dl></aside>
        <div className="about-editorial-column">
          <div className="editorial-list">{copy.sections.slice(1).map((section) => <article className="editorial-row" data-motion-reveal="pending" key={section.heading}><h2 className="font-display text-2xl font-extrabold leading-tight tracking-[-.02em] text-navy">{section.heading}</h2><p className="leading-7 text-muted">{section.body}</p></article>)}</div>
        </div>
      </div></section> : ["digital-solutions", "ai-automation", "online-presence", "media-coverage", "faq"].includes(key) && copy.sections.length > 0 ? <section className="px-5 py-14 sm:px-8 md:py-20"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[5fr_7fr] lg:gap-16">
        <aside className="editorial-aside"><p className="text-lg leading-8 text-muted">{copy.intro}</p></aside>
        {key === "faq" ? <div className="editorial-list faq-list">{copy.sections.map((section) => <details className="faq-item" data-motion-reveal="pending" key={section.heading}><summary className="font-display text-xl font-extrabold leading-snug text-navy">{section.heading}</summary><p className="mt-4 max-w-2xl leading-7 text-muted">{section.body}</p></details>)}</div> : <div className="editorial-list">{copy.sections.map((section) => <article className="editorial-row" data-motion-reveal="pending" key={section.heading}><h2 className="font-display text-2xl font-extrabold leading-tight tracking-[-.02em] text-navy">{section.heading}</h2><p className="leading-7 text-muted">{section.body}</p></article>)}</div>}
      </div></section> : null}
      {key === "about" && agencyMedia.about.length > 0 && <section className="px-5 pb-14 sm:px-8 md:pb-20"><div className="mx-auto max-w-7xl"><PreviewImageGallery images={agencyMedia.about} locale={locale} className="preview-image-gallery-two" /></div></section>}
      {key === "media-coverage" && agencyMedia.mediaCoverage.length > 0 && <section className="bg-cream px-5 py-14 sm:px-8 md:py-20">
        <div className="mx-auto max-w-7xl">
          <h2 className="font-display text-3xl font-extrabold tracking-[-.02em] text-navy">{locale === "fr" ? "Exemples de scènes" : "Example scenes"}</h2>
          <PreviewImageGallery images={agencyMedia.mediaCoverage} locale={locale} className="preview-image-gallery-two mt-8" />
        </div>
      </section>}
      {category === "onlinePresence" && planCatalog.plans.length > 0 && <section className="bg-cream px-5 py-14 sm:px-8"><div className="mx-auto max-w-7xl"><h2 className="font-display text-3xl font-extrabold tracking-[-.02em] text-navy">{locale === "fr" ? "Formules mensuelles" : "Monthly plans"}</h2><ServicePlanComparison catalog={planCatalog} locale={locale} /></div></section>}
      {category && category !== "onlinePresence" && pageOffers.length > 0 && <section className="bg-cream px-5 py-14 sm:px-8"><div className="mx-auto max-w-7xl"><h2 className="font-display text-3xl font-extrabold tracking-[-.02em] text-navy">{locale === "fr" ? "Offres" : "Offers"}</h2><div className="mt-6 grid gap-4">{pageOffers.map((offer) => <Card className="h-full" key={offer.id}><div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between"><div><h3 className="font-display text-xl font-extrabold text-navy">{offer.translations[locale].title}</h3><p className="mt-2 text-sm leading-6 text-muted">{offer.translations[locale].summary}</p></div><div className="shrink-0 sm:text-right"><p className="font-bold text-navy">{offer.prices[0].startingAt && (locale === "fr" ? "À partir de " : "Starting at ")}{new Intl.NumberFormat(locale === "fr" ? "fr-CI" : "en-US").format(offer.prices[0].amountXof)} {locale === "fr" ? "FCFA" : "XOF"} HT</p><p className="mt-1 text-xs text-muted">≈ {formatIndicativeUsd(offer.prices[0].amountXof)} · {locale === "fr" ? "indicatif" : "indicative"}</p>{offer.prices[0].cadence === "project" && offer.prices[0].amountXof > 700000 && <p className="mt-2 text-xs text-muted">{locale === "fr" ? "Paiement en 3 fois possible." : "Three instalments available."}</p>}</div></div></Card>)}</div><p className="mt-5 text-xs text-muted">{locale === "fr" ? "USD indicatif au taux de référence du " : "Indicative USD conversion at the reference rate dated "}{locale === "fr" ? usdReference.displayDateFr : usdReference.displayDateEn}. {locale === "fr" ? "Le tarif FCFA HT prévaut." : "The XOF price excluding tax takes precedence."}</p></div></section>}
      {key === "projects" && <section className="px-5 py-14 sm:px-8"><div className="mx-auto grid max-w-4xl gap-4">{projects.map((project) => <Card className="h-full" key={project.id}><p className="text-xs font-bold uppercase text-muted">{project.classification}</p><h2 className="mt-3 font-display text-xl font-extrabold text-navy">{project.translations[locale].title}</h2><p className="mt-2 text-sm leading-6 text-muted">{project.translations[locale].summary}</p></Card>)}</div></section>}
      {key === "blog" && <section className="px-5 py-14 sm:px-8"><div className="mx-auto grid max-w-4xl gap-4">{posts.map((post) => <Card className="h-full" key={post.id}><p className="text-xs text-muted">{post.publishedAt}</p><h2 className="mt-3 font-display text-xl font-extrabold text-navy">{post.translations[locale].title}</h2><p className="mt-2 text-sm leading-6 text-muted">{post.translations[locale].excerpt}</p></Card>)}</div></section>}
    </main>
    <SiteFooter locale={locale} copy={dict.home} email={agencyContact.email} socials={agencyContact.socialLinks} />
  </>;
}
