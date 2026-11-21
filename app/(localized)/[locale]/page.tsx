import Link from "next/link";
import type { Metadata } from "next";
import { getOffers, getPosts, getProjects, getTestimonials } from "@/content/queries";
import type { Locale, Offer } from "@/content/schema";
import { formatIndicativeUsd, usdReference } from "@/config/currency";
import { agencyContact } from "@/config/contact";
import { ScrollMotionRoot, Parallax, Ticker } from "@/components/motion/motion";
import { ScrollReveal } from "@/components/motion/scroll-reveal";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { ButtonLink } from "@/components/ui/button-link";
import messagesFr from "@/messages/fr.json";
import messagesEn from "@/messages/en.json";
import { pageMetadata } from "@/lib/seo";

type HomeCopy = typeof messagesFr.home;
const dictionaries = { fr: messagesFr, en: messagesEn };

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

function Price({ offer, locale, copy }: { offer: Offer; locale: Locale; copy: HomeCopy }) {
  return <div className="mt-5 space-y-3 border-t border-navy/10 pt-4">{offer.prices.map((price) => <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1" key={price.id}>
    <span className="font-display text-xl font-extrabold text-navy">{price.startingAt && <span className="mr-1 text-xs font-semibold text-muted">{copy.priceStarting}</span>}{xof(price.amountXof, locale)}{price.cadence === "month" && <span className="ml-1 text-xs font-semibold text-muted">{copy.priceMonthly}</span>} <span className="text-xs font-semibold text-muted">{copy.tax}</span></span>
    <span className="text-xs text-muted">≈ {formatIndicativeUsd(price.amountXof)} · {copy.usdIndicative}</span>
    {price.cadence === "project" && price.amountXof > 700000 && <span className="w-full text-xs text-muted">{copy.payment3x}</span>}
  </div>)}</div>;
}

function BaobabIllustration({ alt }: { alt: string }) {
  return <div aria-label={alt} className="hero-art-wrap" role="img">
    <div className="hero-art baobab-pattern">
      <svg aria-hidden="true" className="hero-tree" viewBox="0 0 520 500" fill="none">
        <path d="M258 423c-10-69 7-119 1-186m-4 182c-26-48-74-63-123-73m124 70c31-48 78-64 132-74m-128-76c-40-46-70-76-134-98m137 100c37-47 74-75 140-96m-140 74c-6-56 1-91 0-137" stroke="currentColor" strokeWidth="12" strokeLinecap="round"/>
        <path d="M126 168c29-49 68-56 111-28 22-46 81-48 108-2 57-24 94 11 88 56 40 33 27 84-17 95-31 31-68 33-105 11-29 31-79 30-108 2-42 20-84 8-92-30-45-14-43-75 15-104Z" fill="var(--color-coral)"/>
        <path d="M163 413c-45 25-70 44-88 72m159-65c-11 34-27 56-45 74m153-81c44 25 71 43 94 72M214 427c-48 3-86 9-125 27m222-27c48 3 88 10 126 29" stroke="currentColor" strokeWidth="8" strokeLinecap="round" opacity=".8"/>
        <circle cx="118" cy="136" r="17" fill="var(--color-cream)"/><circle cx="380" cy="128" r="12" fill="var(--color-cream)"/><circle cx="437" cy="246" r="9" fill="var(--color-cream)"/>
      </svg>
      <span className="hero-art-caption">BAOBAB · ABIDJAN</span>
      <span aria-hidden="true" className="hero-stamp">ENRACINÉS · CRÉATIFS · ABIDJAN</span>
    </div>
  </div>;
}

