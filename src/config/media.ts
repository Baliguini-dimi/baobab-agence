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
    caption: {
      fr: "Dans un bureau lumineux, quatre personnes travaillent autour d’ordinateurs portables.",
      en: "Four people work at laptops in a bright office.",
    },
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
        fr: "Autour d’un ordinateur, une personne présente son travail à ses collègues.",
        en: "Around a computer, one person presents their work to colleagues.",
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
        fr: "Un groupe de collègues pose ensemble dans un bureau lumineux.",
        en: "A group of colleagues pose together in a bright office.",
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
        fr: "Un photographe prend un couple en photo pendant une cérémonie traditionnelle.",
        en: "A photographer takes a couple’s photo during a traditional ceremony.",
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
        fr: "En studio, une photographe réalise le portrait d’une femme sous des éclairages.",
        en: "In a studio, a photographer takes a woman’s portrait under studio lights.",
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
        fr: "Un ordinateur et un téléphone affichent un tableau de bord bancaire de démonstration.",
        en: "A laptop and a phone display a banking dashboard demo.",
      },
      caption: {
        fr: "Un ordinateur et un téléphone affichent un tableau de bord bancaire.",
        en: "A laptop and a phone display a banking dashboard.",
      },
    },
    {
      id: "media-library",
      src: "/images/mockups/projet-mediatheque-demo.webp",
      width: 1280,
      height: 801,
      ratio: "16:10",
      alt: {
        fr: "Un ordinateur et un téléphone affichent une médiathèque numérique de démonstration.",
        en: "A laptop and a phone display a digital library demo.",
      },
      caption: {
        fr: "Une médiathèque numérique est affichée sur un ordinateur et un téléphone.",
        en: "A digital library appears on a laptop and a phone.",
      },
    },
    {
      id: "campus-platform",
      src: "/images/mockups/projet-smartcampus-demo.webp",
      width: 1280,
      height: 801,
      ratio: "16:10",
      alt: {
        fr: "Un ordinateur et un téléphone affichent une plateforme de campus de démonstration.",
        en: "A laptop and a phone display a campus platform demo.",
      },
      caption: {
        fr: "Un ordinateur et un téléphone affichent une plateforme de campus.",
        en: "A laptop and a phone display a campus platform.",
      },
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
