# Homepage Hub + Move Course Landing — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** เปลี่ยนหน้าแรกเป็นหน้ารวม (hub) ของแบรนด์ Best Solutions Skill และย้าย landing page คอร์สเดิมไปไว้ใต้เมนู "คอร์สเรียน" (`/courses`).

**Architecture:** Next.js App Router. เพิ่ม route `/courses`, `/courses/vibe-code-website-bootcamp`, `/articles`. หน้าแรก `/` เขียนใหม่เป็น hub ประกอบ component ใหม่ใน `components/home/`. ใช้ navbar 2 ตัว: `SiteNavbar` (หน้า hub) กับ `Navbar` เดิม (หน้าคอร์ส). ข้อมูลคอร์สเก็บรวมที่ `components/home/courses.ts`.

**Tech Stack:** Next.js 15 (App Router), React 19, TypeScript, ระบบ CSS เอง (`app/*.css`) — ไม่มี Tailwind, ไม่มี test framework.

## Global Constraints

- ภาษาไทยทั้งหมดในเนื้อหาที่ผู้ใช้เห็น; แบรนด์เขียน "Best Solutions Skill"
- ไม่เพิ่ม CSS framework/ไลบรารีใหม่ — reuse class เดิมจาก `app/styles.css` / `app/base.css`; CSS ใหม่ต่อท้าย `app/styles.css` เท่านั้น
- รูป `<img>` ใช้ `{/* eslint-disable-next-line @next/next/no-img-element */}` กำกับ (ตาม convention เดิม)
- navbar ทุกตัวต้องใช้ id `nav` / `navmenu` / `navToggle` และ class เดิม เพื่อให้ `components/Interactions.tsx` ทำงาน (mobile toggle, nav-on-scroll)
- ลิงก์ติดต่อ LINE: `https://lin.ee/Q22m30X` + `target="_blank" rel="noopener noreferrer" data-cta="line"`
- ไม่แก้ logic ภายใน component คอร์สเดิม (Hero, Pricing, Curriculum ฯลฯ)
- **Verification ของทุก task = `npm run build` ผ่านโดยไม่มี error ใหม่** (ไม่มี unit test ในโปรเจคนี้) + ตรวจหน้าใน dev server ตามที่ระบุ

---

### Task 1: ข้อมูลคอร์สใช้ร่วม (`courses.ts`)

**Files:**
- Create: `components/home/courses.ts`

**Interfaces:**
- Produces: `type Course`, `const courses: Course[]` — ใช้โดย Task 4 (CourseCard/FeaturedCourses) และ Task 7 (`/courses`)

- [ ] **Step 1: สร้างไฟล์ข้อมูลคอร์ส**

```ts
export type Course = {
  slug: string;
  title: string;
  subtitle: string;
  tag: string;
  schedule: string;
  priceNow: string;
  priceWas: string;
  bullets: string[];
  href: string;
};

export const courses: Course[] = [
  {
    slug: "vibe-code-website-bootcamp",
    title: "Vibe Code Website Bootcamp",
    subtitle:
      "สร้างเว็บไซต์ด้วย AI ใน 2 วัน ตั้งแต่วางไอเดีย ออกแบบ ขึ้น Next.js ติดตั้ง Tracking จน Deploy ออนไลน์",
    tag: "เรียนสด 2 วัน",
    schedule: "27–28 มิ.ย. 2026 · เสาร์–อาทิตย์",
    priceNow: "2,990.-",
    priceWas: "4,990.-",
    bullets: [
      "เรียนสด 2 วัน รวม 10 ชั่วโมง",
      "ใช้ AI ช่วยออกแบบ เขียนโค้ด และแก้ Error",
      "ติดตั้ง Tracking และ Deploy เว็บออนไลน์จริง",
    ],
    href: "/courses/vibe-code-website-bootcamp",
  },
];
```

- [ ] **Step 2: ตรวจ build**

Run: `npm run build`
Expected: ผ่าน (ไฟล์ยังไม่ถูก import ที่ไหน — เป็นแค่ module)

- [ ] **Step 3: Commit**

```bash
git add components/home/courses.ts
git commit -m "feat: shared course data module"
```

---

### Task 2: `SiteNavbar` (เมนูหลักหน้า hub)

**Files:**
- Create: `components/SiteNavbar.tsx`

