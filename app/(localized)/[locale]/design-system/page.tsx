import DesignSystemDemo from "./demo";
import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

export async function generateMetadata({ params }: { params: Promise<{ locale: "fr" | "en" }> }): Promise<Metadata> {
  const { locale } = await params;
  const isFrench = locale === "fr";
  return pageMetadata({
    locale,
    title: isFrench ? "Démonstration du système visuel" : "Design system demonstration",
    description: isFrench ? "Aperçu des composants et styles de l'interface Baobab." : "Preview of Baobab interface components and styles.",
    frPath: "/fr/design-system",
    enPath: "/en/design-system",
  });
}

export default async function DesignSystemPage({ params }: { params: Promise<{ locale: "fr" | "en" }> }) {
  const { locale } = await params;
  return <DesignSystemDemo locale={locale} />;
}
