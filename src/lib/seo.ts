import type { Metadata } from "next";
import type { Locale } from "@/content/schema";

export const indexingEnabled = process.env.SITE_INDEXING_ENABLED === "true";
export const siteOrigin = process.env.SITE_URL
  ? new URL(process.env.SITE_URL)
  : process.env.VERCEL_URL
    ? new URL(`https://${process.env.VERCEL_URL}`)
    : undefined;

export function pageMetadata({
  locale,
  title,
  description,
  frPath,
  enPath,
  type = "website",
  noindex = false,
}: {
  locale: Locale;
  title: string;
  description: string;
  frPath: string;
  enPath: string;
  type?: "website" | "article";
  noindex?: boolean;
}): Metadata {
  const path = locale === "fr" ? frPath : enPath;
  return {
    title,
    description,
    alternates: {
      canonical: path,
      languages: { fr: frPath, en: enPath, "x-default": frPath },
    },
    openGraph: {
      title,
      description,
      type,
      url: path,
      siteName: "Baobab",
      locale: locale === "fr" ? "fr_CI" : "en",
      alternateLocale: locale === "fr" ? ["en"] : ["fr_CI"],
    },
    robots: indexingEnabled && !noindex ? { index: true, follow: true } : { index: false, follow: false },
  };
}

export function jsonLd(value: Record<string, unknown>): string {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

export function localizedPath(locale: Locale, frPath: string, enPath: string) {
  return `/${locale}${locale === "fr" ? frPath : enPath}`;
}
