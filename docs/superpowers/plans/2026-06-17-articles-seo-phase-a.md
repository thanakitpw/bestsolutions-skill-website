# Articles + SEO (Phase A) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** แสดงบทความจาก Supabase พร้อม SEO ครบ (metadata, JSON-LD, sitemap, robots) และเปลี่ยนเมนูหน้า landing คอร์สเป็น SiteNavbar — โดยเว็บยัง build/รันได้แม้ยังไม่ใส่ค่า Supabase.

**Architecture:** Next.js App Router. Data layer (`lib/`) อ่านจาก Supabase ด้วย anon key แบบ resilient (คืนค่าว่างถ้า env ไม่ครบ). หน้า `/articles` + `/articles/[slug]` ใช้ static prebuild + ISR (`revalidate=60`). render Markdown ด้วย `react-markdown`. SEO ผ่าน `generateMetadata` + JSON-LD component + `sitemap.ts`/`robots.ts`.

**Tech Stack:** Next.js 15 (App Router, RSC), React 19, TypeScript, `@supabase/supabase-js`, `react-markdown`, `remark-gfm`, ระบบ CSS เอง (`app/*.css`). ไม่มี test framework.

## Global Constraints

- ภาษาไทยในเนื้อหาที่ผู้ใช้เห็น; แบรนด์ "Best Solutions Skill"
- ไม่เพิ่ม CSS framework — reuse class เดิม; CSS ใหม่ต่อท้าย `app/styles.css`
- รูป `<img>` ใช้ `{/* eslint-disable-next-line @next/next/no-img-element */}`
- **Resilient:** ถ้าไม่มี `NEXT_PUBLIC_SUPABASE_URL` / `NEXT_PUBLIC_SUPABASE_ANON_KEY` → helper คืนค่าว่าง, build ต้องผ่าน
- ห้าม `dangerouslySetInnerHTML` สำหรับ Markdown — ใช้ `react-markdown`
- `SITE_URL = "https://bestsolutionskill.com"` (ตรงกับ `metadataBase` ใน `app/layout.tsx`)
- ISR: `export const revalidate = 60` ในหน้าบทความ
- **Verification ของทุก task = `npm run build` ผ่านโดยไม่มี error ใหม่** (ไม่มี unit test) + ตรวจ route/HTML ตามที่ระบุ
- หยุด dev server ก่อนรัน `npm run build` (build เขียนทับ `.next` ทำให้ dev server เสิร์ฟ asset พัง)

---

### Task 1: ติดตั้ง dependencies + ENV ตัวอย่าง

**Files:**
- Modify: `package.json` (ผ่าน npm install)
- Modify: `.env.example`

- [ ] **Step 1: ติดตั้ง deps**

Run: `npm install @supabase/supabase-js react-markdown remark-gfm`
Expected: เพิ่มใน dependencies, ไม่มี error

- [ ] **Step 2: เพิ่มตัวแปร Supabase ใน `.env.example`** (ต่อท้ายไฟล์)

```
# Supabase — ใช้สำหรับระบบบทความ (Articles)
# สร้าง project ที่ supabase.com แล้วคัดลอกค่าจาก Project Settings → API
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

- [ ] **Step 3: ตรวจ build** — `npm run build` ผ่าน
- [ ] **Step 4: Commit**

```bash
git add package.json package-lock.json .env.example
git commit -m "chore: add supabase + react-markdown deps and env vars"
```

---

### Task 2: SQL migration (ตาราง articles + RLS)

**Files:**
- Create: `supabase/migrations/0001_articles.sql`

**Interfaces:**
- Produces: ตาราง `public.articles` (คอลัมน์: `slug, title, excerpt, content, cover_image, author, tags, status, published_at, created_at, updated_at`) — ใช้โดย Task 3

- [ ] **Step 1: สร้างไฟล์ migration**

```sql
create extension if not exists "pgcrypto";

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,
  content text not null default '',
  cover_image text,
  author text not null default 'Best Solutions Skill',
  tags text[] not null default '{}',
  status text not null default 'draft' check (status in ('draft','published')),
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists articles_status_published_idx
  on public.articles (status, published_at desc);

