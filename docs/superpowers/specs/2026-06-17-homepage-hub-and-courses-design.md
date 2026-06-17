# Homepage Hub + ย้าย Landing เข้าเมนูคอร์สเรียน — Design

วันที่: 2026-06-17

## เป้าหมาย

เปลี่ยนหน้าแรก (`/`) จาก landing page ของคอร์สเดียว ให้กลายเป็น **หน้ารวม (hub)** ของแบรนด์
Best Solutions Skill ซึ่งเป็นแหล่งเรียนรู้สร้างเว็บ/ดิจิทัลด้วย AI (มีทั้งคอร์สและบทความในอนาคต)
และย้าย landing page เดิมของคอร์ส Vibe Code Bootcamp ไปอยู่ภายใต้เมนู "คอร์สเรียน"

โครงสร้างต้องรองรับการ **เพิ่มคอร์สและบทความในอนาคต** โดยไม่ต้องรื้อใหม่

## โครงสร้าง Routing (Next.js App Router)

| Route | เนื้อหา | ที่มา |
|-------|---------|-------|
| `/` | หน้าแรกใหม่ (hub) | สร้างใหม่ |
| `/courses` | หน้ารวมคอร์ส — การ์ดคอร์ส (ตอนนี้มี 1 คอร์ส) | สร้างใหม่ |
| `/courses/vibe-code-website-bootcamp` | landing เดิมของคอร์ส (ย้ายมาทั้งหมด) | ย้ายจาก `app/page.tsx` เดิม |
| `/articles` | หน้า "เร็วๆ นี้" (placeholder ให้เมนูลิงก์ได้) | สร้างใหม่ |

## Navigation

ใช้ **2 navbar** แยกตามบริบทหน้า:

- **`SiteNavbar`** (component ใหม่) — เมนูหลักของหน้า hub (`/`, `/courses`, `/articles`)
  - ลิงก์: หน้าแรก `/` · คอร์สเรียน `/courses` · บทความ `/articles` · เกี่ยวกับเรา `/#about` + ปุ่ม CTA ติดต่อ
  - ใช้ id/class เดิม (`nav`, `navmenu`, `navToggle`, `.nav`, `.navmenu`, `.nav-brand`, ฯลฯ)
    เพื่อให้ `Interactions.tsx` (mobile toggle, navbar-on-scroll) ทำงานได้โดยไม่ต้องแก้
  - logo `href` ชี้ `/`
- **`Navbar` เดิม** — อยู่บนหน้า course landing (`/courses/vibe-code-website-bootcamp`) ต่อไป
  - คง anchor nav ภายในหน้า (`#workflow`, `#portfolio`, `#curriculum`, `#pricing`, `#faq`) ที่ใช้ได้บนหน้านั้น
  - แก้: logo `href` `#top` → `/` และเพิ่มลิงก์ "คอร์สทั้งหมด" → `/courses`

## หน้าแรกใหม่ (`/`) — 5 ส่วน

สร้าง component ใหม่ทั้งหมด **reuse CSS class เดิม** จาก `app/styles.css`
(`.section-head`, `.card`, `.card-hover`, `.grid`, `.grid-3`, `.btn`, `.btn-primary`, `.btn-outline`,
`.pill`, `.g-text`, `.cta-row`, `.final-cta`, `.hero`, `.container`) — ไม่เพิ่ม CSS framework ใหม่

1. **HomeHero** (`components/home/HomeHero.tsx`)
   - แนะนำแบรนด์: "Best Solutions Skill — แหล่งเรียนรู้สร้างเว็บและทักษะดิจิทัลด้วย AI"
     (tagline ปรับได้ตอนรีวิว)
   - ปุ่ม: "ดูคอร์สเรียน" → `/courses`, "อ่านบทความ" → `/articles`
2. **FeaturedCourses** (`components/home/FeaturedCourses.tsx`)
   - หัวข้อ "คอร์สแนะนำ" + การ์ดคอร์ส (โครงสร้างรับหลายคอร์ส แต่ตอนนี้มี Vibe Code Bootcamp 1 ใบ)
   - การ์ดลิงก์ไป `/courses/vibe-code-website-bootcamp`
   - ข้อมูลคอร์สเก็บเป็น array/ค่าคงที่ เพื่อเพิ่มคอร์สในอนาคตได้ง่าย
3. **LatestArticles** (`components/home/LatestArticles.tsx`)
   - หัวข้อ "บทความล่าสุด" + สถานะ coming soon (ยังไม่มีบทความ)
4. **About** (`components/home/About.tsx`) — `id="about"`
   - เกี่ยวกับเรา สั้นๆ (พันธกิจ/จุดเด่นของแบรนด์)
