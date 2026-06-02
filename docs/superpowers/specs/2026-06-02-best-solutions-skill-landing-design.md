# Best Solutions Skill — Landing Page (Phase 1: HTML) — Design Spec

- **วันที่:** 2026-06-02
- **สถานะ:** Approved (design language + structure) → พร้อมเข้าสู่ implementation plan
- **ที่มาเนื้อหา:** `ai-website-developer-live-class-landing-page.md` (brief หลัก — ใช้เป็นแหล่ง copy จริงทุก section)
- **Reference ดีไซน์:** uxui-studio.com/ux-ui-courses (dark + accent ร้อน + เน้น conversion)

---

## 1. ภาพรวม & เป้าหมาย

Landing Page หน้าเดียว เพื่อ **ขายคอร์สสอนสด "AI Website Developer Live Class"** ของ Best Solutions
เป้าหมายหลัก: ให้ผู้เข้าชมเข้าใจคุณค่าคอร์สเร็ว แล้วกด CTA → **สมัคร Early Bird** หรือ **ทัก LINE** (คอร์สเดี่ยว)

KPI เชิงดีไซน์: CTA ชัดและซ้ำหลายจุด, โหลดเร็ว, อ่านง่ายบนมือถือ, ดูน่าเชื่อถือระดับ Agency

## 2. กลุ่มเป้าหมาย

คนที่อยากทำเว็บด้วย AI, เจ้าของธุรกิจ, ฟรีแลนซ์, คนอยากต่อยอดทักษะทำเว็บยุค AI (มือใหม่เขียนโค้ดได้)

## 3. ขอบเขต (เฟสนี้เท่านั้น)

**In scope (Phase 1):**
- Landing Page หน้าเดียวเป็น HTML + CSS (Vanilla) + JS เล็กน้อย
- Design System แบบ token-based + เอกสาร `docs/design-system.md`
- Responsive ครบ (มือถือ / แท็บเล็ต / เดสก์ท็อป)
- ปุ่ม CTA ลิงก์ไป LINE / ตำแหน่งสมัคร (ใช้ placeholder link ไปก่อน)

**Out of scope (เฟสถัดไป — มีแผนในข้อ 12):**
- Next.js migration
- Database บทความ/บล็อก, ระบบรับ Lead จริง, ฟอร์มบันทึกข้อมูล
- Backend, auth, payment

## 4. แนวทางเทคนิค (Phase 1)

- **Vanilla HTML + CSS** (ไม่มี framework, ไม่มี build step) — เปิด `index.html` ดับเบิลคลิกดูได้ทันที
- **Design tokens** เป็น CSS Custom Properties ใน `css/tokens.css` → ยกไป `globals.css` ของ Next.js ได้ตรง ๆ ในเฟส 2
- **Fonts:** โหลดจาก Google Fonts (`Prompt`, `IBM Plex Sans Thai`, `IBM Plex Mono`)
- **ไอคอน:** inline SVG (ไม่พึ่ง icon library)
- **รูป:** ใช้ placeholder ก่อน (มี label บอก) แล้วแทนด้วยรูปจริงทีหลัง

## 5. Design System

### 5.1 สี (Color tokens)

```css
--bg:            #070a12;   /* พื้นหลังหลัก near-black navy */
--bg-alt:        #0d1220;   /* พื้น section สลับ */
--surface:       #141a2b;   /* การ์ด */
--surface-2:     #1b2236;   /* การ์ดซ้อน / hover */
--border:        rgba(255,255,255,0.08);
--border-strong: rgba(255,255,255,0.15);

--brand-from:    #f85a20;   /* ส้ม */
--brand-to:      #f82020;   /* แดง */
--brand-solid:   #f8431f;   /* สีเดี่ยวเวลาใช้สีทึบ */
--brand-tint:    #ff8a5c;   /* accent บนพื้นมืด อ่านง่าย */
--gradient-brand: linear-gradient(90deg, var(--brand-from), var(--brand-to));

--text:      #f5f7fa;
--text-dim:  #9aa3b2;
--text-mute: #6b7280;
```