alter table public.articles enable row level security;

drop policy if exists "public read published articles" on public.articles;
create policy "public read published articles"
  on public.articles for select
  using (status = 'published');

create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
  before update on public.articles
  for each row execute function public.set_updated_at();
```

- [ ] **Step 2: Commit** (ไฟล์ SQL ไม่กระทบ build)

```bash
git add supabase/migrations/0001_articles.sql
git commit -m "feat: articles table migration + RLS public-read-published"
```

---

### Task 3: Data layer (`lib/supabase.ts`, `lib/articles.ts`, `lib/format.ts`)

**Files:**
- Create: `lib/supabase.ts`
- Create: `lib/articles.ts`
- Create: `lib/format.ts`

**Interfaces:**
- Produces:
  - `getSupabase(): SupabaseClient | null`
  - `type Article = { slug, title, excerpt: string|null, content, coverImage: string|null, author, tags: string[], publishedAt: string|null, updatedAt: string }`
  - `getPublishedArticles(limit?: number): Promise<Article[]>`
  - `getArticleBySlug(slug: string): Promise<Article | null>`
  - `getPublishedArticleSlugs(): Promise<string[]>`
  - `formatThaiDate(iso: string): string`
  - `readingTimeMin(markdown: string): number`
- ใช้โดย Task 4–9

- [ ] **Step 1: `lib/supabase.ts`**

```ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null | undefined;

