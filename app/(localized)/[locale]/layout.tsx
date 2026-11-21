import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { bodyFont, displayFont } from "@/app/fonts";
import { connection } from "next/server";
import { locales } from "@/content/schema";
import { CookieConsentBanner } from "@/components/site/cookie-consent-banner";
import messagesFr from "@/messages/fr.json";
import messagesEn from "@/messages/en.json";
import "@/styles/tokens.css";

const dictionaries = { fr: messagesFr, en: messagesEn };

export const metadata: Metadata = {
  title: { default: "Baobab — solutions numériques à Abidjan", template: "%s | Baobab" },
  robots: { index: false, follow: false },
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{ children: React.ReactNode; params: Promise<{ locale: string }> }>) {
  const { locale } = await params;
  if (!locales.includes(locale as (typeof locales)[number])) notFound();
  await connection();
  const consentCopy = dictionaries[locale as keyof typeof dictionaries].cookieConsent;

  return (
    <html lang={locale}>
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        <CookieConsentBanner copy={consentCopy} locale={locale as "fr" | "en"} />
        {children}
      </body>
    </html>
  );
}
