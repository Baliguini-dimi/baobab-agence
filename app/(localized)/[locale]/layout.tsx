import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { bodyFont, displayFont } from "@/app/fonts";
import { connection } from "next/server";
import { headers } from "next/headers";
import { locales } from "@/content/schema";
import { indexingEnabled, siteOrigin } from "@/lib/seo";
import { agencyContact, openingHours } from "@/config/contact";
import { jsonLd } from "@/lib/seo";
import { CookieConsentBanner } from "@/components/site/cookie-consent-banner";
import { MotionObserver } from "@/components/motion/motion-observer";
import messagesFr from "@/messages/fr.json";
import messagesEn from "@/messages/en.json";
import "@/styles/tokens.css";

const dictionaries = { fr: messagesFr, en: messagesEn };

export const metadata: Metadata = {
  title: { default: "Baobab — solutions numériques à Abidjan", template: "%s | Baobab" },
  metadataBase: siteOrigin,
  description: "Agence digitale à Abidjan, basée à Dokui, Abobo. Solutions numériques, IA, présence en ligne et couverture médiatique.",
  robots: indexingEnabled ? { index: true, follow: true } : { index: false, follow: false },
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
  const nonce = (await headers()).get("x-nonce") ?? undefined;
  const consentCopy = dictionaries[locale as keyof typeof dictionaries].cookieConsent;
  const brandLogoUrl = new URL("/brand/baobab-logo-clair.svg", siteOrigin).href;
  const organizationGraph = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Organization",
        name: "Baobab",
        logo: brandLogoUrl,
        email: agencyContact.email,
        telephone: agencyContact.phone,
        address: { "@type": "PostalAddress", streetAddress: agencyContact.address, addressLocality: "Abidjan", addressCountry: "CI" },
        contactPoint: { "@type": "ContactPoint", telephone: agencyContact.phone, email: agencyContact.email, contactType: "customer service", availableLanguage: ["French", "English"] },
      },
      {
        "@type": "LocalBusiness",
        name: "Baobab",
        email: agencyContact.email,
        telephone: agencyContact.phone,
        address: { "@type": "PostalAddress", streetAddress: agencyContact.address, addressLocality: "Abidjan", addressCountry: "CI" },
        geo: { "@type": "GeoCoordinates", latitude: agencyContact.latitude, longitude: agencyContact.longitude },
        openingHoursSpecification: [
          { "@type": "OpeningHoursSpecification", dayOfWeek: openingHours.weekdays.days, opens: openingHours.weekdays.opens, closes: openingHours.weekdays.closes },
          { "@type": "OpeningHoursSpecification", dayOfWeek: openingHours.saturday.days, opens: openingHours.saturday.opens, closes: openingHours.saturday.closes },
        ],
        parentOrganization: { "@type": "Organization", name: "Baobab" },
      },
    ],
  };

  return (
    <html lang={locale}>
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>
        <script nonce={nonce} type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(organizationGraph) }} />
        <CookieConsentBanner copy={consentCopy} locale={locale as "fr" | "en"} />
        <MotionObserver />
        {children}
      </body>
    </html>
  );
}
