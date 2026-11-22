import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { getOffers, getPosts, getProjects, getTestimonials } from "@/content/queries";
import type { Locale, Offer, OfferCategory } from "@/content/schema";
import { formatIndicativeUsd, usdReference } from "@/config/currency";
import { agencyContact } from "@/config/contact";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button-link";
import { ExternalArrowIcon } from "@/components/ui/external-arrow-icon";
import { agencyMedia } from "@/config/media";
import messagesFr from "@/messages/fr.json";
import messagesEn from "@/messages/en.json";
import { pageMetadata } from "@/lib/seo";

type HomeCopy = typeof messagesFr.home;
const dictionaries = { fr: messagesFr, en: messagesEn };
const categories: OfferCategory[] = ["digitalSolutions", "aiAutomation", "onlinePresence", "mediaCoverage"];
const categoryRoutes: Record<OfferCategory, Record<Locale, string>> = {
  digitalSolutions: { fr: "solutions-numeriques", en: "digital-solutions" },
  aiAutomation: { fr: "ia-automatisation", en: "ai-automation" },
  onlinePresence: { fr: "presence-en-ligne", en: "online-presence" },
  mediaCoverage: { fr: "couverture-mediatique", en: "media-coverage" },
};

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const isFrench = locale === "fr";
  return pageMetadata({
    locale,
    title: isFrench ? "Agence digitale à Abidjan et agence web à Abobo" : "Digital agency in Abidjan",
    description: isFrench
      ? "Agence digitale à Abidjan, à Dokui, Abobo : solutions web et mobiles, IA, présence en ligne et couverture médiatique."
      : "A digital agency in Abidjan, based in Dokui, Abobo: web and mobile solutions, AI, online presence and media coverage.",
    frPath: "/fr",
    enPath: "/en",
  });
}

function xof(amount: number, locale: Locale) {
  return new Intl.NumberFormat(locale === "fr" ? "fr-CI" : "en-US", { maximumFractionDigits: 0 }).format(amount) + (locale === "fr" ? " FCFA" : " XOF");
}

function OfferCard({ offer, category, locale, name, copy, index }: { offer: Offer; category: OfferCategory; locale: Locale; name: string; copy: HomeCopy; index: number }) {
  const price = offer.prices[0];
  return <Link aria-label={`${name}: ${offer.translations[locale].title}`} className="block h-full" href={"/" + locale + "/" + categoryRoutes[category][locale]}>
    <Card as="article" className="offer-card flex h-full min-h-64 flex-col" data-motion-delay={index * 60} data-motion-reveal="pending" padded={false}>
      <p className="text-xs font-bold uppercase tracking-[.12em] text-muted">{name}</p>
      <h3 className="mt-4 font-display text-2xl font-extrabold leading-tight tracking-[-.02em] text-navy">{offer.translations[locale].title}</h3>
      <p className="mt-3 flex-1 leading-7 text-muted">{offer.translations[locale].summary}</p>
      <p className="mt-6 border-t border-navy/10 pt-4 text-sm font-bold text-navy">
        <span className="mr-1 text-xs font-semibold text-muted">{copy.priceStarting}</span>{xof(price.amountXof, locale)}
        {price.cadence === "month" && <span className="ml-1 text-xs font-semibold text-muted">{copy.priceMonthly}</span>}
        <span className="price-tax ml-1 text-xs font-semibold text-muted">{copy.tax}</span>
        <span className="price-usd mt-1 block text-xs font-normal text-muted">≈ {formatIndicativeUsd(price.amountXof)} · {copy.usdIndicative}</span>
      </p>
      <span aria-hidden="true" className="offer-card-arrow mt-4 inline-flex items-center text-sm font-bold text-navy"><ExternalArrowIcon /></span>
    </Card>
  </Link>;
}

