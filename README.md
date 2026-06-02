# Best Solutions Skill — Landing Page

Landing Page ขายคอร์สสอนสด **AI Website Developer Live Class** ของ Best Solutions
เฟสนี้เป็น **Vanilla HTML + CSS + JS** (ไม่มี build step) พร้อมต่อยอดไป Next.js + Supabase ในเฟสถัดไป

## เปิดดู

ดับเบิลคลิก `index.html` ได้เลย หรือรันผ่าน local server (แนะนำ — ให้ path/ฟอนต์ทำงานครบ):

```bash
python3 -m http.server 8080
# เปิด http://localhost:8080
```

## โครงสร้างไฟล์

```
index.html              หน้าเดียว ทุก section (semantic HTML)
css/
  tokens.css            design system — สี/ฟอนต์/spacing/radius/shadow/layout
  base.css              reset + typography + layout primitives + reveal
  styles.css            components + layout แต่ละ section
js/
  main.js               nav มือถือ, accordion, navbar-on-scroll, reveal
assets/
  logo.png              โลโก้แบรนด์
docs/
  design-system.md      เอกสาร token + component
  superpowers/          spec + implementation plan
```

## Section ในหน้า

Navbar · Hero · Trust bar · Problem · Solution+Workflow · What You'll Build ·
Curriculum (6 คลาส) · Bonus · Instructor · Pricing · Tools · FAQ · Final CTA · Footer

## สิ่งที่ต้องเติมก่อนใช้งานจริง (TODO)

- 🔗 ลิงก์ LINE OA / ช่องทางสมัครจริง — ปุ่มที่ติด `data-cta="line"` และ `href="#"` ทั้งหมด
- 🖼️ รูป Hero (ตอนนี้ดึงจาก Unsplash ชั่วคราว) + รูปผู้สอน/ทีม + OG image (1200×630)
- 📅 วัน-เวลาเปิดเรียน, จำนวนที่นั่ง Early Bird
- 💳 เงื่อนไขชำระเงิน/คืนเงิน, ระยะเวลา Replay/Community

## เฟสถัดไป (วางแผนไว้แล้ว)

ดูรายละเอียดใน `docs/superpowers/specs/2026-06-02-best-solutions-skill-landing-design.md`

- **เฟส 2 — Next.js (App Router):** ยกแต่ละ section เป็น component (`HeroSection`, `CurriculumSection`, …)
  ย้าย `css/tokens.css` → `globals.css` (token เป็น CSS variables พอร์ตได้ตรง)
- **เฟส 3 — Database:** Supabase ตาราง `articles` (บล็อก) + `leads` (ฟอร์มสมัคร), หน้า `/blog`, Deploy บน Vercel

## Design System

โทน dark + flat (ไม่มี glow) + brand gradient ส้ม→แดง (`#f85a20 → #f82020`)
รายละเอียด token และ component ดูที่ [`docs/design-system.md`](docs/design-system.md)
