import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { bodyFont, displayFont } from "@/app/fonts";
import { locales } from "@/content/schema";
import "@/styles/tokens.css";

export const metadata: Metadata = {
  title: { default: "Baobab — design system", template: "%s | Baobab" },
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

  return (
    <html lang={locale}>
      <body className={`${displayFont.variable} ${bodyFont.variable}`}>{children}</body>
    </html>
  );
}
