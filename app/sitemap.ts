import type { MetadataRoute } from "next";
import { getPublishedArticles } from "@/lib/articles";

const SITE_URL = "https://bestsolutionskill.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticRoutes = [
    "",
    "/courses",
    "/courses/vibe-code-website-bootcamp",
    "/articles",
  ].map((path) => ({ url: `${SITE_URL}${path}`, lastModified: new Date() }));

  const articles = await getPublishedArticles();
  const articleRoutes = articles.map((a) => ({
    url: `${SITE_URL}/articles/${a.slug}`,
    lastModified: new Date(a.updatedAt),
  }));

  return [...staticRoutes, ...articleRoutes];
}
