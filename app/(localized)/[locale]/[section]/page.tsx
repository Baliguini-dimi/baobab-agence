import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import type { Locale } from "@/content/schema";
import { locales } from "@/content/schema";
import { pageCopy, pageSlugs, getPageKey, type SeoPageKey } from "@/content/seo-pages";
import { pageMetadata, jsonLd, localizedPath } from "@/lib/seo";
import { agencyContact } from "@/config/contact";
import { getOffers } from "@/content/queries";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import messagesFr from "@/messages/fr.json";
import messagesEn from "@/messages/en.json";

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
  const [offers, requestHeaders] = await Promise.all([getOffers(), headers()]);
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
  const emptyCopy = locale === "fr"
    ? { projects: "Aucune réalisation n'est publiée pour le moment.", blog: "Aucun article n'est publié pour le moment." }
    : { projects: "No projects have been published yet.", blog: "No articles have been published yet." };

  return <>
    {faqSchema && <script nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(faqSchema) }} />}
    {breadcrumbSchema && <script nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />}
    {serviceSchema && <script nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(serviceSchema) }} />}
    <SiteHeader locale={locale} copy={dict.home} page="contact" address={agencyContact.address} phone={agencyContact.phone} email={agencyContact.email} socials={agencyContact.socialLinks} languageHref={languagePath(locale === "fr" ? "en" : "fr")} />
    <main>
      <section className="bg-cream px-5 py-14 sm:px-8 md:py-20">
        <div className="mx-auto max-w-7xl"><Heading as="h1" eyebrow={copy.eyebrow}>{copy.title}</Heading><p className="mt-5 max-w-3xl text-lg leading-8 text-muted">{copy.intro}</p>
          {key === "about" && <dl className="fact-grid mt-8 max-w-4xl"><div><dt>{locale === "fr" ? "Fondée en" : "Founded in"}</dt><dd>2026</dd></div><div><dt>{locale === "fr" ? "Équipe" : "Team"}</dt><dd>{locale === "fr" ? "Une dizaine de personnes" : "Around ten people"}</dd></div><div><dt>{locale === "fr" ? "Adresse" : "Location"}</dt><dd>{agencyContact.address}</dd></div></dl>}
        </div>
      </section>
      {copy.sections.length > 0 && <section className="px-5 py-14 sm:px-8 md:py-20"><div className="mx-auto grid max-w-7xl gap-5 md:grid-cols-2">{copy.sections.map((section, index) => <Card className="h-full" key={section.heading}><p className="outline-number">{String(index + 1).padStart(2, "0")}</p><h2 className="mt-4 font-display text-2xl font-extrabold tracking-tight text-navy">{section.heading}</h2><p className="mt-3 leading-7 text-muted">{section.body}</p></Card>)}</div></section>}
      {category && pageOffers.length > 0 && <section className="bg-cream px-5 py-14 sm:px-8"><div className="mx-auto max-w-7xl"><h2 className="font-display text-3xl font-extrabold tracking-tight text-navy">{locale === "fr" ? "Offres" : "Offers"}</h2><div className="mt-6 grid gap-5 md:grid-cols-3">{pageOffers.map((offer) => <Card className="h-full" key={offer.id}><h3 className="font-display text-xl font-extrabold text-navy">{offer.translations[locale].title}</h3><p className="mt-3 text-sm leading-6 text-muted">{offer.translations[locale].summary}</p><p className="mt-5 font-bold text-navy">{locale === "fr" ? "À partir de" : "Starting at"} {new Intl.NumberFormat(locale === "fr" ? "fr-CI" : "en-US").format(offer.prices[0].amountXof)} FCFA HT</p></Card>)}</div></div></section>}
      {key === "projects" && <section className="px-5 py-14 sm:px-8"><div className="mx-auto max-w-7xl"><p className="text-muted">{emptyCopy.projects}</p></div></section>}
      {key === "blog" && <section className="px-5 py-14 sm:px-8"><div className="mx-auto max-w-7xl"><p className="text-muted">{emptyCopy.blog}</p></div></section>}
    </main>
    <SiteFooter locale={locale} copy={dict.home} email={agencyContact.email} socials={agencyContact.socialLinks} />
  </>;
}