export function getSupabase(): SupabaseClient | null {
  if (cached !== undefined) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  cached = url && key ? createClient(url, key) : null;
  return cached;
}
```

- [ ] **Step 2: `lib/articles.ts`**

```ts
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
```

- [ ] **Step 3: `lib/format.ts`**

```ts
export function formatThaiDate(iso: string): string {
  return new Intl.DateTimeFormat("th-TH", {
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(new Date(iso));
}

export function readingTimeMin(markdown: string): number {
  return Math.max(1, Math.round(markdown.length / 400));
}
```

- [ ] **Step 4: ตรวจ build** — `npm run build` ผ่าน (resilient: ไม่มี env ก็ไม่ throw)
- [ ] **Step 5: Commit**

```bash
git add lib/supabase.ts lib/articles.ts lib/format.ts
git commit -m "feat: resilient supabase data layer for articles"
```

---

### Task 4: `ArticleCard` + CSS

**Files:**
- Create: `components/articles/ArticleCard.tsx`
- Modify: `app/styles.css` (ต่อท้าย)

**Interfaces:**
- Consumes: `Article` (Task 3), `formatThaiDate` (Task 3)
- Produces: `export function ArticleCard({ article }: { article: Article })` — ใช้โดย Task 5, 7

- [ ] **Step 1: `components/articles/ArticleCard.tsx`**

```tsx
import type { Article } from "@/lib/articles";
import { formatThaiDate } from "@/lib/format";

export function ArticleCard({ article }: { article: Article }) {
  return (
    <a className="card card-hover article-card" href={`/articles/${article.slug}`}>
      {article.coverImage ? (
        <div className="article-card-shot">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={article.coverImage} alt={article.title} loading="lazy" />
        </div>
      ) : null}
      <div className="article-card-body">
        {article.tags.length > 0 ? (
          <span className="tag">{article.tags[0]}</span>
        ) : null}
        <h3 className="article-card-title">{article.title}</h3>
        {article.excerpt ? (
          <p className="text-dim article-card-excerpt">{article.excerpt}</p>
        ) : null}
        {article.publishedAt ? (
          <time className="article-card-date text-dim" dateTime={article.publishedAt}>
            {formatThaiDate(article.publishedAt)}
          </time>
        ) : null}
      </div>
    </a>
  );
}
```

- [ ] **Step 2: ต่อท้าย `app/styles.css`**

```css

/* ====================== ARTICLES ====================== */
.article-card { display: flex; flex-direction: column; gap: 0; padding: 0; overflow: hidden; color: var(--text); }
.article-card-shot { aspect-ratio: 16 / 9; overflow: hidden; background: var(--surface-2); }
.article-card-shot img { width: 100%; height: 100%; object-fit: cover; display: block; }
.article-card-body { display: flex; flex-direction: column; gap: var(--space-2); padding: var(--space-5); }
.article-card-title { font-size: 1.1rem; }
.article-card-excerpt { font-size: .92rem; }
.article-card-date { font-size: .82rem; margin-top: var(--space-1); }

.article { max-width: 760px; margin-inline: auto; }
.article-head { margin-bottom: var(--space-6); }
.article-head h1 { font-size: clamp(1.8rem, 4vw, 2.6rem); letter-spacing: -.02em; margin-block: var(--space-3); }
.article-meta { display: flex; flex-wrap: wrap; gap: var(--space-3); align-items: center; color: var(--text-dim); font-size: .9rem; }
.article-cover { aspect-ratio: 16 / 9; overflow: hidden; border-radius: var(--r-lg); margin-bottom: var(--space-8); }
.article-cover img { width: 100%; height: 100%; object-fit: cover; display: block; }
.article-body { font-size: 1.05rem; line-height: 1.85; color: var(--text); }
.article-body h2 { font-size: 1.5rem; margin-top: var(--space-8); margin-bottom: var(--space-3); }
.article-body h3 { font-size: 1.2rem; margin-top: var(--space-6); margin-bottom: var(--space-2); }
.article-body p { margin-bottom: var(--space-5); }
.article-body ul, .article-body ol { margin: 0 0 var(--space-5) 1.4em; display: grid; gap: 8px; }
.article-body li { list-style: revert; }
.article-body a { color: var(--brand-tint); text-decoration: underline; }
.article-body img { max-width: 100%; height: auto; border-radius: var(--r-md); }
.article-body pre { background: var(--surface-2); border: 1px solid var(--border); border-radius: var(--r-md); padding: var(--space-4); overflow-x: auto; margin-bottom: var(--space-5); }
.article-body code { font-family: var(--font-mono); font-size: .9em; }
.article-body blockquote { border-left: 3px solid var(--brand-from); padding-left: var(--space-4); color: var(--text-dim); margin: 0 0 var(--space-5); }
```

- [ ] **Step 3: ตรวจ build** — ผ่าน
- [ ] **Step 4: Commit**

```bash
git add components/articles/ArticleCard.tsx app/styles.css
git commit -m "feat: ArticleCard + article styles"
```

---

### Task 5: หน้า listing `/articles`

**Files:**
- Modify: `app/articles/page.tsx` (เขียนทับ — เดิมเป็น placeholder)

**Interfaces:**
- Consumes: `SiteNavbar`, `Footer`, `getPublishedArticles` (Task 3), `ArticleCard` (Task 4)

- [ ] **Step 1: เขียนทับ `app/articles/page.tsx`**

```tsx
import type { Metadata } from "next";
import { SiteNavbar } from "@/components/SiteNavbar";
import { Footer } from "@/components/Footer";
import { ArticleCard } from "@/components/articles/ArticleCard";
import { getPublishedArticles } from "@/lib/articles";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "บทความ | Best Solutions Skill",
  description: "บทความความรู้เรื่องการสร้างเว็บด้วย AI และทักษะดิจิทัล",
  alternates: { canonical: "/articles" },
};

export default async function ArticlesPage() {
  const articles = await getPublishedArticles();
  return (
    <>
      <SiteNavbar />
      <main id="top">
        <section className="section">
          <div className="container">
            <div className="section-head js-reveal">
              <span className="eyebrow">Articles</span>
              <h2>
                บทความ<span className="g-text">ความรู้</span>
              </h2>
              <p>บทความเรื่องการสร้างเว็บด้วย AI และทักษะดิจิทัล</p>
            </div>
            {articles.length === 0 ? (
              <div className="card coming-soon js-reveal">
                <span className="coming-soon-emoji">🚀</span>
                <b>เร็วๆ นี้</b>
                <p className="text-dim">ระหว่างนี้ดูคอร์สเรียนของเราได้เลย</p>
                <a className="btn btn-primary" href="/courses">
                  ดูคอร์สเรียน →
                </a>
              </div>
            ) : (
              <div className="grid grid-3 js-reveal">
                {articles.map((a) => (
                  <ArticleCard key={a.slug} article={a} />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: ตรวจ build + เปิด `/articles`** — ไม่มี env → โชว์ coming-soon, build ผ่าน
- [ ] **Step 3: Commit**

```bash
git add app/articles/page.tsx
git commit -m "feat: articles listing page from Supabase (ISR)"
```

---

### Task 6: `ArticleJsonLd`

**Files:**
- Create: `components/articles/ArticleJsonLd.tsx`

**Interfaces:**
- Consumes: `Article` (Task 3)
- Produces: `export function ArticleJsonLd({ article }: { article: Article })` — ใช้โดย Task 7

- [ ] **Step 1: `components/articles/ArticleJsonLd.tsx`**

```tsx
import type { Article } from "@/lib/articles";

const SITE_URL = "https://bestsolutionskill.com";

export function ArticleJsonLd({ article }: { article: Article }) {
  const data = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.excerpt ?? undefined,
    image: article.coverImage ?? `${SITE_URL}/logo.png`,
    datePublished: article.publishedAt ?? undefined,
    dateModified: article.updatedAt,
    author: { "@type": "Organization", name: article.author },
    publisher: {
      "@type": "Organization",
      name: "Best Solutions Skill",
      logo: { "@type": "ImageObject", url: `${SITE_URL}/logo.png` },
    },
    mainEntityOfPage: `${SITE_URL}/articles/${article.slug}`,
  };
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
```

> หมายเหตุ: `dangerouslySetInnerHTML` ที่นี่ใช้ฝัง JSON-LD ลง `<script>` (มาตรฐาน Next.js) — ไม่ใช่การ render Markdown ของผู้ใช้ จึงไม่ขัด constraint

- [ ] **Step 2: ตรวจ build** — ผ่าน
- [ ] **Step 3: Commit**

```bash
git add components/articles/ArticleJsonLd.tsx
git commit -m "feat: BlogPosting JSON-LD component"
```

---

### Task 7: หน้าบทความ `/articles/[slug]`

**Files:**
- Create: `app/articles/[slug]/page.tsx`

**Interfaces:**
- Consumes: `SiteNavbar`, `Footer`, `getArticleBySlug`, `getPublishedArticleSlugs` (Task 3), `formatThaiDate`, `readingTimeMin` (Task 3), `ArticleJsonLd` (Task 6)

- [ ] **Step 1: สร้าง `app/articles/[slug]/page.tsx`**

```tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { SiteNavbar } from "@/components/SiteNavbar";
import { Footer } from "@/components/Footer";
import { ArticleJsonLd } from "@/components/articles/ArticleJsonLd";
import {
  getArticleBySlug,
  getPublishedArticleSlugs,
} from "@/lib/articles";
import { formatThaiDate, readingTimeMin } from "@/lib/format";

export const revalidate = 60;
export const dynamicParams = true;

export async function generateStaticParams() {
  const slugs = await getPublishedArticleSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: `${article.title} | Best Solutions Skill`,
    description: article.excerpt ?? undefined,
    alternates: { canonical: `/articles/${slug}` },
    openGraph: {
      type: "article",
      title: article.title,
      description: article.excerpt ?? undefined,
      images: article.coverImage ? [article.coverImage] : undefined,
      publishedTime: article.publishedAt ?? undefined,
      authors: [article.author],
      tags: article.tags,
    },
    twitter: { card: "summary_large_image" },
  };
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await getArticleBySlug(slug);
  if (!article) notFound();

  return (
    <>
      <SiteNavbar />
      <main id="top">
        <article className="section">
          <div className="container article">
            <header className="article-head js-reveal">
              {article.tags.length > 0 ? (
                <span className="tag">{article.tags[0]}</span>
              ) : null}
              <h1>{article.title}</h1>
              <div className="article-meta">
                {article.publishedAt ? (
                  <time dateTime={article.publishedAt}>
                    {formatThaiDate(article.publishedAt)}
                  </time>
                ) : null}
                <span>· อ่าน {readingTimeMin(article.content)} นาที</span>
                <span>· {article.author}</span>
              </div>
            </header>
            {article.coverImage ? (
              <figure className="article-cover js-reveal">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={article.coverImage} alt={article.title} />
              </figure>
            ) : null}
            <div className="article-body js-reveal">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {article.content}
              </ReactMarkdown>
            </div>
          </div>
        </article>
        <ArticleJsonLd article={article} />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: ตรวจ build** — `generateStaticParams` คืน `[]` เมื่อไม่มี env, build ผ่าน
- [ ] **Step 3: Commit**

```bash
git add app/articles/[slug]/page.tsx
git commit -m "feat: article detail page with SEO metadata + JSON-LD (ISR/SSG)"
```

---

### Task 8: `sitemap.ts` + `robots.ts`

**Files:**
- Create: `app/sitemap.ts`
- Create: `app/robots.ts`

**Interfaces:**
- Consumes: `getPublishedArticles` (Task 3)

- [ ] **Step 1: `app/sitemap.ts`**

```ts
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
```

- [ ] **Step 2: `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";

const SITE_URL = "https://bestsolutionskill.com";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [{ userAgent: "*", allow: "/", disallow: ["/admin"] }],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: ตรวจ build + เปิด `/sitemap.xml` และ `/robots.txt`** — sitemap มี static routes (article routes ว่างถ้าไม่มี env), robots ชี้ sitemap + disallow /admin
- [ ] **Step 4: Commit**

```bash
git add app/sitemap.ts app/robots.ts
git commit -m "feat: sitemap.xml + robots.txt"
```

---

### Task 9: หน้าแรกดึง 3 บทความล่าสุด

**Files:**
- Modify: `components/home/LatestArticles.tsx`

**Interfaces:**
- Consumes: `getPublishedArticles` (Task 3), `ArticleCard` (Task 4)

> หมายเหตุ: `LatestArticles` เปลี่ยนเป็น async server component. `app/page.tsx` ใช้ `<LatestArticles />` อยู่แล้ว — async component ใช้ได้ใน RSC โดยไม่ต้องแก้ `page.tsx`. หน้าแรกจะกลายเป็น dynamic/ISR โดยอัตโนมัติจากการ fetch.

- [ ] **Step 1: เขียนทับ `components/home/LatestArticles.tsx`**

```tsx
import { getPublishedArticles } from "@/lib/articles";
import { ArticleCard } from "@/components/articles/ArticleCard";

export async function LatestArticles() {
  const articles = await getPublishedArticles(3);
  return (
    <section className="section" id="articles-preview">
      <div className="container">
        <div className="section-head js-reveal">
          <span className="eyebrow">Articles</span>
          <h2>
            บทความ<span className="g-text">ล่าสุด</span>
          </h2>
          <p>บทความความรู้เรื่องการสร้างเว็บด้วย AI และทักษะดิจิทัล</p>
        </div>
        {articles.length === 0 ? (
          <div className="card coming-soon js-reveal">
            <span className="coming-soon-emoji">🚀</span>
            <b>บทความกำลังจะมาเร็วๆ นี้</b>
            <p className="text-dim">ติดตามเนื้อหาใหม่ได้ที่หน้านี้ หรือทักเราทาง LINE</p>
          </div>
        ) : (
          <>
            <div className="grid grid-3 js-reveal">
              {articles.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
            <div className="cta-row cta-center">
              <a className="btn btn-outline" href="/articles">
                อ่านบทความทั้งหมด →
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: ตรวจ build + เปิด `/`** — ไม่มี env → coming-soon เดิม, build ผ่าน
- [ ] **Step 3: Commit**

```bash
git add components/home/LatestArticles.tsx
git commit -m "feat: homepage shows 3 latest articles"
```

---

### Task 10: เปลี่ยนเมนู landing เป็น SiteNavbar + ลบ Navbar เดิม

**Files:**
- Modify: `app/courses/vibe-code-website-bootcamp/page.tsx`
- Delete: `components/Navbar.tsx`

- [ ] **Step 1: ยืนยันว่าไม่มีใครใช้ Navbar นอกจากหน้าคอร์ส**

Run: `grep -rln "components/Navbar\"" app components`
Expected: เฉพาะ `app/courses/vibe-code-website-bootcamp/page.tsx`

- [ ] **Step 2: แก้ import + การใช้งานในหน้าคอร์ส**

เปลี่ยนบรรทัด import:

```tsx
import { SiteNavbar } from "@/components/SiteNavbar";
```

(ลบบรรทัด `import { Navbar } from "@/components/Navbar";`)

และเปลี่ยน `<Navbar />` เป็น `<SiteNavbar />` ใน JSX

- [ ] **Step 3: ลบไฟล์ Navbar เดิม**

Run: `git rm components/Navbar.tsx`

- [ ] **Step 4: ตรวจ build + เปิด `/courses/vibe-code-website-bootcamp`** — แสดง SiteNavbar, CTA `#pricing` ในหน้ายัง smooth-scroll, ไม่มี error import
- [ ] **Step 5: Commit**

```bash
git add app/courses/vibe-code-website-bootcamp/page.tsx components/Navbar.tsx
git commit -m "feat: course landing uses SiteNavbar; remove legacy Navbar"
```

---

### Task 11: ตรวจสอบรวม (resilient build + routes)

**Files:** ไม่มี (verification เท่านั้น)

- [ ] **Step 1: Build เต็ม (ยังไม่มี env Supabase)** — `npm run build` ผ่านสะอาด; route list มี `/articles`, `/articles/[slug]`, `/sitemap.xml`, `/robots.txt`
- [ ] **Step 2: เดินหน้า (ไม่มี env)**
  - `/articles` → coming-soon
  - `/` → LatestArticles เป็น coming-soon
  - `/sitemap.xml` → มี 4 static routes
  - `/robots.txt` → disallow /admin + ชี้ sitemap
  - `/courses/vibe-code-website-bootcamp` → SiteNavbar
- [ ] **Step 3: (หลังผู้ใช้ใส่ env + รัน SQL + เพิ่มบทความ published 1 แถว)** ทดสอบ:
  - `/articles` → การ์ดบทความ
  - `/articles/<slug>` → เนื้อหา Markdown; view-source มี `<title>`, `<meta name="description">`, `<link rel="canonical">`, `og:type=article`, `<script type="application/ld+json">` BlogPosting
  - `/` → 3 บทความล่าสุด
  - `/sitemap.xml` → มี URL บทความ
- [ ] **Step 4: ไม่มี commit เพิ่ม** (ถ้าเจอ bug ย้อนแก้ task ที่เกี่ยว)

---

## Self-Review

- **Spec coverage:** deps (Task 1) ✓ · migration+RLS (Task 2) ✓ · data layer resilient (Task 3) ✓ · ArticleCard+CSS (Task 4) ✓ · /articles listing (Task 5) ✓ · JSON-LD (Task 6) ✓ · /articles/[slug] + metadata + ISR/SSG (Task 7) ✓ · sitemap+robots (Task 8) ✓ · homepage latest (Task 9) ✓ · SiteNavbar swap + ลบ Navbar (Task 10) ✓ · resilient build (Task 1–11 verify) ✓ · ENV (Task 1) ✓
- **Placeholder scan:** ไม่มี TODO/TBD — โค้ดครบทุก step
- **Type consistency:** `Article` (camelCase) นิยามใน Task 3 ใช้ตรงกันใน Task 4/6/7/9; helper `getPublishedArticles`/`getArticleBySlug`/`getPublishedArticleSlugs`/`formatThaiDate`/`readingTimeMin` ชื่อ/ลายเซ็นตรงกันทุกจุดเรียก; Next 15 params เป็น `Promise<{slug}>` (await) สอดคล้องทั้ง `generateMetadata` และ page
- **หมายเหตุ constraint:** `dangerouslySetInnerHTML` ใช้เฉพาะ JSON-LD (Task 6) ซึ่งเป็น data ที่เราสร้างเอง ไม่ใช่ Markdown ผู้ใช้ — Markdown ใช้ `react-markdown` (Task 7) ตาม constraint
