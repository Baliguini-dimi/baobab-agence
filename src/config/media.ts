import type { Locale } from "@/content/schema";

export type PreviewImage = {
  id: string;
  src: string;
  width: number;
  height: number;
  ratio: "3:2" | "16:9" | "16:10";
  alt: Record<Locale, string>;
  caption: Record<Locale, string>;
};

const previewMockupsEnabled =
  process.env.BAOBAB_PREVIEW_MOCKUPS === "true" &&
  (process.env.VERCEL_ENV === "preview" || process.env.NODE_ENV === "development");

const previewImages = {
  hero: {
    id: "hero-team-at-work",
    src: "/images/mockups/hero-equipe-travail.webp",
    width: 1280,
    height: 853,
    ratio: "3:2",
    alt: {
      fr: "Quatre personnes travaillent autour d’une table avec des ordinateurs portables dans un bureau lumineux.",
      en: "Four people work around a table with laptops in a bright office.",
    },
    caption: { fr: "", en: "" },
  },
  about: [
    {
      id: "team-at-work",
      src: "/images/mockups/equipe-en-action.webp",
      width: 1280,
      height: 853,
      ratio: "3:2",
      alt: {
        fr: "Des personnes échangent autour d’un ordinateur dans un bureau lumineux.",
        en: "People discuss around a computer in a bright office.",
      },
      caption: {
        fr: "Illustration de scène de travail ; elle ne représente pas l’équipe de Baobab.",
        en: "Illustration of a work scene; it does not depict the Baobab team.",
      },
    },
    {
      id: "team-group",
      src: "/images/mockups/equipe-groupe.webp",
      width: 1280,
      height: 720,
      ratio: "16:9",
      alt: {
        fr: "Un groupe de personnes pose dans un bureau lumineux.",
        en: "A group of people pose in a bright office.",
      },
      caption: {
        fr: "Illustration ; les personnes représentées ne sont pas identifiées comme membres de l’équipe.",
        en: "Illustration; the people shown are not identified as team members.",
      },
    },
  ],
  mediaCoverage: [
    {
      id: "traditional-ceremony",
      src: "/images/mockups/couverture-mariage.webp",
      width: 1280,
      height: 853,
      ratio: "3:2",
      alt: {
        fr: "Un photographe prend une photo d’un couple lors d’une cérémonie traditionnelle.",
        en: "A photographer takes a picture of a couple at a traditional ceremony.",
      },
      caption: {
        fr: "Illustration d’une couverture événementielle ; ce n’est pas une prestation réalisée par Baobab.",
        en: "Illustration of event coverage; this is not work performed by Baobab.",
      },
    },
    {
      id: "studio-session",
      src: "/images/mockups/couverture-studio.webp",
      width: 1280,
      height: 853,
      ratio: "3:2",
      alt: {
        fr: "Un photographe réalise le portrait d’une femme dans un studio équipé d’éclairages.",
        en: "A photographer takes a woman’s portrait in a studio with lighting equipment.",
      },
      caption: {
        fr: "Illustration d’une séance photo ; ce n’est pas une prestation réalisée par Baobab.",
        en: "Illustration of a photo session; this is not work performed by Baobab.",
      },
    },
  ],
  demos: [
    {
      id: "banking-dashboard",
      src: "/images/mockups/projet-bankflow-demo.webp",
      width: 1280,
      height: 801,
      ratio: "16:10",
      alt: {
        fr: "Un ordinateur et un téléphone affichent une interface fictive de suivi bancaire.",
        en: "A laptop and a phone display a fictional banking dashboard.",
      },
      caption: { fr: "Interface de démonstration fictive.", en: "Fictional demo interface." },
    },
    {
      id: "media-library",
      src: "/images/mockups/projet-mediatheque-demo.webp",
      width: 1280,
      height: 801,
      ratio: "16:10",
      alt: {
        fr: "Un ordinateur et un téléphone affichent une interface fictive de médiathèque.",
        en: "A laptop and a phone display a fictional media library interface.",
      },
      caption: { fr: "Interface de démonstration fictive.", en: "Fictional demo interface." },
    },
    {
      id: "campus-platform",
      src: "/images/mockups/projet-smartcampus-demo.webp",
      width: 1280,
      height: 801,
      ratio: "16:10",
      alt: {
        fr: "Un ordinateur et un téléphone affichent une interface fictive de campus.",
        en: "A laptop and a phone display a fictional campus interface.",
      },
      caption: { fr: "Interface de démonstration fictive.", en: "Fictional demo interface." },
    },
  ],
} satisfies {
  hero: PreviewImage;
  about: PreviewImage[];
  mediaCoverage: PreviewImage[];
  demos: PreviewImage[];
};

export const agencyMedia = {
  enabled: previewMockupsEnabled,
  hero: previewMockupsEnabled ? previewImages.hero : null,
  about: previewMockupsEnabled ? previewImages.about : [],
  mediaCoverage: previewMockupsEnabled ? previewImages.mediaCoverage : [],
  demos: previewMockupsEnabled ? previewImages.demos : [],
};
