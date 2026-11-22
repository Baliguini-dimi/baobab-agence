import type { Locale } from "./schema";

export type SeoPageKey =
  | "digital-solutions" | "ai-automation" | "online-presence" | "media-coverage"
  | "about" | "projects" | "blog" | "faq" | "equipment" | "legal" | "privacy";

export const pageSlugs: Record<SeoPageKey, { fr: string; en: string }> = {
  "digital-solutions": { fr: "solutions-numeriques", en: "digital-solutions" },
  "ai-automation": { fr: "ia-automatisation", en: "ai-automation" },
  "online-presence": { fr: "presence-en-ligne", en: "online-presence" },
  "media-coverage": { fr: "couverture-mediatique", en: "media-coverage" },
  about: { fr: "a-propos", en: "about" },
  projects: { fr: "realisations", en: "projects" },
  blog: { fr: "blog", en: "blog" },
  faq: { fr: "faq", en: "faq" },
  equipment: { fr: "equipements", en: "equipment" },
  legal: { fr: "mentions-legales", en: "legal-notice" },
  privacy: { fr: "confidentialite", en: "privacy" },
};

export interface PageCopy {
  title: string;
  description: string;
  eyebrow: string;
  intro: string;
  sections: { heading: string; body: string }[];
}

export const pageCopy: Record<Locale, Record<SeoPageKey, PageCopy>> = {
  fr: {
    "digital-solutions": {
      title: "Solutions numériques",
      description: "Création de sites web, applications mobiles, e-commerce et logiciels métiers par une agence digitale à Abidjan.",
      eyebrow: "Concevoir et construire",
      intro: "Nous concevons des outils numériques adaptés à vos objectifs, à vos équipes et aux usages de vos clients.",
      sections: [
        { heading: "Sites web et plateformes", body: "Sites vitrines, blogs et plateformes web pensés pour présenter votre activité et faciliter les échanges." },
        { heading: "E-commerce et applications", body: "Boutiques en ligne et applications mobiles conçues autour des parcours réels de vos utilisateurs." },
        { heading: "Logiciels métiers", body: "Outils de gestion développés selon les besoins que nous définissons avec vos équipes." },
      ],
    },
    "ai-automation": {
      title: "IA et automatisation",
      description: "Automatisation et solutions d'intelligence artificielle pour les entreprises et administrations à Abidjan.",
      eyebrow: "Simplifier les tâches",
      intro: "Nous étudions les tâches répétitives et les flux d'information pour proposer des automatisations utiles et compréhensibles.",
      sections: [
        { heading: "Automatiser les processus", body: "Reliez les étapes de travail répétitives et réduisez les ressaisies, avec des contrôles adaptés au processus." },
        { heading: "Assistants et chatbots", body: "Des assistants IA peuvent aider à traiter les questions récurrentes ou orienter une demande vers la bonne équipe." },
        { heading: "Démarrer par un besoin réel", body: "Chaque mission commence par le périmètre, les données disponibles et les validations nécessaires. Les usages sont définis avec le client." },
      ],
    },
    "online-presence": {
      title: "Présence en ligne",
      description: "Gestion de présence en ligne et de communautés pour commerces, PME, institutions et associations à Abidjan.",
      eyebrow: "Être visible et régulier",
      intro: "Nous accompagnons la publication et l'animation de vos canaux numériques à partir de vos objectifs et de vos contenus.",
      sections: [
        { heading: "Une ligne éditoriale claire", body: "Définissons ensemble les sujets, le ton, les formats et le rythme de publication adaptés à votre activité." },
        { heading: "Animation de communauté", body: "La modération et les réponses sont organisées selon les consignes et les horaires validés avec votre équipe." },
        { heading: "Suivi des publications", body: "Un suivi régulier permet d'observer les publications et d'ajuster le calendrier avec vous." },
      ],
    },
    "media-coverage": {
      title: "Couverture médiatique",
      description: "Préparation et couverture photo ou vidéo d'événements à Abidjan, selon le format et le périmètre convenus.",
      eyebrow: "Raconter vos événements",
      intro: "Nous préparons avec vous la couverture de votre événement et les contenus à produire sur place.",
      sections: [
        { heading: "Préparer la couverture", body: "Nous cadrons le programme, les moments importants, les livrables et les conditions d'accès avant l'événement." },
        { heading: "Photo et vidéo", body: "La couverture peut inclure des prises de vues photo ou vidéo selon le devis et les besoins convenus." },
        { heading: "Livraison des contenus", body: "Les délais, formats de fichiers et modalités de livraison sont précisés dans le devis." },
      ],
    },
    about: {
      title: "À propos de Baobab",
      description: "Découvrez Baobab, agence numérique basée à Dokui, Abobo, Abidjan.",
      eyebrow: "Ancrés à Abidjan",
      intro: "Baobab est une agence numérique basée à Dokui, Abobo, Abidjan.",
      sections: [
        { heading: "Une équipe et des partenaires", body: "L'agence réunit une équipe d'une dizaine de personnes et travaille aussi avec des prestataires selon les besoins des projets." },
        { heading: "Des compétences complémentaires", body: "Nous réunissons conception et réalisation numérique, automatisation, communication en ligne et couverture médiatique." },
        { heading: "Une méthode de travail", body: "Le besoin, le périmètre, les livrables et les validations sont précisés avec chaque client avant la réalisation." },
      ],
    },
    projects: { title: "Réalisations", description: "Découvrez les projets et démonstrations publiés par Baobab.", eyebrow: "Projets publiés", intro: "Cette sélection présente uniquement des projets autorisés, démonstrations ou projets académiques identifiés comme tels.", sections: [] },
    blog: { title: "Blog", description: "Articles et ressources publiés par l'équipe Baobab.", eyebrow: "Notes et ressources", intro: "Les articles seront publiés ici lorsqu'ils auront été rédigés et validés.", sections: [] },
    faq: {
      title: "Questions fréquentes",
      description: "Réponses aux questions fréquentes sur les services numériques de Baobab à Abidjan.",
      eyebrow: "Questions fréquentes",
      intro: "Quelques repères sur les demandes de devis et les services proposés.",
      sections: [
        { heading: "Comment demander un devis ?", body: "Utilisez le formulaire de contact et décrivez votre besoin, votre contexte et les délais souhaités. L'équipe pourra ensuite préciser le périmètre avec vous." },
        { heading: "Où se trouve Baobab ?", body: "L'agence est située à Dokui, Abobo, Abidjan. Les coordonnées et itinéraires sont disponibles sur la page Contact." },
        { heading: "Quels types de projets accompagnez-vous ?", body: "Baobab propose des solutions web, mobiles, e-commerce et métiers, de l'automatisation et de l'IA, la gestion de présence en ligne et la couverture médiatique." },
        { heading: "Quand les équipements seront-ils disponibles ?", body: "La vente d'équipements est prévue pour une phase ultérieure. La date de lancement n'est pas encore publiée." },
      ],
    },
    equipment: { title: "Équipements — bientôt disponibles", description: "La vente d'équipements Baobab sera annoncée ultérieurement.", eyebrow: "Bientôt disponible", intro: "La vente d'équipements est prévue dans une phase ultérieure. Aucune date de lancement n'est annoncée pour le moment.", sections: [] },
    legal: { title: "Mentions légales", description: "Informations légales du site Baobab.", eyebrow: "Informations légales", intro: "Cette page doit être complétée et vérifiée avant toute mise en ligne publique indexable.", sections: [{ heading: "Informations à confirmer", body: "La dénomination juridique, la forme sociale, les numéros d'immatriculation, le responsable de publication et l'hébergeur doivent être fournis et validés." }] },
    privacy: { title: "Confidentialité", description: "Informations sur la confidentialité et le traitement des données du site Baobab.", eyebrow: "Confidentialité", intro: "Cette page doit être complétée selon les traitements réellement mis en place avant toute mise en ligne publique indexable.", sections: [{ heading: "Informations à documenter", body: "Les finalités, bases juridiques, durées de conservation, destinataires et modalités d'exercice des droits doivent être confirmés pour les services effectivement activés." }] },
  },
  en: {
    "digital-solutions": { title: "Digital solutions", description: "Websites, mobile apps, e-commerce and business software from a digital agency in Abidjan.", eyebrow: "Plan and build", intro: "We design digital tools around your goals, teams and customers' needs.", sections: [{ heading: "Websites and platforms", body: "Websites, blogs and platforms that present your work and make it easier for people to connect." }, { heading: "E-commerce and apps", body: "Online stores and mobile apps designed around real user journeys." }, { heading: "Business software", body: "Management tools shaped around needs we define with your team." }] },
    "ai-automation": { title: "AI and automation", description: "Automation and practical AI solutions for businesses and public institutions in Abidjan.", eyebrow: "Make work simpler", intro: "We review repetitive tasks and information flows to propose useful, understandable automation.", sections: [{ heading: "Automate processes", body: "Connect repeatable work steps and reduce re-entry, with controls suited to the process." }, { heading: "Assistants and chatbots", body: "AI assistants can help handle recurring questions or route requests to the right team." }, { heading: "Start with a real need", body: "Each project begins with scope, available data and required reviews. The use case is defined with the client." }] },
    "online-presence": { title: "Online presence", description: "Online presence and community management for businesses, institutions and associations in Abidjan.", eyebrow: "Be visible and consistent", intro: "We support publishing and community activity across your digital channels, based on your goals and content.", sections: [{ heading: "A clear editorial direction", body: "Agree on topics, tone, formats and a publishing rhythm suited to your work." }, { heading: "Community management", body: "Moderation and replies follow guidance and hours agreed with your team." }, { heading: "Review and improve", body: "Regular reviews help us discuss posts and adjust the calendar together." }] },
    "media-coverage": { title: "Media coverage", description: "Photo and video event coverage in Abidjan, scoped around the agreed format and deliverables.", eyebrow: "Tell the story of your event", intro: "We plan event coverage with you and agree on the content to capture on site.", sections: [{ heading: "Plan the coverage", body: "We agree on the schedule, key moments, deliverables and access before the event." }, { heading: "Photo and video", body: "Coverage may include photography or video according to the agreed scope." }, { heading: "Content delivery", body: "Delivery dates, file formats and handoff are specified in the quote." }] },
    about: { title: "About Baobab", description: "Meet Baobab, a digital agency based in Dokui, Abobo, Abidjan.", eyebrow: "Rooted in Abidjan", intro: "Baobab is a digital agency based in Dokui, Abobo, Abidjan.", sections: [{ heading: "A team and partners", body: "The agency has a team of around ten people and works with external providers as project needs arise." }, { heading: "Complementary skills", body: "We bring together digital design and delivery, automation, online communications and media coverage." }, { heading: "A clear way of working", body: "We agree on needs, scope, deliverables and reviews with each client before delivery." }] },
    projects: { title: "Projects", description: "Explore projects and demonstrations published by Baobab.", eyebrow: "Published projects", intro: "This selection includes only authorized client work, demonstrations or clearly identified academic projects.", sections: [] },
    blog: { title: "Blog", description: "Articles and resources published by the Baobab team.", eyebrow: "Notes and resources", intro: "Articles will appear here once they have been written and reviewed.", sections: [] },
    faq: { title: "Frequently asked questions", description: "Answers to common questions about Baobab's digital services in Abidjan.", eyebrow: "Frequently asked questions", intro: "A few useful details about quotes and our services.", sections: [{ heading: "How do I request a quote?", body: "Use the contact form to describe your needs, context and preferred timing. The team can then clarify the scope with you." }, { heading: "Where is Baobab based?", body: "The agency is based in Dokui, Abobo, Abidjan. Contact details and directions are on the Contact page." }, { heading: "What kinds of projects do you take on?", body: "Baobab offers web, mobile, e-commerce and business software, AI and automation, online presence management and media coverage." }, { heading: "When will equipment be available?", body: "Equipment sales are planned for a later phase. No launch date has been announced." }] },
    equipment: { title: "Equipment — coming soon", description: "Baobab equipment sales will be announced later.", eyebrow: "Coming soon", intro: "Equipment sales are planned for a later phase. No launch date is available yet.", sections: [] },
    legal: { title: "Legal notice", description: "Legal information for the Baobab website.", eyebrow: "Legal information", intro: "This page must be completed and reviewed before the site is publicly indexable.", sections: [{ heading: "Details to confirm", body: "The legal entity name, registration details, publishing lead and hosting provider must be supplied and checked." }] },
    privacy: { title: "Privacy", description: "Privacy and data processing information for the Baobab website.", eyebrow: "Privacy", intro: "This page must reflect the actual processing in place before the site is publicly indexable.", sections: [{ heading: "Details to document", body: "Purposes, legal bases, retention periods, recipients and rights processes must be confirmed for services that are actually active." }] },
  },
};

export function getPageKey(locale: Locale, slug: string): SeoPageKey | null {
  return (Object.keys(pageSlugs) as SeoPageKey[]).find((key) => pageSlugs[key][locale] === slug) ?? null;
}
