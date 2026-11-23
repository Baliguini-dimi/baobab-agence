export const locales = ["fr", "en"] as const;

export type Locale = (typeof locales)[number];
export type Localized<T> = Record<Locale, T>;
export type PublicationStatus = "draft" | "published";

export interface ContentBase {
  id: string;
  status: PublicationStatus;
  createdAt: string;
  updatedAt: string;
}

export type ProjectClassification = "client" | "demo" | "academique";

export interface ProjectTranslation {
  slug: string;
  title: string;
  summary: string;
  context: string;
  solution: string;
  technique: string;
  result: string;
  imageAlt?: string;
}

interface ProjectContent extends ContentBase {
  translations: Localized<ProjectTranslation>;
  tags: string[];
  publishedAt?: string;
}

type ClientProjectAuthorization =
  | { classification: "client"; writtenConsent: true; anonymized: boolean; clientName?: string }
  | { classification: "client"; writtenConsent: false; anonymized: true; clientName?: never };

export type Project = ProjectContent &
  (ClientProjectAuthorization | {
    classification: Exclude<ProjectClassification, "client">;
    writtenConsent: boolean;
    anonymized: boolean;
    clientName?: never;
  });

export interface PostTranslation {
  slug: string;
  title: string;
  excerpt: string;
  body: string;
  authorName?: string;
}

export interface Post extends ContentBase {
  translations: Localized<PostTranslation>;
  publishedAt?: string;
  tags: string[];
}

export interface TestimonialTranslation {
  quote: string;
  attribution: string;
  role?: string;
  organization?: string;
}

export interface Testimonial extends ContentBase {
  translations: Localized<TestimonialTranslation>;
  writtenConsent: boolean;
  anonymized: boolean;
}

export interface OfferTranslation {
  slug: string;
  title: string;
  summary: string;
  description: string;
}

export type OfferCategory = "digitalSolutions" | "aiAutomation" | "onlinePresence" | "mediaCoverage";

export interface OfferPrice {
  id: string;
  amountXof: number;
  cadence: "project" | "month";
  startingAt: boolean;
}

export interface Offer extends ContentBase {
  category: OfferCategory;
  translations: Localized<OfferTranslation>;
  prices: OfferPrice[];
  order: number;
}

export interface ServicePlanTranslation {
  name: string;
  summary: string;
  features: Record<PresencePlanFeatureKey, string | null>;
}

export type PresencePlanFeatureKey =
  | "networks" | "posts" | "visuals" | "videos" | "onsiteSession"
  | "communityReplies" | "metaCampaigns" | "googleBusiness" | "editorialCalendar" | "reporting";

export interface ServicePlan extends ContentBase {
  category: "onlinePresence";
  translations: Localized<ServicePlanTranslation>;
  amountXof: number;
  cadence: "month";
  order: number;
}

export interface ServicePlanCatalog {
  plans: ServicePlan[];
  terms: Localized<string[]>;
  featureKeys: PresencePlanFeatureKey[];
  featureLabels: Localized<Record<PresencePlanFeatureKey, string>>;
}

export interface TeamMemberTranslation {
  name: string;
  role: string;
  biography?: string;
}

export interface TeamMember extends ContentBase {
  translations: Localized<TeamMemberTranslation>;
  order: number;
  /** Keep false until the person has approved public identification. */
  publicProfileApproved: boolean;
}

export interface ContentRepository {
  getProjects(): Promise<Project[]>;
  getProjectBySlug(locale: Locale, slug: string): Promise<Project | null>;
  getPosts(): Promise<Post[]>;
  getPostBySlug(locale: Locale, slug: string): Promise<Post | null>;
  getTestimonials(): Promise<Testimonial[]>;
  getOffers(): Promise<Offer[]>;
  getPresencePlanCatalog(): Promise<ServicePlanCatalog>;
  getTeam(): Promise<TeamMember[]>;
}
