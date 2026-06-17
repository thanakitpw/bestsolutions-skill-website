# ระบบบทความ (Articles) เน้น SEO — Phase A Design

วันที่: 2026-06-17

## ขอบเขต

Phase A = **ฝั่งอ่าน + SEO + เปลี่ยนเมนู landing**. ส่งมอบเว็บที่แสดงบทความจาก Supabase
พร้อม SEO ครบ และ deploy ได้จริง ช่วงแรกเพิ่มบทความผ่าน Supabase Studio (Table Editor)
เพื่อทดสอบ. หน้า Admin สำหรับเขียน/แก้บทความเป็น **Phase B** (สเปกแยก ทำต่อทีหลัง)

เป้าหมาย: ทุกบทความ index ได้ดีบน Google — มี metadata ราย URL, structured data,
sitemap, robots — และเว็บยัง build/รันได้แม้ยังไม่ใส่ค่า Supabase

## หลักการสำคัญ

- **Resilient ต่อ Supabase ที่ยังไม่ตั้งค่า:** ถ้าไม่มี env (`NEXT_PUBLIC_SUPABASE_URL` /
  `NEXT_PUBLIC_SUPABASE_ANON_KEY`) helper ทุกตัวคืนค่าว่าง — build ผ่าน, หน้าโชว์สถานะ "เร็วๆ นี้"
- **ปลอดภัย:** render Markdown ด้วย `react-markdown` (sanitize โดย default, ไม่มี raw HTML
  เว้นแต่เปิดเอง) — ไม่ใช้ `dangerouslySetInnerHTML`
- **SEO-first:** static prebuild + ISR, metadata + JSON-LD ต่อบทความ
- reuse ระบบ CSS เดิม (ไม่เพิ่ม CSS framework)

## Dependencies ที่เพิ่ม

- `@supabase/supabase-js` — client อ่านข้อมูล (anon key)
- `react-markdown` — render Markdown เป็น React (ปลอดภัย)
- `remark-gfm` — รองรับ table, strikethrough, autolink ใน Markdown

## ฐานข้อมูล (Supabase)

ไฟล์ migration: `supabase/migrations/0001_articles.sql`

```sql
create extension if not exists "pgcrypto";

create table if not exists public.articles (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  title text not null,
  excerpt text,                                   -- ใช้เป็น meta description + การ์ด
  content text not null default '',               -- เนื้อหา Markdown
  cover_image text,                               -- URL รูปปก (optional)
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

-- Phase A: อ่านได้เฉพาะบทความที่ published (write policy เพิ่มใน Phase B พร้อม auth)
drop policy if exists "public read published articles" on public.articles;
create policy "public read published articles"
  on public.articles for select
  using (status = 'published');

-- อัปเดต updated_at อัตโนมัติ
create or replace function public.set_updated_at()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
  before update on public.articles
  for each row execute function public.set_updated_at();
```

> ผู้ใช้รัน SQL นี้ใน Supabase (SQL Editor) และใส่ค่า env เอง — ดู "Prerequisite" ท้ายสเปก

## Data layer

### `lib/supabase.ts`
- `getSupabase(): SupabaseClient | null` — สร้าง client จาก env; คืน `null` ถ้า env ไม่ครบ
  (ใช้ `createClient(url, anonKey)` จาก `@supabase/supabase-js`)

### `lib/articles.ts`
ชนิดข้อมูลและ helper อ่านบทความ (ทุกตัว resilient — คืนค่าว่างถ้า `getSupabase()` เป็น null
หรือ query error):

```ts
export type Article = {
  slug: string;
  title: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  author: string;
  tags: string[];
  publishedAt: string | null;   // ISO
  updatedAt: string;            // ISO
};
```

- `getPublishedArticles(limit?: number): Promise<Article[]>`
  — `status='published'` order by `published_at` desc, จำกัดตาม limit
- `getArticleBySlug(slug: string): Promise<Article | null>`
  — บทความ published ตาม slug หรือ null
- `getPublishedArticleSlugs(): Promise<string[]>`
  — รายการ slug published (ใช้ใน `generateStaticParams` + `sitemap`)

map snake_case (DB) → camelCase (`Article`) ในชั้นนี้ที่เดียว

### `lib/format.ts`
- `formatThaiDate(iso: string): string` — แปลงวันที่เป็นไทย (เช่น "27 มิถุนายน 2026")
  ด้วย `Intl.DateTimeFormat("th-TH", { year:"numeric", month:"long", day:"numeric" })`
- `readingTimeMin(markdown: string): number` — ประมาณเวลาอ่าน: `max(1, round(chars/400))`
  (ภาษาไทยไม่เว้นวรรค จึงนับด้วยจำนวนอักขระ ~400 ตัว/นาที)

## หน้าเว็บ

ทุกหน้าใช้ `SiteNavbar` + `Footer`

### `/articles` — `app/articles/page.tsx`
- `export const revalidate = 60` (ISR)
- ดึง `getPublishedArticles()`
- ถ้าว่าง → แสดงบล็อก coming-soon (เหมือนปัจจุบัน)
- ถ้ามี → grid การ์ด `ArticleCard`
- metadata: title "บทความ | Best Solutions Skill", description ระดับหน้า, canonical `/articles`

### `/articles/[slug]` — `app/articles/[slug]/page.tsx`
- `export const revalidate = 60`, `export const dynamicParams = true`
- `generateStaticParams()` → จาก `getPublishedArticleSlugs()` (prebuild ทุกบทความ)
- `generateMetadata({ params })` → ดึงบทความ; ถ้าไม่มีคืน metadata ว่าง
  - title: `${article.title} | Best Solutions Skill`
  - description: `article.excerpt`
  - `alternates.canonical`: `/articles/${slug}`
  - openGraph: `type:"article"`, title, description, `images:[coverImage]`,
    `publishedTime: publishedAt`, `authors:[author]`, `tags`
  - twitter: `summary_large_image`
