import projectsData from "./data/projects.json";
import postsData from "./data/posts.json";
import testimonialsData from "./data/testimonials.json";
import offersData from "./data/offers.json";
import teamData from "./data/team.json";
import type {
  ContentRepository,
  Locale,
  Offer,
  Post,
  Project,
  TeamMember,
  Testimonial,
} from "./schema";

// Keep imported records behind this typed boundary. Apply publication policy
// checks before returning records to any page.
const projects = projectsData as Project[];
const posts = postsData as Post[];
const testimonials = testimonialsData as Testimonial[];
const offers = offersData as Offer[];
const team = teamData as TeamMember[];

function visible<T extends { status: string }>(items: T[]): T[] {
  return items.filter((item) => item.status === "published");
}

function visibleProjects(): Project[] {
  return visible(projects).filter((project) => {
    if (project.classification !== "client") return true;
    if (!project.writtenConsent && !project.anonymized) {
      throw new Error(`Client project ${project.id} must be anonymized without written consent.`);
    }
    if (!project.writtenConsent && project.clientName) {
      throw new Error(`Client project ${project.id} cannot name a client without written consent.`);
    }
    return true;
  });
}

const localRepository: ContentRepository = {
  async getProjects(_locale: Locale) {
    return visibleProjects();
  },
  async getProjectBySlug(locale, slug) {
    return (
      visibleProjects().find((project) => project.translations[locale].slug === slug) ?? null
    );
  },
  async getPosts(_locale: Locale) {
    return visible(posts);
  },
  async getPostBySlug(locale, slug) {
    return visible(posts).find((post) => post.translations[locale].slug === slug) ?? null;
  },
  async getTestimonials(_locale: Locale) {
    return visible(testimonials).filter((testimonial) => {
      if (!testimonial.writtenConsent) {
        throw new Error(`Published testimonial ${testimonial.id} is missing written consent.`);
      }
      return true;
    });
  },
  async getOffers(_locale: Locale) {
    return visible(offers).sort((a, b) => a.order - b.order);
  },
  async getTeam(_locale: Locale) {
    return visible(team)
      .filter((member) => member.publicProfileApproved)
      .sort((a, b) => a.order - b.order);
  },
};

export const getProjects = (locale: Locale) => localRepository.getProjects(locale);
export const getProjectBySlug = (locale: Locale, slug: string) =>
  localRepository.getProjectBySlug(locale, slug);
export const getPosts = (locale: Locale) => localRepository.getPosts(locale);
export const getPostBySlug = (locale: Locale, slug: string) =>
  localRepository.getPostBySlug(locale, slug);
export const getTestimonials = (locale: Locale) => localRepository.getTestimonials(locale);
export const getOffers = (locale: Locale) => localRepository.getOffers(locale);
export const getTeam = (locale: Locale) => localRepository.getTeam(locale);
