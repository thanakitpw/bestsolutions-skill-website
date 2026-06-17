import { getSupabase } from "./supabase";

export type Article = {
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  author: string;
  tags: string[];
  publishedAt: string | null;
  updatedAt: string;
};

type Row = {
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  cover_image: string | null;
  author: string;
  tags: string[] | null;
  published_at: string | null;
  updated_at: string;
};

const COLUMNS =
  "slug,title,excerpt,content,cover_image,author,tags,published_at,updated_at";

function toArticle(r: Row): Article {
  return {
    slug: r.slug,
    title: r.title,
    excerpt: r.excerpt,
    content: r.content,
    coverImage: r.cover_image,
    author: r.author,
    tags: r.tags ?? [],
    publishedAt: r.published_at,
    updatedAt: r.updated_at,
  };
}

export async function getPublishedArticles(limit?: number): Promise<Article[]> {
  const sb = getSupabase();
  if (!sb) return [];
  let q = sb
    .from("articles")
    .select(COLUMNS)
    .eq("status", "published")
    .order("published_at", { ascending: false });
  if (limit) q = q.limit(limit);
  const { data, error } = await q;
  if (error || !data) return [];
  return (data as Row[]).map(toArticle);
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const sb = getSupabase();
  if (!sb) return null;
  const { data, error } = await sb
    .from("articles")
    .select(COLUMNS)
    .eq("status", "published")
    .eq("slug", slug)
    .maybeSingle();
  if (error || !data) return null;
  return toArticle(data as Row);
}

export async function getPublishedArticleSlugs(): Promise<string[]> {
  const sb = getSupabase();
  if (!sb) return [];
  const { data, error } = await sb
    .from("articles")
    .select("slug")
    .eq("status", "published");
  if (error || !data) return [];
  return (data as { slug: string }[]).map((r) => r.slug);
}
