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

function assertClientDisclosurePolicy(record: unknown): void {
  if (!record || typeof record !== "object") return;
  const project = record as Record<string, unknown>;
  if (project.classification !== "client") return;
  const id = String(project.id ?? "unknown");
  if (project.writtenConsent !== true && project.anonymized !== true) {
    throw new Error(`Client project ${id} must be anonymized without written consent.`);
  }
  if (project.writtenConsent !== true && project.clientName) {
    throw new Error(`Client project ${id} cannot name a client without written consent.`);
  }
}

function visibleProjects(): Project[] {
  return visible(projects).filter((project) => {
    assertClientDisclosurePolicy(project);
    return true;
  });
}

const localRepository: ContentRepository = {
  async getProjects() {
    return visibleProjects();
  },
  async getProjectBySlug(locale, slug) {
    return (
      visibleProjects().find((project) => project.translations[locale].slug === slug) ?? null
    );
  },
  async getPosts() {
    return visible(posts);
  },
  async getPostBySlug(locale, slug) {
    return visible(posts).find((post) => post.translations[locale].slug === slug) ?? null;
  },
  async getTestimonials() {
    return visible(testimonials).filter((testimonial) => {
      if (!testimonial.writtenConsent) {
        throw new Error(`Published testimonial ${testimonial.id} is missing written consent.`);
      }
      return true;
    });
  },
  async getOffers() {
    return visible(offers).sort((a, b) => a.order - b.order);
  },
  async getTeam() {
    return visible(team)
      .filter((member) => member.publicProfileApproved)
      .sort((a, b) => a.order - b.order);
  },
};

export const getProjects = () => localRepository.getProjects();
export const getProjectBySlug = (locale: Locale, slug: string) =>
  localRepository.getProjectBySlug(locale, slug);
export const getPosts = () => localRepository.getPosts();
export const getPostBySlug = (locale: Locale, slug: string) =>
  localRepository.getPostBySlug(locale, slug);
export const getTestimonials = () => localRepository.getTestimonials();
export const getOffers = () => localRepository.getOffers();
export const getTeam = () => localRepository.getTeam();
