import type { Locale } from "@/content/schema";

type OptionalPhoto = {
  src: string | null;
  width: number;
  height: number;
  alt: Record<Locale, string>;
  caption: Record<Locale, string>;
};

const previewMockupsEnabled =
  process.env.BAOBAB_PREVIEW_MOCKUPS === "true" &&
  (process.env.VERCEL_ENV === "preview" || process.env.NODE_ENV === "development");

export const agencyMedia: { hero: OptionalPhoto; about: OptionalPhoto } = {
  hero: previewMockupsEnabled
    ? {
        src: "/images/mockups/hero-equipe-travail.webp",
        width: 1280,
        height: 853,
        alt: {
          fr: "Quatre personnes travaillent autour d’une table avec des ordinateurs portables dans un bureau lumineux.",
          en: "Four people work around a table with laptops in a bright office.",
        },
        caption: {
          fr: "Maquette générée par IA · illustration de test, elle ne représente pas l’équipe réelle.",
          en: "AI-generated mockup · test illustration, not a depiction of the actual team.",
        },
      }
    : {
        src: null,
        width: 0,
        height: 0,
        alt: { fr: "", en: "" },
        caption: { fr: "", en: "" },
      },
  about: {
    src: null,
    width: 0,
    height: 0,
    alt: { fr: "", en: "" },
    caption: { fr: "", en: "" },
  },
};