function BaobabRings() {
  return <div aria-hidden="true" className="hero-rings-panel">
    <svg className="hero-rings" viewBox="0 0 560 440" fill="none">
      <path d="M91 201c0-79 82-132 190-132s189 53 189 132-81 132-189 132S91 280 91 201Z" />
      <path d="M125 201c0-62 67-103 156-103s155 41 155 103-66 103-155 103-156-41-156-103Z" />
      <path d="M161 201c0-43 51-73 120-73s120 30 120 73-51 73-120 73-120-30-120-73Z" />
      <path d="M194 201c0-25 36-44 87-44s87 19 87 44-36 44-87 44-87-19-87-44Z" />
      <path d="M47 365c70-23 116-19 167-4 61 17 113 20 166 1 39-14 82-19 132-6" />
      <path d="M65 389c61-16 107-13 155 0 59 16 115 18 170 2 37-10 76-14 119-5" />
    </svg>
    <span className="hero-art-caption">BAOBAB · ABIDJAN</span>
  </div>;
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = dictionaries[locale];
  const copy = dict.home as HomeCopy;
  const [offers, projects, posts, testimonials] = await Promise.all([getOffers(), getProjects(), getPosts(), getTestimonials()]);
  const categoryNames: Record<OfferCategory, string> = {
    digitalSolutions: dict.navigation.digitalSolutions,
    aiAutomation: dict.navigation.aiAutomation,
    onlinePresence: dict.navigation.onlinePresence,
    mediaCoverage: dict.navigation.mediaCoverage,
  };
  const featuredOffers = categories.flatMap((category) => {
    const offer = offers.find((item) => item.category === category);
    return offer ? [{ category, offer }] : [];
  });
  const demos = projects.slice(0, 4);
  const priceDate = locale === "fr" ? usdReference.displayDateFr : usdReference.displayDateEn;

  return <>
    <SiteHeader locale={locale} copy={copy} page="home" address={agencyContact.address} phone={agencyContact.phone} phoneDisplay={agencyContact.phoneDisplay} email={agencyContact.email} socials={agencyContact.socialLinks} />
    <main>
      <section className="hero-section px-5 py-14 sm:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.05fr_.95fr]">
          <div>
            <p className="mb-5 text-xs font-bold uppercase tracking-[.18em] text-muted">{copy.heroEyebrow}</p>
            <h1 className="hero-title max-w-3xl font-display font-extrabold leading-[1.02] tracking-[-.02em] text-navy sm:text-6xl lg:text-7xl">{copy.heroTitle}</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">{copy.heroSubtitle}</p>
            <ButtonLink className="mt-8" href={"/" + locale + "/contact"}>{copy.heroCta}<ExternalArrowIcon /></ButtonLink>
          </div>
          <div className="hero-art-wrap">{agencyMedia.hero.src && agencyMedia.hero.alt[locale] ? <div className="hero-image-frame"><Image alt={agencyMedia.hero.alt[locale]} className="hero-photo" fill priority sizes="(max-width: 1024px) 100vw, 48vw" src={agencyMedia.hero.src} /></div> : <BaobabRings />}</div>
        </div>
      </section>

      <section aria-label={copy.servicesTitle} className="px-5 py-14 sm:px-8 md:py-20" id="services">
        <div className="mx-auto max-w-7xl">
          <Heading as="h2">{copy.servicesTitle}</Heading>
          <p className="mt-4 max-w-2xl leading-7 text-muted">{copy.servicesIntro}</p>
          <div className="mt-9 grid auto-rows-fr gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {featuredOffers.map(({ category, offer }, index) => <OfferCard category={category} copy={copy} index={index} key={category} locale={locale} name={categoryNames[category]} offer={offer} />)}
          </div>
          <p className="mt-5 text-xs text-muted">{copy.priceNote} {priceDate}. {copy.priceSupersedes}</p>
        </div>
      </section>

      <section className="bg-cream px-5 py-14 sm:px-8 md:py-20" id="about">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
          <Heading as="h2">{copy.aboutTitle}</Heading>
          <div>
            <p className="max-w-2xl text-lg leading-8 text-muted">{copy.aboutBody}</p>
            <dl className="fact-grid mt-8">
              <div><dt>{copy.factFounded}</dt><dd>2026</dd></div>
              <div><dt>{copy.factTeam}</dt><dd className="fact-team">{copy.factTeamValue}</dd></div>
              <div><dt>{copy.factLocation}</dt><dd>{agencyContact.address}</dd></div>
            </dl>
          </div>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 md:py-20" id="methode">
        <div className="mx-auto max-w-7xl">
          <Heading as="h2">{copy.methodTitle}</Heading>
          <div className="method-grid mt-9 grid gap-x-7 lg:grid-cols-4" data-motion-sequence>
            <span aria-hidden="true" className="method-line"><span className="method-line-fill" /></span>
            {[copy.methodStep1, copy.methodStep2, copy.methodStep3, copy.methodStep4].map((step, index) => <article className="method-step" data-motion-reveal="pending" data-method-step key={step}>
              <p className="font-display text-2xl font-extrabold text-navy">0{index + 1}</p>
              <h3 className="mt-4 font-display text-xl font-extrabold text-navy">{step}</h3>
              <p className="mt-3 leading-7 text-muted">{[copy.methodBody1, copy.methodBody2, copy.methodBody3, copy.methodBody4][index]}</p>
            </article>)}
          </div>
        </div>
      </section>

      <section className="bg-navy px-5 py-14 text-cream sm:px-8 md:py-20" id="ia-example">
        <div className="mx-auto grid max-w-7xl gap-9 lg:grid-cols-[.9fr_1.1fr] lg:items-center">
          <div>
            <h2 className="mt-4 max-w-xl font-display text-3xl font-extrabold leading-tight tracking-[-.02em] sm:text-4xl" data-motion-heading="true" data-motion-reveal="pending">{copy.aiExampleTitle}</h2>
            <p className="mt-4 max-w-xl leading-7 text-cream/80">{copy.aiExampleNote}</p>
          </div>
          <div aria-label={copy.aiExampleLabel} className="conversation-card" data-motion-reveal="pending" data-motion-sequence>
            <div className="conversation-head"><span className="conversation-dot" aria-hidden="true" /> WhatsApp · {copy.aiExampleShop}</div>
            <p className="conversation-message conversation-customer" data-conversation-message="customer-first">{copy.aiCustomerMessage}</p>
            <div className="conversation-reply" data-conversation-message="reply-first"><span aria-hidden="true" className="typing-dots"><i /><i /><i /></span><p className="conversation-message conversation-assistant">{copy.aiAssistantMessage}</p></div>
            <p className="conversation-message conversation-customer" data-conversation-message="customer-second">{copy.aiCustomerFollowup}</p>
            <div className="conversation-reply" data-conversation-message="reply-second"><span aria-hidden="true" className="typing-dots"><i /><i /><i /></span><p className="conversation-message conversation-assistant">{copy.aiAssistantFollowup}</p></div>
          </div>
        </div>
      </section>

      {demos.length > 0 && <section className="px-5 py-14 sm:px-8 md:py-20" id="demos">
        <div className="mx-auto max-w-7xl"><Heading as="h2">{copy.demosTitle}</Heading>
          <div className="mt-8 grid max-w-4xl gap-4">{demos.map((project) => <Link className="block h-full" href={"/" + locale + "/" + (locale === "fr" ? "realisations" : "projects") + "/" + project.translations[locale].slug} key={project.id}><Card className="h-full"><p className="text-xs font-bold uppercase tracking-[.12em] text-muted">{project.classification === "client" ? copy.demoClient : project.classification === "academique" ? copy.demoAcademic : copy.demoType}</p><h3 className="mt-3 font-display text-xl font-extrabold text-navy">{project.translations[locale].title}</h3><p className="mt-2 leading-7 text-muted">{project.translations[locale].summary}</p></Card></Link>)}</div>
        </div>
      </section>}

      {testimonials.length > 0 && <section className="bg-cream px-5 py-14 sm:px-8 md:py-20"><div className="mx-auto max-w-7xl"><Heading as="h2">{copy.testimonialsTitle}</Heading><div className="mt-8 grid max-w-4xl gap-4">{testimonials.map((testimonial) => <Card className="h-full" key={testimonial.id}><blockquote className="text-lg leading-8">“{testimonial.translations[locale].quote}”</blockquote><p className="mt-4 font-bold">{testimonial.translations[locale].attribution}</p></Card>)}</div></div></section>}

      {posts.length > 0 && <section className="px-5 py-14 sm:px-8 md:py-20" id="blog"><div className="mx-auto max-w-7xl"><Heading as="h2">{copy.blogTitle}</Heading><div className="mt-8 grid max-w-4xl gap-4">{posts.slice(0, 3).map((post) => <Card className="h-full" key={post.id}><p className="text-xs text-muted">{post.publishedAt}</p><h3 className="mt-3 font-display text-xl font-extrabold text-navy">{post.translations[locale].title}</h3><p className="mt-3 leading-6 text-muted">{post.translations[locale].excerpt}</p></Card>)}</div></div></section>}

      <section className="bg-navy px-5 py-12 text-cream sm:px-8 md:py-16">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center">
          <h2 className="max-w-2xl font-display text-3xl font-extrabold tracking-[-.02em] sm:text-4xl">{copy.closingTitle}</h2>
          <ButtonLink href={"/" + locale + "/contact"}>{copy.closingCta}<ExternalArrowIcon /></ButtonLink>
        </div>
      </section>
    </main>
    <SiteFooter locale={locale} copy={copy} email={agencyContact.email} socials={agencyContact.socialLinks} />
  </>;
}