export default async function HomePage({ params }: { params: Promise<{ locale: Locale }> }) {
  const { locale } = await params;
  const dict = dictionaries[locale];
  const copy = dict.home as HomeCopy;
  const [offers, projects, posts, testimonials] = await Promise.all([getOffers(), getProjects(), getPosts(), getTestimonials()]);
  const categories: Offer["category"][] = ["digitalSolutions", "aiAutomation", "onlinePresence", "mediaCoverage"];
  const categoryNames = { digitalSolutions: dict.navigation.digitalSolutions, aiAutomation: dict.navigation.aiAutomation, onlinePresence: dict.navigation.onlinePresence, mediaCoverage: dict.navigation.mediaCoverage };
  const categoryHref = { digitalSolutions: "#services", aiAutomation: "#ia", onlinePresence: "#presence-en-ligne", mediaCoverage: "#couverture-mediatique" };
  const shortcutItems = ["digitalSolutions", "aiAutomation", "onlinePresence", "mediaCoverage"] as const;
  return <>
    <ScrollMotionRoot />
    <SiteHeader locale={locale} copy={copy} page="home" address={agencyContact.address} phone={agencyContact.phone} email={agencyContact.email} socials={agencyContact.socialLinks} />
    <main>
      <section className="hero-section px-5 py-14 sm:px-8 md:py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-10 lg:grid-cols-[1.02fr_.98fr]">
          <div className="relative z-10">
            <p className="mb-5 text-xs font-bold uppercase tracking-[.18em] text-muted">{copy.heroEyebrow}</p>
            <h1 className="max-w-3xl font-display text-5xl font-extrabold leading-[.99] tracking-[-.06em] text-navy sm:text-6xl lg:text-7xl">{copy.heroTitle}</h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-muted">{copy.heroSubtitle}</p>
            <ButtonLink className="mt-8" href={`/${locale}/contact`}>{copy.heroCta}<span aria-hidden="true"> ↗</span></ButtonLink>
          </div>
          <ScrollReveal delay={120}><Parallax><BaobabIllustration alt={copy.heroArtAlt} /></Parallax></ScrollReveal>
        </div>
      </section>
      <nav aria-label={copy.quickLinksTitle} className="quick-links mx-auto grid max-w-7xl grid-cols-2 px-5 sm:px-8 lg:grid-cols-4">
        {shortcutItems.map((key, index) => <Link className="quick-link" href={categoryHref[key]} key={key}><span className="outline-number">0{index + 1}</span><span>{categoryNames[key]}</span><span aria-hidden="true">↗</span></Link>)}
      </nav>
      <section className="px-5 py-16 sm:px-8 md:py-24"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr] lg:items-end">
        <ScrollReveal><Heading eyebrow={copy.aboutEyebrow} number="01" as="h2">{copy.aboutTitle}</Heading></ScrollReveal>
        <ScrollReveal delay={100}><div><p className="max-w-2xl text-lg leading-8 text-muted">{copy.aboutBody}</p>
          <dl className="fact-grid mt-8"><div><dt>{copy.factFounded}</dt><dd>2026</dd></div><div><dt>{copy.factTeam}</dt><dd className="fact-team">{copy.factTeamValue}</dd></div><div><dt>{copy.factLocation}</dt><dd>{agencyContact.address}</dd></div></dl>
        </div></ScrollReveal>
      </div></section>
      <Ticker items={[copy.challenge1, copy.challenge2, copy.challenge3, copy.challenge4]} label={copy.quickLinksTitle} />
      <section className="px-5 py-16 sm:px-8 md:py-24" id="services"><div className="mx-auto max-w-7xl"><ScrollReveal><Heading eyebrow={copy.servicesEyebrow} number="02" as="h2">{copy.servicesTitle}</Heading><p className="mt-4 max-w-2xl leading-7 text-muted">{copy.servicesIntro}</p></ScrollReveal>
        {categories.map((category, categoryIndex) => { const items = offers.filter((offer) => offer.category === category); if (!items.length) return null; return <div className="mt-14" key={category}>
          <div className="mb-5 flex items-end justify-between gap-4"><Heading as="h3" number={`0${categoryIndex + 1}`}>{categoryNames[category]}</Heading>{category === "onlinePresence" && <span className="text-sm text-muted">{copy.onlinePlans}</span>}</div>
          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{items.map((offer, index) => <ScrollReveal delay={(index % 3) * 70} key={offer.id}><Card className="offer-card h-full"><p className="text-xs font-bold uppercase tracking-wider text-muted">{offer.category === "onlinePresence" ? `${copy.plan1} · ${copy.plan2} · ${copy.plan3}` : categoryNames[category]}</p><h4 className="mt-3 font-display text-2xl font-extrabold tracking-tight text-navy">{offer.translations[locale].title}</h4><p className="mt-3 leading-7 text-muted">{offer.translations[locale].summary}</p>{offer.category === "onlinePresence" && <p className="mt-2 text-xs text-muted">{copy.scopeQuote}</p>}<Price copy={copy} locale={locale} offer={offer} /></Card></ScrollReveal>)}</div>
        </div>; })}
        <p className="mt-8 text-sm text-muted">{copy.priceNote} {locale === "fr" ? usdReference.displayDateFr : usdReference.displayDateEn}. {copy.priceSupersedes}</p>
      </div></section>
      <section className="overflow-hidden bg-navy px-5 py-16 text-cream sm:px-8 md:py-24" id="ia"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[1fr_1fr] lg:items-center"><ScrollReveal><p className="text-xs font-bold uppercase tracking-[.18em] text-cream/70">{copy.aiEyebrow}</p><h2 className="mt-4 max-w-2xl font-display text-4xl font-extrabold leading-tight tracking-[-.05em] sm:text-5xl">{copy.aiTitle}</h2><p className="mt-5 max-w-xl leading-7 text-cream/75">{copy.aiBody}</p><p className="mt-5 text-sm font-bold text-cream">{copy.aiPrice} · {xof(200000, locale)} HT <span className="text-cream/65">≈ {formatIndicativeUsd(200000)}</span></p></ScrollReveal>
          <ScrollReveal delay={130}><div className="ai-flow" aria-label={`${copy.aiStep1} → ${copy.aiStep2} → ${copy.aiStep3}`}><div>{copy.aiStep1}</div><span aria-hidden="true">→</span><div className="ai-flow-core">{copy.aiStep2}</div><span aria-hidden="true">→</span><div>{copy.aiStep3}</div></div></ScrollReveal></div></section>
      <section className="px-5 py-16 sm:px-8 md:py-24" id="couverture-mediatique"><div className="mx-auto grid max-w-7xl items-center gap-10 md:grid-cols-2"><ScrollReveal><Heading eyebrow={copy.mediaEyebrow} number="03" as="h2">{copy.mediaTitle}</Heading><p className="mt-5 max-w-xl leading-7 text-muted">{copy.mediaBody}</p><p className="mt-5 font-display text-xl font-extrabold text-navy">{copy.priceStarting} {xof(50000, locale)} HT <span className="text-sm font-semibold text-muted">≈ {formatIndicativeUsd(50000)}</span></p><Link className="mt-6 inline-flex font-bold text-navy underline decoration-coral decoration-2 underline-offset-4" href={`/${locale}/contact`}>{copy.heroCta} ↗</Link></ScrollReveal><ScrollReveal delay={90}><div className="media-panel baobab-pattern"><span className="media-kicker">BAOBAB / MÉDIA</span><span className="media-mark">B</span><span className="media-caption">{copy.mediaEyebrow} · ABIDJAN</span></div></ScrollReveal></div></section>
      <section className="bg-cream px-5 py-16 sm:px-8 md:py-24" id="presence-en-ligne"><div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[.8fr_1.2fr]"><ScrollReveal><Heading eyebrow={copy.onlineEyebrow} number="04" as="h2">{copy.onlineTitle}</Heading><p className="mt-5 leading-7 text-muted">{copy.onlineBody}</p></ScrollReveal><div className="grid gap-4 sm:grid-cols-3">{[150000,300000,600000].map((price,index)=><ScrollReveal delay={index*80} key={price}><Card className="plan-card h-full"><span className="outline-number">0{index+1}</span><h3 className="mt-5 font-display text-xl font-extrabold text-navy">{[copy.plan1,copy.plan2,copy.plan3][index]}</h3><p className="mt-3 font-bold text-navy">{xof(price,locale)}<span className="text-muted"> / {locale==="fr"?"mois":"month"}</span></p><p className="mt-2 text-xs text-muted">≈ {formatIndicativeUsd(price)} · {copy.usdIndicative}</p><p className="mt-4 text-xs leading-5 text-muted">{copy.scopeQuote}</p></Card></ScrollReveal>)}</div></div>
        <div className="mx-auto mt-8 max-w-7xl text-xs text-muted">{copy.priceNote} {locale === "fr" ? usdReference.displayDateFr : usdReference.displayDateEn}. {copy.priceSupersedes}</div></section>
      <section className="px-5 py-16 sm:px-8 md:py-24" id="realisations"><div className="mx-auto max-w-7xl"><ScrollReveal><Heading eyebrow={copy.projectsEyebrow} number="05" as="h2">{copy.projectsTitle}</Heading></ScrollReveal><div className="mt-10 grid gap-8 lg:grid-cols-[.8fr_1.2fr]">{projects.length ? <div className="grid gap-4 sm:grid-cols-2">{projects.slice(0,4).map((project)=><Link href={`/${locale}/realisations/${project.translations[locale].slug}`} key={project.id}><Card><span className="text-xs font-bold uppercase text-muted">{project.classification}</span><h3 className="mt-3 font-display text-xl font-extrabold text-navy">{project.translations[locale].title}</h3><p className="mt-2 text-sm leading-6 text-muted">{project.translations[locale].summary}</p></Card></Link>)}</div>:<div className="flex items-center"><p className="max-w-md leading-7 text-muted">{copy.projectsEmpty}</p></div>}
          <div className="fake-browser"><div className="fake-browser-bar"><i/><i/><i/><span>{copy.browserLabel}</span></div><div className="fake-browser-content"><div className="browser-logo">Baobab<span>.</span></div><div className="browser-line"/><div className="browser-line short"/><div className="browser-placeholder">{copy.previewEmpty}</div></div></div></div></div></section>
      {testimonials.length > 0 && <section className="bg-navy px-5 py-16 text-cream sm:px-8 md:py-24"><div className="mx-auto max-w-7xl"><Heading eyebrow={copy.testimonialsEyebrow} as="h2">{copy.testimonialsTitle}</Heading><div className="mt-8 grid gap-5 md:grid-cols-2">{testimonials.map((testimonial)=><Card className="text-ink" key={testimonial.id}><blockquote>“{testimonial.translations[locale].quote}”</blockquote><p className="mt-4 font-bold">{testimonial.translations[locale].attribution}</p></Card>)}</div></div></section>}
      <section className="bg-cream px-5 py-16 sm:px-8 md:py-24" id="blog"><div className="mx-auto max-w-7xl"><ScrollReveal><Heading eyebrow={copy.blogEyebrow} number="06" as="h2">{copy.blogTitle}</Heading></ScrollReveal>{posts.length ? <div className="mt-8 grid gap-5 md:grid-cols-3">{posts.slice(0,3).map((post)=><Card key={post.id}><p className="text-xs text-muted">{post.publishedAt}</p><h3 className="mt-3 font-display text-xl font-extrabold text-navy">{post.translations[locale].title}</h3><p className="mt-3 leading-6 text-muted">{post.translations[locale].excerpt}</p></Card>)}</div>:<p className="mt-5 text-muted">{copy.blogEmpty}</p>}</div></section>
      <section className="bg-coral px-5 py-14 sm:px-8"><div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 sm:flex-row sm:items-center"><h2 className="max-w-2xl font-display text-3xl font-extrabold tracking-tight text-navy-deep sm:text-4xl">{copy.closingTitle}</h2><ButtonLink href={`/${locale}/contact`} variant="secondary">{copy.closingCta} ↗</ButtonLink></div></section>
    </main>
    <SiteFooter locale={locale} copy={copy} email={agencyContact.email} socials={agencyContact.socialLinks} />
  </>;
}
