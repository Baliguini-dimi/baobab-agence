import { redirect } from "next/navigation";

export default async function LocaleHomePreview({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  redirect(`/${locale}/design-system`);
}