**Interfaces:**
- Produces: `export function SiteNavbar()` — ใช้โดย Task 5, 6, 7 (หน้า `/`, `/courses`, `/articles`)
- Consumes: ไม่มี (markup ใช้ id/class ที่ `Interactions.tsx` ผูกไว้แล้ว)

- [ ] **Step 1: สร้าง SiteNavbar**

```tsx
export function SiteNavbar() {
  return (
    <header className="nav" id="nav">
      <div className="container nav-inner">
        <a className="nav-brand" href="/" aria-label="Best Solutions Skill หน้าแรก">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" width={40} height={40} />
          <span>
            Best Solutions<span className="g-text">.skill</span>
          </span>
        </a>
        <nav className="navmenu" id="navmenu" aria-label="เมนูหลัก">
          <a href="/">หน้าแรก</a>
          <a href="/courses">คอร์สเรียน</a>
          <a href="/articles">บทความ</a>
          <a href="/#about">เกี่ยวกับเรา</a>
          <a
            className="btn btn-primary navmenu-cta"
            href="https://lin.ee/Q22m30X"
            target="_blank"
            rel="noopener noreferrer"
            data-cta="line"
          >
            ติดต่อเรา
          </a>
        </nav>
        <button
          className="nav-toggle"
          id="navToggle"
          aria-label="เปิดเมนู"
          aria-expanded="false"
          aria-controls="navmenu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: ตรวจ build** — `npm run build` ผ่าน
- [ ] **Step 3: Commit**

```bash
git add components/SiteNavbar.tsx
git commit -m "feat: SiteNavbar for hub pages"
```

---

### Task 3: ย้าย landing เดิมไป `/courses/vibe-code-website-bootcamp`

**Files:**
- Create: `app/courses/vibe-code-website-bootcamp/page.tsx`

**Interfaces:**
- Consumes: component คอร์สเดิมทั้งหมดใน `@/components/*`
- Produces: route `/courses/vibe-code-website-bootcamp` + `export const metadata`

> หมายเหตุ: ตอนนี้ `app/page.tsx` เดิมยังอยู่ (route `/`) — มีเนื้อหาเดียวกันชั่วคราว build ผ่านได้ (คนละ route). Task 5 จะเขียนทับ `app/page.tsx`.

- [ ] **Step 1: สร้างหน้าคอร์ส (คัดลอกเนื้อจาก `app/page.tsx` เดิม)**

```tsx
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Problem } from "@/components/Problem";
import { Workflow } from "@/components/Workflow";
import { Build } from "@/components/Build";
import { Portfolio } from "@/components/Portfolio";
import { Curriculum } from "@/components/Curriculum";
import { Bonus } from "@/components/Bonus";
import { Instructor } from "@/components/Instructor";
import { Pricing } from "@/components/Pricing";
import { Tools } from "@/components/Tools";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Vibe Code Website Bootcamp | Best Solutions Skill",
  description:
    "คอร์สสอนสด 2 วัน สร้างเว็บไซต์ด้วย Vibe Code และ AI ตั้งแต่ Design, Next.js, Tracking จน Deploy ออนไลน์ พร้อมต่อยอดเป็น Portfolio สมัครงาน รับงาน หรือสร้างรายได้",
};

export default function VibeCodeBootcampPage() {
  return (
    <>
      <Navbar />
      <main id="top">
        <Hero />
        <TrustBar />
        <Problem />
        <Workflow />
        <Build />
        <Portfolio />
        <Curriculum />
        <Bonus />
        <Instructor />
        <Pricing />
        <Tools />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: ตรวจ build + เปิด `/courses/vibe-code-website-bootcamp`** — หน้าแสดงครบเหมือน landing เดิม
- [ ] **Step 3: Commit**

```bash
git add app/courses/vibe-code-website-bootcamp/page.tsx
git commit -m "feat: course landing at /courses/vibe-code-website-bootcamp"
```

---

### Task 4: Component หน้าแรก + CourseCard

**Files:**
- Create: `components/home/CourseCard.tsx`
- Create: `components/home/HomeHero.tsx`
- Create: `components/home/FeaturedCourses.tsx`
- Create: `components/home/LatestArticles.tsx`
- Create: `components/home/About.tsx`
- Create: `components/home/HomeCta.tsx`
- Modify: `app/styles.css` (ต่อท้าย — class ใหม่สำหรับหน้า hub)

**Interfaces:**
- Consumes: `Course`, `courses` จาก Task 1
- Produces: `CourseCard`, `HomeHero`, `FeaturedCourses`, `LatestArticles`, `About`, `HomeCta` — ใช้โดย Task 5; `CourseCard`, `FeaturedCourses` ใช้ `courses`

- [ ] **Step 1: `CourseCard.tsx`**

```tsx
import type { Course } from "./courses";

export function CourseCard({ course }: { course: Course }) {
  return (
    <a className="card card-hover course-card" href={course.href}>
      <span className="pill">
        <span className="dot" /> {course.tag}
      </span>
      <h3 className="course-card-title">{course.title}</h3>
      <p className="text-dim">{course.subtitle}</p>
      <ul className="check-list course-card-list">
        {course.bullets.map((b, i) => (
          <li key={i}>
            <span className="ck">✓</span> {b}
          </li>
        ))}
      </ul>
      <div className="course-card-foot">
        <span className="course-card-price">
          <b className="g-text">{course.priceNow}</b>{" "}
          <s className="text-dim">{course.priceWas}</s>
        </span>
        <span className="course-card-cta">ดูรายละเอียด →</span>
      </div>
      <span className="course-card-date text-dim">📅 {course.schedule}</span>
    </a>
  );
}
```

- [ ] **Step 2: `HomeHero.tsx`**

```tsx
export function HomeHero() {
  return (
    <section className="hero">
      <div className="container home-hero js-reveal">
        <span className="pill">
          <span className="dot" /> แหล่งเรียนรู้สร้างเว็บด้วย AI
        </span>
        <h1>
          เรียนสร้างเว็บและทักษะดิจิทัล
          <br />
          ด้วย <span className="g-text">AI</span> แบบลงมือทำจริง
        </h1>
        <p className="hero-sub home-hero-sub">
          Best Solutions Skill รวมคอร์สเรียนสดและบทความ ที่สอนตั้งแต่พื้นฐานจนนำไปใช้ได้จริง
          เปลี่ยนไอเดียให้เป็นเว็บไซต์และผลงานดิจิทัลของคุณเอง
        </p>
        <div className="cta-row cta-center">
          <a className="btn btn-primary btn-block-sm" href="/courses">
            ดูคอร์สเรียน →
          </a>
          <a className="btn btn-outline btn-block-sm" href="/articles">
            อ่านบทความ
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: `FeaturedCourses.tsx`**

```tsx
import { courses } from "./courses";
import { CourseCard } from "./CourseCard";

export function FeaturedCourses() {
  return (
    <section className="section section--alt" id="courses-preview">
      <div className="container">
        <div className="section-head js-reveal">
          <span className="eyebrow">Courses</span>
          <h2>
            คอร์ส<span className="g-text">แนะนำ</span>
          </h2>
          <p>คอร์สเรียนสดแบบจับมือทำ พร้อมแนวทางต่อยอดเป็นอาชีพหรือรายได้</p>
        </div>
        <div className="grid grid-3 js-reveal">
          {courses.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
        <div className="cta-row cta-center">
          <a className="btn btn-outline" href="/courses">
            ดูคอร์สทั้งหมด →
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: `LatestArticles.tsx`**

```tsx
export function LatestArticles() {
  return (
    <section className="section" id="articles-preview">
      <div className="container">
        <div className="section-head js-reveal">
          <span className="eyebrow">Articles</span>
          <h2>
            บทความ<span className="g-text">ล่าสุด</span>
          </h2>
          <p>เรากำลังเตรียมบทความความรู้เรื่องการสร้างเว็บด้วย AI และทักษะดิจิทัล</p>
        </div>
        <div className="card coming-soon js-reveal">
          <span className="coming-soon-emoji">🚀</span>
          <b>บทความกำลังจะมาเร็วๆ นี้</b>
          <p className="text-dim">ติดตามเนื้อหาใหม่ได้ที่หน้านี้ หรือทักเราทาง LINE</p>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 5: `About.tsx`**

```tsx
const points = [
  { t: "เรียนแล้วใช้ได้จริง", d: "ทุกคอร์สเน้นลงมือทำตามได้ทีละขั้น จบแล้วได้ผลงานจริงติดมือ" },
  { t: "ใช้ AI เป็นเครื่องมือ", d: "สอนวิธีใช้ AI ช่วยคิด ออกแบบ และเขียนโค้ด ให้ทำงานได้เร็วขึ้น" },
  { t: "มีพี่เลี้ยงหลังเรียน", d: "ถามต่อได้ผ่าน Community และ Consult ไม่ทิ้งกันหลังเรียนจบ" },
];

export function About() {
  return (
    <section className="section section--alt" id="about">
      <div className="container">
        <div className="section-head js-reveal">
          <span className="eyebrow">About</span>
          <h2>
            เกี่ยวกับ <span className="g-text">Best Solutions Skill</span>
          </h2>
          <p>
            เราเชื่อว่าทุกคนสร้างเว็บและผลงานดิจิทัลได้ ถ้ามีเครื่องมือ AI ที่ใช่
            และคนสอนที่จับมือทำไปด้วยกัน
          </p>
        </div>
        <div className="grid grid-3 js-reveal">
          {points.map((p, i) => (
            <div className="card" key={i}>
              <h3>{p.t}</h3>
              <p className="text-dim">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 6: `HomeCta.tsx`**

```tsx
export function HomeCta() {
  return (
    <section className="final-cta">
      <div className="container final-cta-inner js-reveal">
        <span className="eyebrow">เริ่มวันนี้</span>
        <h2>พร้อมเริ่มสร้างเว็บแรกของคุณแล้วหรือยัง?</h2>
        <p>ปรึกษาเรื่องคอร์สหรือสอบถามเพิ่มเติมได้เลย เรายินดีช่วยคุณเริ่มต้น</p>
        <div className="cta-row cta-center">
          <a
            className="btn btn-primary"
            href="https://lin.ee/Q22m30X"
            target="_blank"
            rel="noopener noreferrer"
            data-cta="line"
          >
            ติดต่อทาง LINE
          </a>
          <a className="btn btn-outline" href="/courses">
            ดูคอร์สทั้งหมด
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 7: ต่อท้าย `app/styles.css` — CSS หน้า hub**

```css

/* ====================== HOME (hub) ====================== */
.home-hero { max-width: 760px; margin-inline: auto; text-align: center; }
.home-hero .pill { margin-bottom: var(--space-4); }
.home-hero-sub { margin-inline: auto; }

