import type { MetadataRoute } from "next";
import { indexingEnabled, siteOrigin } from "@/lib/seo";
import { pageSlugs, type SeoPageKey } from "@/content/seo-pages";
import { getProjects, getPosts } from "@/content/queries";
import { locales } from "@/content/schema";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  if (!indexingEnabled || !siteOrigin) return [];
  const [projects, posts] = await Promise.all([getProjects(), getPosts()]);
  const keys: SeoPageKey[] = ["digital-solutions", "ai-automation", "online-presence", "media-coverage", "about", "projects", "blog", "faq"];
  const entries: MetadataRoute.Sitemap = [];
  const addPair = (frPath: string, enPath: string, lastModified?: Date) => {
    for (const locale of locales) {
      const path = locale === "fr" ? frPath : enPath;
      entries.push({
        url: new URL(path, siteOrigin).toString(),
        ...(lastModified ? { lastModified } : {}),
        alternates: { languages: { fr: new URL(frPath, siteOrigin).toString(), en: new URL(enPath, siteOrigin).toString(), "x-default": new URL(frPath, siteOrigin).toString() } },
      });
    }
  };
  addPair("/fr", "/en");
  for (const key of keys) addPair(`/fr/${pageSlugs[key].fr}`, `/en/${pageSlugs[key].en}`);
  for (const project of projects) {
    addPair(`/fr/realisations/${project.translations.fr.slug}`, `/en/projects/${project.translations.en.slug}`, project.updatedAt ? new Date(project.updatedAt) : undefined);
  }
  for (const post of posts) {
    addPair(`/fr/blog/${post.translations.fr.slug}`, `/en/blog/${post.translations.en.slug}`, post.updatedAt ? new Date(post.updatedAt) : undefined);
  }
  return entries;
}