- เนื้อหา: `notFound()` ถ้าไม่มีบทความ; ไม่งั้นแสดง
  - header: tags, `<h1>` title, `<time dateTime>` วันที่ไทย + reading time + author
  - cover image (plain `<img>` ตาม convention เดิม) ถ้ามี
  - `<ReactMarkdown remarkPlugins={[remarkGfm]}>` render `content`
  - `<ArticleJsonLd article={article} />`

### อัปเดต `components/home/LatestArticles.tsx`
- เปลี่ยนเป็น async server component, ดึง `getPublishedArticles(3)`
- ว่าง → coming-soon เดิม; มี → grid `ArticleCard` + ปุ่ม "อ่านบทความทั้งหมด" → `/articles`

## Components

### `components/articles/ArticleCard.tsx`
- รับ `{ article: Article }`
- ลิงก์ `/articles/${slug}`, reuse `.card .card-hover`
- แสดง cover (ถ้ามี), tags, title, excerpt, วันที่ไทย
- เพิ่ม CSS `.article-card*` ต่อท้าย `app/styles.css`

### `components/articles/ArticleJsonLd.tsx`
- render `<script type="application/ld+json">` ด้วย `JSON.stringify` ของ schema `BlogPosting`:
  - `@context`, `@type:"BlogPosting"`, `headline`, `description`, `image`,
    `datePublished: publishedAt`, `dateModified: updatedAt`,
    `author: { @type:"Organization", name: author }`,
    `publisher: { @type:"Organization", name:"Best Solutions Skill",
      logo:{ @type:"ImageObject", url: SITE/logo.png } }`,
    `mainEntityOfPage: SITE/articles/slug`
- ใช้ `SITE_URL = "https://bestsolutionskill.com"` (ตรงกับ `metadataBase` ใน layout)

## SEO routes

### `app/sitemap.ts` (Next MetadataRoute.Sitemap)
- static: `/`, `/courses`, `/courses/vibe-code-website-bootcamp`, `/articles`
- dynamic: ทุก `/articles/${slug}` พร้อม `lastModified` (จาก updatedAt) — ดึงจาก
  `getPublishedArticles()` (resilient: ว่างได้)
- base = `https://bestsolutionskill.com`

### `app/robots.ts` (Next MetadataRoute.Robots)
- `rules: [{ userAgent:"*", allow:"/", disallow:["/admin"] }]`
- `sitemap: "https://bestsolutionskill.com/sitemap.xml"`

## เปลี่ยนเมนูหน้า landing คอร์ส

- `app/courses/vibe-code-website-bootcamp/page.tsx`: import/ใช้ `SiteNavbar` แทน `Navbar`
- ลบไฟล์ `components/Navbar.tsx` (ไม่มีที่อื่นใช้แล้ว — ยืนยันด้วย grep)
- CTA ภายในหน้า (`#pricing`, `#workflow` ฯลฯ) ยังทำงานผ่าน smooth-scroll เดิม

## ENV / Prerequisite (ผู้ใช้ทำ)

เพิ่มใน `.env.example` (ค่าเปล่า) และผู้ใช้กรอกใน `.env.local` + Vercel:

```
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```

ผู้ใช้: (1) รัน `supabase/migrations/0001_articles.sql` ใน Supabase SQL Editor
(2) ใส่ค่า env ทั้งสอง (3) เพิ่มบทความทดสอบ 1 แถวใน Table Editor (`status='published'`,
`published_at=now()`)

## สิ่งที่ไม่แตะ

- component คอร์สเดิม (ยกเว้นสลับ navbar ในไฟล์ page ของคอร์ส)
- โครงสร้างหน้าแรก/หน้าคอร์สอื่น (เว้น `LatestArticles`)
- ระบบ CSS (เพิ่มเฉพาะ class บทความต่อท้าย `styles.css`)

## ไฟล์ที่เกี่ยวข้อง

**สร้างใหม่:**
- `lib/supabase.ts`, `lib/articles.ts`, `lib/format.ts`
- `supabase/migrations/0001_articles.sql`
- `app/articles/[slug]/page.tsx`
- `app/sitemap.ts`, `app/robots.ts`
- `components/articles/ArticleCard.tsx`, `components/articles/ArticleJsonLd.tsx`

**แก้ไข:**
- `app/articles/page.tsx` (listing จาก DB + ISR)
- `components/home/LatestArticles.tsx` (ดึง 3 บทความล่าสุด)
- `app/courses/vibe-code-website-bootcamp/page.tsx` (SiteNavbar)
- `app/styles.css` (class บทความ)
- `.env.example` (ตัวแปร Supabase)
- `package.json` (deps)

**ลบ:**
- `components/Navbar.tsx`

## เกณฑ์ความสำเร็จ

- ไม่มี env Supabase → `npm run build` ผ่าน, `/articles` โชว์ coming-soon, sitemap มีแต่ static routes
- มี env + บทความ published → `/articles` แสดงการ์ด, `/articles/[slug]` แสดงเนื้อหา Markdown
- หน้าแรกแสดง 3 บทความล่าสุด (ถ้ามี)
- view-source บทความ: มี `<title>`/`<meta description>`/canonical/OG/`<script type="application/ld+json">` BlogPosting ถูกต้อง
- `/sitemap.xml` รวม URL บทความ; `/robots.txt` ชี้ sitemap + disallow `/admin`
- หน้า landing คอร์สใช้ SiteNavbar; ไม่มี import `Navbar` ค้าง; build ผ่าน
- JSON-LD ผ่าน Google Rich Results Test (ตรวจ manual หลัง deploy)