.course-card { display: flex; flex-direction: column; gap: var(--space-3); color: var(--text); }
.course-card-title { font-size: 1.15rem; }
.course-card-list { margin-top: var(--space-2); }
.course-card-list li { font-size: .92rem; }
.course-card-foot { display: flex; align-items: center; justify-content: space-between; margin-top: var(--space-2); }
.course-card-price b { font-family: var(--font-display); font-size: 1.3rem; }
.course-card-cta { color: var(--brand-tint); font-weight: 600; font-size: .92rem; }
.course-card-date { font-size: .85rem; }

.coming-soon { text-align: center; display: flex; flex-direction: column; align-items: center; gap: var(--space-2); }
.coming-soon-emoji { font-size: 2rem; }
.coming-soon p { color: var(--text-dim); }
```

- [ ] **Step 8: ตรวจ build** — `npm run build` ผ่าน (component ยังไม่ถูก import ก็ build ผ่าน)
- [ ] **Step 9: Commit**

```bash
git add components/home/ app/styles.css
git commit -m "feat: home hub components (hero, featured courses, articles, about, cta)"
```

---

### Task 5: เขียนหน้าแรกใหม่ (`app/page.tsx`)

**Files:**
- Modify: `app/page.tsx` (เขียนทับทั้งไฟล์)

**Interfaces:**
- Consumes: `SiteNavbar` (Task 2), home components (Task 4), `Footer`

- [ ] **Step 1: เขียนทับ `app/page.tsx`**

```tsx
import { SiteNavbar } from "@/components/SiteNavbar";
import { HomeHero } from "@/components/home/HomeHero";
import { FeaturedCourses } from "@/components/home/FeaturedCourses";
import { LatestArticles } from "@/components/home/LatestArticles";
import { About } from "@/components/home/About";
import { HomeCta } from "@/components/home/HomeCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <SiteNavbar />
      <main id="top">
        <HomeHero />
        <FeaturedCourses />
        <LatestArticles />
        <About />
        <HomeCta />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: ตรวจ build + เปิด `/`** — แสดง 5 ส่วน, เมนู SiteNavbar, mobile toggle ทำงาน
