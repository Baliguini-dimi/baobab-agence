import DesignSystemDemo from "./demo";

export default async function DesignSystemPage({ params }: { params: Promise<{ locale: "fr" | "en" }> }) {
  const { locale } = await params;
  return <DesignSystemDemo locale={locale} />;
}
