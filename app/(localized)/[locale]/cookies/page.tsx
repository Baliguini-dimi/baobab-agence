import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Heading } from "@/components/ui/heading";
import { locales, type Locale } from "@/content/schema";
import messagesFr from "@/messages/fr.json";
import messagesEn from "@/messages/en.json";
import { pageMetadata } from "@/lib/seo";

const dictionaries = { fr: messagesFr, en: messagesEn };

export async function generateMetadata({ params }: { params: Promise<{ locale: Locale }> }): Promise<Metadata> {
  const { locale } = await params;
  const isFrench = locale === "fr";
  return pageMetadata({
    locale,
    title: isFrench ? "Politique de cookies" : "Cookie policy",
    description: isFrench ? "Informations sur les cookies et préférences utilisés sur le site Baobab." : "Information about cookies and preferences used on the Baobab website.",
    frPath: "/fr/cookies",
    enPath: "/en/cookies",
  });
}

export default async function CookiesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (!locales.includes(rawLocale as Locale)) notFound();
  const copy = dictionaries[rawLocale as Locale].cookieConsent;
  return <main className="mx-auto max-w-4xl px-5 py-16 sm:px-8 md:py-24"><Heading as="h1">{copy.pageTitle}</Heading><div className="mt-8 grid gap-5 text-base leading-7 text-muted"><p>{copy.pageBody}</p><p>{copy.essentialOnly}</p><p>{copy.preferenceCookie}</p><p>{copy.futureTracking}</p></div></main>;
}