หลักการใช้สีแบรนด์: ใช้ gradient ส้ม→แดงกับ **CTA, คำเด่นใน headline, icon tile, เครื่องหมายถูก, badge, ตัวเลขราคา, tab/accordion ที่ active** — ใช้อย่างมีจุดโฟกัส ไม่เกลื่อน

### 5.2 Typography

```css
--font-display: 'Prompt', sans-serif;              /* หัวข้อ */
--font-body:    'IBM Plex Sans Thai', 'Prompt', sans-serif;  /* เนื้อหา */
--font-mono:    'IBM Plex Mono', monospace;        /* label / โค้ด / eyebrow */
```

- น้ำหนัก: display 600/700/800 · body 400/500/600
- Type scale (responsive ด้วย `clamp`):
  - Hero H1: `clamp(2rem, 5vw, 2.75rem)`, line-height 1.12, letter-spacing -.02em
  - Section H2: `clamp(1.5rem, 3vw, 2rem)`
  - H3 (card title): 1.125–1.25rem
  - Body: 1rem (≈15–16px), line-height 1.6
  - Small: .875rem · Eyebrow/mono-label: .6875rem uppercase, letter-spacing .14em

### 5.3 Spacing / Radius / Shadow / Layout

```css
/* spacing scale (ฐาน 4px) */
--space-1:4px; --space-2:8px; --space-3:12px; --space-4:16px;
--space-6:24px; --space-8:32px; --space-12:48px; --space-16:64px; --space-24:96px;

/* radius */
--r-sm:8px; --r-md:11px; --r-lg:14px; --r-xl:16px; --r-pill:999px;

/* shadow — เงาดำนุ่มล้วน ไม่มี glow */
--shadow-sm: 0 6px 18px rgba(0,0,0,0.40);
--shadow-lg: 0 24px 50px rgba(0,0,0,0.50);

/* layout */
--container: 1200px;
--section-py: clamp(56px, 8vw, 96px);
--gutter: clamp(20px, 5vw, 40px);
```

> **No-glow rule:** ห้ามใช้เงาสีแบรนด์/แสงเรือง (เช่น `box-shadow: ... rgba(248,67,31,...)` หรือ radial glow หลัง section) — ดีไซน์เป็น flat dark สะอาด ใช้เงาดำนุ่มเพื่อมิติเท่านั้น

### 5.4 Component catalog

| Component | รายละเอียด |
|---|---|
| `btn` | `primary` (gradient เต็ม + เงาดำนุ่ม), `outline` (ขอบ border-strong), `ghost` (พื้น surface) |
| `pill` / `badge` | พื้น tint ส้มจาง + ขอบส้มจาง + จุด dot (ไม่เรือง) |
| `icon-tile` | สี่เหลี่ยมมน 40px พื้น gradient + glyph ขาว |
| `card` | พื้น surface, ขอบ border, radius `--r-lg` |
| `stat-chip` | trust bar — ไอคอน + ตัวเลข/ข้อความ |
| `step-card` | การ์ด workflow 7 ขั้น (มีเลขลำดับ) |
| `class-accordion` | การ์ดคลาส กดเปิด/ปิดดูรายละเอียด + การบ้าน |
| `pricing-card` | ปกติ + `featured` (ขอบส้ม + badge "แนะนำ") |
| `faq-accordion` | คำถาม + เครื่องหมาย +/− gradient |
| `navbar` | sticky, มี state เปลี่ยนพื้นตอน scroll |
| `footer` | แบรนด์ + ลิงก์ติดต่อ |

## 6. โครงสร้างหน้า (Section by section)

ลำดับบนลงล่าง (copy จริงดูจาก brief; ตรงนี้ระบุโครง + การตัดสินใจ):

