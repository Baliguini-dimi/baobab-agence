import type { Locale } from "@/content/schema";

type OptionalPhoto = { src: string | null; alt: Record<Locale, string> };

export const agencyMedia: { hero: OptionalPhoto; about: OptionalPhoto } = {
  hero: { src: null, alt: { fr: "", en: "" } },
  about: { src: null, alt: { fr: "", en: "" } },
};