- [ ] **Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: new homepage hub"
```

---

### Task 6: หน้า `/articles` (placeholder)

**Files:**
- Create: `app/articles/page.tsx`

**Interfaces:**
- Consumes: `SiteNavbar`, `Footer`

- [ ] **Step 1: สร้าง `app/articles/page.tsx`**

```tsx
import type { Metadata } from "next";
import { SiteNavbar } from "@/components/SiteNavbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "บทความ | Best Solutions Skill",
  description: "บทความความรู้เรื่องการสร้างเว็บด้วย AI และทักษะดิจิทัล — เร็วๆ นี้",
};

export default function ArticlesPage() {
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
              <p>เรากำลังเตรียมบทความดีๆ เรื่องการสร้างเว็บด้วย AI และทักษะดิจิทัล</p>
            </div>
            <div className="card coming-soon js-reveal">
              <span className="coming-soon-emoji">🚀</span>
              <b>เร็วๆ นี้</b>
              <p className="text-dim">ระหว่างนี้ดูคอร์สเรียนของเราได้เลย</p>
              <a className="btn btn-primary" href="/courses">
                ดูคอร์สเรียน →
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: ตรวจ build + เปิด `/articles`**
- [ ] **Step 3: Commit**

```bash
git add app/articles/page.tsx
git commit -m "feat: articles placeholder page"
```

---

### Task 7: หน้ารวมคอร์ส (`/courses`)

**Files:**
- Create: `app/courses/page.tsx`

**Interfaces:**
- Consumes: `SiteNavbar`, `Footer`, `courses` (Task 1), `CourseCard` (Task 4)

- [ ] **Step 1: สร้าง `app/courses/page.tsx`**

```tsx
import type { Metadata } from "next";
import { SiteNavbar } from "@/components/SiteNavbar";
import { Footer } from "@/components/Footer";
import { courses } from "@/components/home/courses";
import { CourseCard } from "@/components/home/CourseCard";

export const metadata: Metadata = {
  title: "คอร์สเรียน | Best Solutions Skill",
  description: "คอร์สเรียนสดสร้างเว็บไซต์และทักษะดิจิทัลด้วย AI แบบจับมือทำ",
};

export default function CoursesPage() {
  return (
    <>
      <SiteNavbar />
      <main id="top">
        <section className="section">
          <div className="container">
            <div className="section-head js-reveal">
              <span className="eyebrow">Courses</span>
              <h2>
                คอร์สเรียน<span className="g-text">ทั้งหมด</span>
              </h2>
              <p>เลือกคอร์สที่ใช่สำหรับคุณ เรียนสดแบบจับมือทำ พร้อมต่อยอดเป็นอาชีพ</p>
            </div>
            <div className="grid grid-3 js-reveal">
              {courses.map((c) => (
                <CourseCard key={c.slug} course={c} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 2: ตรวจ build + เปิด `/courses`** — การ์ดคอร์ส คลิกแล้วไป `/courses/vibe-code-website-bootcamp`
- [ ] **Step 3: Commit**

```bash
git add app/courses/page.tsx
git commit -m "feat: courses listing page"
```

---

### Task 8: แก้ `Navbar` เดิม (หน้าคอร์ส)

**Files:**
- Modify: `components/Navbar.tsx`

- [ ] **Step 1: แก้ logo href + เพิ่มลิงก์ "คอร์สทั้งหมด"**

เปลี่ยน `href="#top"` ของ `nav-brand` เป็น `href="/"`:

```tsx
        <a className="nav-brand" href="/" aria-label="Best Solutions Skill หน้าแรก">
```

และเพิ่มลิงก์เป็นรายการแรกใน `navmenu` (ก่อน `Workflow`):

```tsx
        <nav className="navmenu" id="navmenu" aria-label="เมนูหลัก">
          <a href="/courses">คอร์สทั้งหมด</a>
          <a href="#workflow">Workflow</a>
          <a href="#portfolio">ผลงาน</a>
          <a href="#curriculum">หลักสูตร</a>
          <a href="#pricing">ราคา</a>
          <a href="#faq">คำถามที่พบบ่อย</a>
          <a className="btn btn-primary navmenu-cta" href="#pricing">สมัครเรียน</a>
        </nav>
```

- [ ] **Step 2: ตรวจ build + เปิดหน้าคอร์ส** — logo ไป `/`, ลิงก์ "คอร์สทั้งหมด" ไป `/courses`, anchor อื่นยัง smooth-scroll ในหน้า
- [ ] **Step 3: Commit**

```bash
git add components/Navbar.tsx
git commit -m "feat: course navbar links to home + all courses"
```

---

### Task 9: แก้ `Footer` ให้ใช้ site route

**Files:**
- Modify: `components/Footer.tsx`

- [ ] **Step 1: เปลี่ยนลิงก์ `footer-links` จาก anchor เป็น site route**

แทนที่บล็อก `<nav className="footer-links">` เดิมด้วย:

```tsx
          <nav className="footer-links" aria-label="เมนูส่วนท้าย">
            <a href="/courses">คอร์สเรียน</a>
            <a href="/articles">บทความ</a>
            <a href="/#about">เกี่ยวกับเรา</a>
            <a className="btn btn-primary" href="https://lin.ee/Q22m30X" target="_blank" rel="noopener noreferrer" data-cta="line">
              ติดต่อสอบถาม
            </a>
          </nav>
```

- [ ] **Step 2: ตรวจ build + เปิดทุกหน้า** — footer ลิงก์ข้ามหน้าได้ถูก
- [ ] **Step 3: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: footer uses site routes"
```

---

### Task 10: ปรับ default metadata ระดับแบรนด์ (`layout.tsx`)

**Files:**
- Modify: `app/layout.tsx:27-42`

- [ ] **Step 1: เปลี่ยน `title`/`description` default ให้เป็นระดับแบรนด์**

แทนค่าตัวแปร `title` และ `description` ใน `app/layout.tsx`:

```tsx
const title = "Best Solutions Skill | เรียนสร้างเว็บและทักษะดิจิทัลด้วย AI";
const description =
  "แหล่งเรียนรู้สร้างเว็บไซต์และทักษะดิจิทัลด้วย AI — คอร์สเรียนสดแบบจับมือทำ พร้อมบทความความรู้ ต่อยอดเป็นอาชีพหรือรายได้";
```

และอัปเดต `openGraph.description` ให้สอดคล้อง:

```tsx
    description:
      "แหล่งเรียนรู้สร้างเว็บไซต์และทักษะดิจิทัลด้วย AI — คอร์สเรียนสดและบทความความรู้",
```

> หน้าคอร์ส (`/courses/vibe-code-website-bootcamp`) มี `metadata` ของตัวเองจาก Task 3 จึง override ค่า default นี้

- [ ] **Step 2: ตรวจ build + ดู `<title>` หน้า `/`** — เป็น title แบรนด์ใหม่
- [ ] **Step 3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: brand-level default metadata"
```

---

### Task 11: ตรวจสอบรวม (build + ทุก route)

**Files:** ไม่มี (verification เท่านั้น)

- [ ] **Step 1: Build เต็ม** — `npm run build` ผ่านสะอาด, route list มี `/`, `/courses`, `/courses/vibe-code-website-bootcamp`, `/articles`
- [ ] **Step 2: เดินทุกหน้าใน dev**
  - `/` → 5 ส่วน + SiteNavbar; คลิกการ์ดคอร์ส → หน้าคอร์ส; เมนู/footer ข้ามหน้าได้
  - `/courses` → การ์ดคอร์ส
  - `/courses/vibe-code-website-bootcamp` → landing เดิมครบ; anchor nav smooth-scroll; logo → `/`
  - `/articles` → placeholder
  - mobile (จอแคบ): toggle เปิด/ปิดเมนูทุกหน้า
- [ ] **Step 3: ไม่มี commit เพิ่ม** (ถ้าเจอ bug ให้ย้อนแก้ task ที่เกี่ยวข้อง)

---

## Self-Review

- **Spec coverage:** routing 4 หน้า (Task 3,5,6,7) ✓ · SiteNavbar (Task 2,5,6,7) ✓ · Navbar เดิมแก้ (Task 8) ✓ · 5 ส่วนหน้าแรก (Task 4,5) ✓ · Footer site route (Task 9) ✓ · metadata (Task 3,6,7,10) ✓ · ข้อมูลคอร์สใช้ร่วม (Task 1) ✓ · ไม่แตะ component คอร์สเดิม ✓
- **Placeholder scan:** ไม่มี TODO/TBD — โค้ดครบทุก step
- **Type consistency:** `Course`/`courses` (Task 1) ใช้ตรงกันใน CourseCard/FeaturedCourses (Task 4) และ `/courses` (Task 7); `CourseCard` รับ prop `{ course: Course }` ตรงกันทุกจุดเรียก