5. **Contact CTA** (`components/home/HomeCta.tsx`)
   - reuse pattern `.final-cta` — ช่องทางติดต่อ (LINE/โทร) + อาศัย `FloatingContact` เดิมใน layout

`app/page.tsx` ใหม่ประกอบ: `<SiteNavbar />` + `<main>` ทั้ง 5 ส่วน + `<Footer />`

## หน้ารวมคอร์ส (`/courses`)

- `app/courses/page.tsx` — `<SiteNavbar />` + section การ์ดคอร์ส (ใช้ข้อมูลคอร์สชุดเดียวกับ FeaturedCourses) + `<Footer />`
- หัวข้อ "คอร์สเรียนทั้งหมด"

## หน้า course landing (`/courses/vibe-code-website-bootcamp`)

- `app/courses/vibe-code-website-bootcamp/page.tsx` — ย้ายเนื้อหาจาก `app/page.tsx` เดิมมาทั้งหมด
- ใช้ `Navbar` เดิม + component คอร์สเดิมทุกตัว (Hero, TrustBar, Problem, Workflow, Build, Portfolio,
  Curriculum, Bonus, Instructor, Pricing, Tools, Faq, FinalCta) + `Footer`
- **ไม่แก้ไข logic ภายใน component คอร์สเดิม**

## หน้า articles (`/articles`)

- `app/articles/page.tsx` — `<SiteNavbar />` + hero "บทความ — เร็วๆ นี้" + `<Footer />`
- เนื้อหาขั้นต่ำ พร้อมต่อยอดเป็นรายการบทความจริงภายหลัง

## Footer (global)

- แก้ลิงก์ `components/Footer.tsx` จาก anchor (`#workflow` ฯลฯ) เป็น site route:
  คอร์สเรียน `/courses` · บทความ `/articles` · เกี่ยวกับเรา `/#about` · ติดต่อ (LINE คงเดิม)
- ใช้ Footer ตัวเดียวกันทุกหน้า

## เมตาดาทา (SEO)

- `app/layout.tsx`: ปรับ default `metadata` ให้เป็นระดับแบรนด์ (หน้ารวม) ไม่ผูกกับคอร์สเดียว
- `app/courses/vibe-code-website-bootcamp/page.tsx`: export `metadata` ของคอร์ส (title/description เดิม)
- `app/courses/page.tsx`, `app/articles/page.tsx`: export `metadata` ของแต่ละหน้า

## สิ่งที่ไม่แตะ

- Component คอร์สเดิมทุกตัวใน `components/` (เว้น `Footer.tsx` ที่แก้ลิงก์, `Navbar.tsx` ที่แก้ logo href + เพิ่มลิงก์)
- `app/layout.tsx` ส่วน `FloatingContact` / `Interactions` (ทำงานทุกหน้าอยู่แล้ว)
- ระบบ CSS (`tokens.css`, `base.css`, `styles.css`, `globals.css`) — เพิ่ม class ใหม่เฉพาะเท่าที่จำเป็นต่อ layout หน้าใหม่ โดยต่อท้าย `styles.css`

## ไฟล์ที่เกี่ยวข้อง

**สร้างใหม่:**
- `app/page.tsx` (เขียนทับ — หน้าแรกใหม่)
- `app/courses/page.tsx`
- `app/courses/vibe-code-website-bootcamp/page.tsx`
- `app/articles/page.tsx`
- `components/SiteNavbar.tsx`
- `components/home/HomeHero.tsx`, `FeaturedCourses.tsx`, `LatestArticles.tsx`, `About.tsx`, `HomeCta.tsx`
- `components/home/courses.ts` (ข้อมูลคอร์สใช้ร่วม `/` และ `/courses`)

**แก้ไข:**
- `components/Navbar.tsx` (logo href + ลิงก์คอร์สทั้งหมด)
- `components/Footer.tsx` (ลิงก์เป็น site route)
- `app/layout.tsx` (default metadata ระดับแบรนด์)
- `app/styles.css` (เพิ่ม class สำหรับ section หน้าใหม่ ถ้าจำเป็น)

## เกณฑ์ความสำเร็จ

- `/` แสดงหน้ารวมพร้อม 5 ส่วน และเมนู SiteNavbar
- `/courses` แสดงการ์ดคอร์ส ลิงก์ไปหน้าคอร์สได้
- `/courses/vibe-code-website-bootcamp` แสดง landing เดิมครบถ้วน เหมือนหน้าแรกเดิมทุกประการ
- `/articles` แสดง placeholder
- เมนูและ footer นำทางข้ามหน้าได้ถูกต้องทุกหน้า
- mobile nav toggle + navbar-on-scroll + reveal-on-scroll ทำงานทุกหน้า
- `npm run build` ผ่าน ไม่มี error/warning ใหม่