1. **Navbar (sticky)** — โลโก้ "Best Solutions`.skill`" + เมนู anchor (คอร์ส · Workflow · ราคา · FAQ) + ปุ่ม CTA. มือถือ = hamburger เปิด overlay
2. **Hero** (brief §1) — split 2 คอลัมน์: ซ้าย = badge + H1 (`Custom Code` เป็น gradient) + subhead + bullet 4 ข้อ (check gradient) + ราคา Early Bird 1,990 / ขีดฆ่า 2,590 + badge จำกัด + ปุ่ม primary & outline · ขวา = **รูป** + การ์ดลอย 2 ใบ ("Deployed · Vercel", "6 คลาสสด"). ยุบเป็นคอลัมน์เดียวบนมือถือ
3. **Trust bar** — 4 stat-chip จากข้อเท็จจริงจริง: `Agency 8+ ปี` · `เรียนสด 6 คลาส` · `สไลด์ + Replay` · `Community ถามตอบ` (ห้ามใส่ตัวเลขที่ไม่มีจริง เช่นจำนวนผู้เรียน)
4. **Problem** (brief §2) — H2 + ย่อหน้า + กริด pain points (การ์ด/รายการมีไอคอน)
5. **Solution + Workflow** (brief §3) — H2 + diagram 7 ขั้น `Brief → Structure → Design → HTML Preview → Next.js → Supabase → Deploy` (แนวนอนบนเดสก์ท็อป / แนวตั้งบนมือถือ) + step-card อธิบายแต่ละขั้น
6. **What You'll Build** (brief §4) — ตัวอย่างโปรเจกต์ (chips/cards) + รายการ "ผลลัพธ์ที่ได้" (check list)
7. **Curriculum** (brief §5) — H2 "หลักสูตรเรียนสด 6 คลาส" + **6 class-accordion**: หัวการ์ด = ชื่อคลาส, กดเปิด = "สิ่งที่จะได้เรียน" (bullet) + "การบ้าน" (callout). คลาสแรกเปิดค้างไว้
8. **Bonus** (brief §6) — กริดสิ่งที่ได้รับเพิ่ม (icon-tile + ข้อความ): Slide, Replay, Prompt Pack, Starter Template, Supabase Schema, HTML Template, Checklist, Community ฯลฯ
9. **Instructor** (brief §7) — split: รูปผู้สอน/ทีม (placeholder) + รายการเครดิต (check) + copy สั้น "Agency 8+ ปี"
10. **Pricing** (brief §8) — 2 pricing-card: **Group Class 1,990** (featured + badge "แนะนำ" + ปุ่มสมัคร) / **Private Class เริ่ม 6,990** (ปุ่ม "สอบถามทาง LINE") + รายการ "เหมาะสำหรับ" + "สิ่งที่ได้รับ"
11. **Tools** (brief §9) — กริด icon-tile เครื่องมือ (Claude/Claude Code, Codex/ChatGPT, Cursor, VS Code, Node.js, GitHub, Next.js, Supabase, Vercel) + กล่องหมายเหตุค่าใช้จ่ายที่ไม่รวม
12. **FAQ** (brief §10) — faq-accordion 9 ข้อ (เปิดทีละข้อ)
13. **Final CTA** (brief §11) — แถบปิดท้าย: H2 + subhead + ปุ่ม primary (สมัคร Early Bird) + ปุ่ม LINE + ข้อความ "รับจำนวนจำกัด"
14. **Footer** — โลโก้ + แท็กไลน์ "Best Solutions — รับทำเว็บไซต์ & การตลาดออนไลน์" + ช่องทาง LINE + copyright

> **Testimonials/รีวิว:** ยังไม่มีรีวิวจริงใน brief → เว้นเป็น slot เพิ่มทีหลัง ไม่สร้างรีวิวปลอม

## 7. Interaction (vanilla JS — `js/main.js`)

- เมนูมือถือ toggle (hamburger ↔ overlay)
- FAQ accordion (เปิดทีละข้อ)
- Curriculum class-accordion (เปิดได้หลายใบ; คลาสแรก default เปิด)
- Smooth scroll สำหรับลิงก์ anchor + ปิดเมนูมือถือเมื่อคลิก
- Navbar เปลี่ยนพื้น/เงาเมื่อ scroll ผ่าน hero
- Fade-in เบา ๆ เมื่อ section เลื่อนเข้า viewport (IntersectionObserver, ปิดอัตโนมัติถ้า `prefers-reduced-motion`)

