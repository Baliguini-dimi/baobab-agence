import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { getPostBySlug, getProjectBySlug } from "@/content/queries";
import type { Locale } from "@/content/schema";
import { locales } from "@/content/schema";
import { pageMetadata, jsonLd, siteOrigin } from "@/lib/seo";
import { Heading } from "@/components/ui/heading";
import { Card } from "@/components/ui/card";
import { SiteHeader } from "@/components/site/site-header";
import { SiteFooter } from "@/components/site/site-footer";
import { agencyContact } from "@/config/contact";
import messagesFr from "@/messages/fr.json";
import messagesEn from "@/messages/en.json";

const dictionaries = { fr: messagesFr, en: messagesEn };

type Entry = { kind: "project" | "post"; title: string; excerpt: string; pathFr: string; pathEn: string; sections: [string, string][]; date?: string };

async function lookup(locale: Locale, section: string, slug: string): Promise<Entry | null> {
  const projectCollection = locale === "fr" ? "realisations" : "projects";
  if (section === projectCollection) {
    const project = await getProjectBySlug(locale, slug);
    if (!project) return null;
    const fr = project.translations.fr;
    const en = project.translations.en;
    return {
      kind: "project",
      title: project.translations[locale].title,
      excerpt: project.translations[locale].summary,
      pathFr: `/fr/realisations/${fr.slug}`,
      pathEn: `/en/projects/${en.slug}`,
      sections: locale === "fr"
        ? [["Contexte", project.translations.fr.context], ["Solution", project.translations.fr.solution], ["Technique", project.translations.fr.technique], ["Résultat", project.translations.fr.result]]
        : [["Context", project.translations.en.context], ["Solution", project.translations.en.solution], ["Technology", project.translations.en.technique], ["Outcome", project.translations.en.result]],
    };
  }
  if (section === "blog") {
    const post = await getPostBySlug(locale, slug);
    if (!post) return null;
    return {
      kind: "post",
      title: post.translations[locale].title,
      excerpt: post.translations[locale].excerpt,
      pathFr: `/fr/blog/${post.translations.fr.slug}`,
      pathEn: `/en/blog/${post.translations.en.slug}`,
      sections: [["", post.translations[locale].body]],
      date: post.publishedAt,
    };
  }
  return null;
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string; section: string; slug: string }> }): Promise<Metadata> {
  const { locale: rawLocale, section, slug } = await params;
  if (!locales.includes(rawLocale as Locale)) return {};
  const locale = rawLocale as Locale;
  const entry = await lookup(locale, section, slug);
  if (!entry) return {};
  return pageMetadata({
    locale,
    title: entry.title,
    description: entry.excerpt,
    frPath: entry.pathFr,
    enPath: entry.pathEn,
    type: entry.kind === "post" ? "article" : "website",
  });
}

export default async function DetailPage({ params }: { params: Promise<{ locale: string; section: string; slug: string }> }) {
  const { locale: rawLocale, section, slug } = await params;
  if (!locales.includes(rawLocale as Locale)) notFound();
  const locale = rawLocale as Locale;
  const entry = await lookup(locale, section, slug);
  if (!entry) notFound();
  const dictionary = dictionaries[locale];
  const headersList = await headers();
  const nonce = headersList.get("x-nonce") ?? undefined;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: locale === "fr" ? "Accueil" : "Home", item: siteOrigin ? new URL(`/${locale}`, siteOrigin).toString() : `/${locale}` },
      { "@type": "ListItem", position: 2, name: entry.kind === "post" ? "Blog" : locale === "fr" ? "Réalisations" : "Projects", item: siteOrigin ? new URL(`/${locale}/${section}`, siteOrigin).toString() : `/${locale}/${section}` },
      { "@type": "ListItem", position: 3, name: entry.title, item: siteOrigin ? new URL(locale === "fr" ? entry.pathFr : entry.pathEn, siteOrigin).toString() : locale === "fr" ? entry.pathFr : entry.pathEn },
    ],
  };
  const articleSchema = entry.kind === "post" ? {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: entry.title,
    description: entry.excerpt,
    ...(entry.date ? { datePublished: entry.date } : {}),
    inLanguage: locale,
    author: { "@type": "Organization", name: "Baobab" },
    publisher: { "@type": "Organization", name: "Baobab" },
  } : null;

  return <>
    <script nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(breadcrumbSchema) }} />
    {articleSchema && <script nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(articleSchema) }} />}
    <SiteHeader locale={locale} copy={dictionary.home} page="contact" address={agencyContact.address} phone={agencyContact.phone} email={agencyContact.email} socials={agencyContact.socialLinks} languageHref={locale === "fr" ? entry.pathEn : entry.pathFr} />
    <main>
      <section className="bg-cream px-5 py-14 sm:px-8 md:py-20"><div className="mx-auto max-w-5xl"><Heading as="h1" eyebrow={entry.kind === "post" ? "Baobab · Blog" : locale === "fr" ? "Réalisation" : "Project"}>{entry.title}</Heading><p className="mt-5 text-lg leading-8 text-muted">{entry.excerpt}</p>{entry.date && <p className="mt-4 text-sm text-muted"><time dateTime={entry.date}>{entry.date}</time></p>}</div></section>
      <section className="px-5 py-14 sm:px-8"><div className="mx-auto grid max-w-5xl gap-5 md:grid-cols-2">{entry.sections.map(([title, body]) => <Card className="h-full" key={title || "body"}>{title && <h2 className="font-display text-2xl font-extrabold text-navy">{title}</h2>}<p className={`${title ? "mt-3" : ""} leading-7 text-muted`}>{body}</p></Card>)}</div></section>
    </main>
    <SiteFooter locale={locale} copy={dictionary.home} email={agencyContact.email} socials={agencyContact.socialLinks} />
  </>;
}
