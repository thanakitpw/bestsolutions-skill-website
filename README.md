# Best Solutions Skill — Website

เว็บไซต์คอร์สสอนสด **Vibe Code Website Bootcamp** ของ Best Solutions
**Phase 2:** Next.js (App Router) + TypeScript — ยก design system จากเฟส HTML มาเป็น component
(เฟส HTML เดิมเก็บไว้ที่ [`html-preview/`](html-preview/) เป็น reference)

## รัน

```bash
npm install          # ครั้งแรก
npm run dev          # dev server → http://localhost:3000 (Turbopack)
npm run build        # production build
npm start            # serve production build
```

## โครงสร้าง

```
app/
  layout.tsx         root layout — metadata, fonts, gate reveal (js class)
  page.tsx           ประกอบทุก section
  globals.css        @import fonts + tokens.css + base.css + styles.css
  tokens.css         design system — สี/ฟอนต์/spacing/radius/shadow (ยกมาจากเฟส HTML)
  base.css           reset + typography + layout primitives + reveal
  styles.css         components + layout แต่ละ section
components/
  Navbar, Hero, TrustBar, Problem, Workflow, Build, Curriculum,
  Bonus, Instructor, Pricing, Tools, Faq, FinalCta, Footer
  Interactions.tsx   'use client' — nav, accordions, navbar-on-scroll, reveal (ported จาก main.js)
  icons.tsx          stroke icons (shared)
public/logo.png      โลโก้แบรนด์
docs/                spec, plan, design-system.md
docs/vibe-code-website-bootcamp-plan.md
html-preview/        เฟส HTML เดิม (static — เปิดไฟล์ดูได้ตรง ๆ)
```

Design system / token reference: [`docs/design-system.md`](docs/design-system.md)

## สิ่งที่ต้องเติมก่อนใช้งานจริง (TODO)

- 🔗 ลิงก์ LINE OA / สมัครจริง — ปุ่มที่ติด `data-cta="line"` + `href="#"`
- 🖼️ รูป Hero (ตอนนี้ Unsplash ชั่วคราว) + รูปผู้สอน/ทีม + OG image, ตั้ง `metadataBase` เป็น domain จริง
- 📅 วันเปิดเรียนจริง, จำนวนที่นั่ง, เงื่อนไขชำระเงิน และรายละเอียด On-site Training

## เฟสถัดไป (Phase 3)

ดู [`docs/superpowers/specs/2026-06-02-best-solutions-skill-landing-design.md`](docs/superpowers/specs/2026-06-02-best-solutions-skill-landing-design.md)

- **Database (บล็อก/บทความ):** Supabase ตาราง `articles` + หน้า `/blog`, `/blog/[slug]`
- **Lead form:** ตาราง `leads` รับข้อมูลจากปุ่มสมัคร
- **Deploy:** Vercel (เชื่อม env + custom domain)