## 8. Responsive

Mobile-first. Breakpoints: `≤640` (มือถือ) · `641–1024` (แท็บเล็ต) · `≥1025` (เดสก์ท็อป)
ทุก grid/hero ยุบเป็นคอลัมน์เดียวบนมือถือ · นำทางเป็น hamburger ≤768 · ปุ่ม CTA เต็มกว้างบนมือถือ

## 9. โครงสร้างไฟล์

```
index.html
css/
  tokens.css       # design system variables (ข้อ 5)
  base.css         # reset, typography, layout primitives, utilities
  styles.css       # components + แต่ละ section
js/
  main.js
assets/
  img/             # รูป placeholder + og-image
docs/
  design-system.md # เอกสาร token + component (สำหรับทีม/เฟส Next.js)
README.md          # วิธีเปิด/แก้ + map ไปเฟส Next.js
```

## 10. Accessibility & Performance

- คอนทราสต์ข้อความผ่าน WCAG AA (text บน bg)
- semantic HTML (`header/nav/main/section/footer`, heading hierarchy ถูกต้อง)
- accordion/เมนู มี `aria-expanded`, โฟกัสคีย์บอร์ดได้, hit target ≥44px
- `prefers-reduced-motion` ปิด animation
- รูปมี `alt`, ใช้ `loading="lazy"` กับรูปใต้ fold, ระบุ width/height กัน layout shift
- โหลด font แบบ `display=swap`, preconnect

## 11. Content placeholders / ต้องเติมก่อนใช้งานจริง (จาก brief)

ใช้ placeholder ที่ชัดเจน (มี label) ในเฟสนี้ และทำ TODO ไว้:
- ลิงก์ LINE OA / ช่องทางสมัครจริง (ตอนนี้ `#` หรือ `https://line.me/...` placeholder)
- วัน-เวลาเปิดเรียน, จำนวนที่นั่ง Early Bird
- รูปผู้สอน/ทีม, รูปบรรยากาศเรียนสด, ตัวอย่างผลงาน/demo
- เงื่อนไขชำระเงิน/คืนเงิน, ระยะเวลา Replay/Community, รายละเอียดการตรวจงาน

## 12. เฟสถัดไป (วางแผนไว้ — ยังไม่ทำใน Phase 1)

**Phase 2 — Next.js (App Router)**
- ยก section เป็น component ตาม brief: `Navbar, HeroSection, TrustBar, ProblemSection, WorkflowSection, BuildSection, CurriculumSection, BonusSection, InstructorSection, PricingSection, ToolsSection, FAQSection, FinalCTA, Footer`
- ย้าย `tokens.css` → `globals.css`; markup/CSS เดิมพอร์ตได้ตรง (จะใช้ Tailwind ภายหลังก็ map token เดิม)

**Phase 3 — Database (บทความ/บล็อก) + Lead**
- Supabase ตาราง `articles`: `id, slug, title, excerpt, content (markdown), cover_image, tags[], status, published_at, created_at, updated_at`
- หน้า `/blog` (list) + `/blog/[slug]` (อ่าน) + อาจมี section "บทความล่าสุด" ในหน้าแรก
- ตาราง `leads` สำหรับฟอร์มสมัคร/ติดต่อ (ตอนนี้ CTA ลิงก์ LINE ไปก่อน)
- Deploy บน Vercel + ตั้ง Environment Variables

## 13. สมมติฐาน / Open items

- โลโก้ปัจจุบันเป็น wordmark "Best Solutions`.skill`" (ยังไม่มีไฟล์โลโก้จริง → ใช้ type-based ไปก่อน)
- เนื้อหา copy ทั้งหมดยึดตาม brief; ส่วนที่ brief ไม่มี (ตัวเลขผู้เรียน ฯลฯ) จะไม่กุขึ้นมา
- ปุ่ม/ลิงก์ภายนอกใช้ placeholder จนกว่าจะได้ลิงก์จริง
