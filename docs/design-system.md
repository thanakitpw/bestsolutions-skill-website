# Best Solutions Skill — Design System

ระบบดีไซน์ของ Landing Page (เฟส HTML) — token ทั้งหมดอยู่ใน `css/tokens.css`
ใช้เอกสารนี้เป็น reference ตอนแก้ไขหรือพอร์ตไป Next.js (เฟส 2 ยก `:root` ทั้งบล็อกไป `globals.css` ได้เลย)

---

## 1. หลักการ

- **Dark, flat, no-glow** — พื้นหลัง navy เข้ม, การ์ด slate, เงาดำนุ่มล้วน **ห้ามใช้แสงเรือง/เงาสีแบรนด์**
- **Brand gradient ใช้อย่างมีจุดโฟกัส** — CTA, คำเด่นใน headline, icon tile, เครื่องหมายถูก, badge, ตัวเลขราคา, tab/accordion ที่ active
- **Mobile-first** — ทุก grid/hero ยุบเป็นคอลัมน์เดียวบนมือถือ

## 2. สี (Color tokens)

| Token | ค่า | ใช้ |
|---|---|---|
| `--bg` | `#070a12` | พื้นหลังหลัก |
| `--bg-alt` | `#0d1220` | พื้น section สลับ (`.section--alt`) |
| `--surface` | `#141a2b` | การ์ด |
| `--surface-2` | `#1b2236` | การ์ดซ้อน / callout / tag |
| `--border` | `rgba(255,255,255,.08)` | เส้นขอบปกติ |
| `--border-strong` | `rgba(255,255,255,.15)` | เส้นขอบเด่น / ปุ่ม outline |
| `--brand-from` → `--brand-to` | `#f85a20` → `#f82020` | gradient แบรนด์ (`--gradient-brand`) |
| `--brand-solid` | `#f8431f` | สีแบรนด์เดี่ยว (เส้นขอบ callout) |
| `--brand-tint` | `#ff8a5c` | accent บนพื้นมืด / eyebrow / hover |
| `--text` / `--text-dim` / `--text-mute` | `#f5f7fa` / `#9aa3b2` / `#6b7280` | ข้อความหลัก / รอง / จาง |

## 3. Typography

| Token | Font | ใช้ |
|---|---|---|
| `--font-display` | `Prompt` | หัวข้อ (h1–h4), ปุ่ม, ตัวเลขราคา |
| `--font-body` | `IBM Plex Sans Thai` | เนื้อหา |
| `--font-mono` | `IBM Plex Mono` | eyebrow, label, ตัวเลขคลาส, flow chip |

Type scale (responsive ด้วย `clamp`):
- Hero `h1`: `clamp(2rem, 5vw, 2.85rem)`
- Section `h2`: `clamp(1.5rem, 3vw, 2rem)`
- Card `h3`: ~1.0–1.3rem
- Body: 1rem / line-height 1.6
- Eyebrow: `.6875rem` uppercase, letter-spacing `.14em`

## 4. Spacing / Radius / Shadow / Layout

- **Spacing** (ฐาน 4px): `--space-1`…`--space-24` (4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96)
- **Radius**: `--r-sm 8` · `--r-md 11` · `--r-lg 14` · `--r-xl 16` · `--r-pill 999`
- **Shadow**: `--shadow-sm` (การ์ด/ปุ่ม), `--shadow-lg` (hero image) — ดำนุ่มล้วน
- **Layout**: `--container 1200px` · `--section-py clamp(56,8vw,96)` · `--gutter clamp(20,5vw,40)` · `--nav-h 68px`

## 5. Components (อยู่ใน `css/styles.css`)

| Class | คำอธิบาย |
|---|---|
| `.btn` + `.btn-primary` / `.btn-outline` / `.btn-ghost` | ปุ่ม 3 แบบ (primary = gradient) |
| `.pill` + `.dot` | badge / eyebrow chip |
| `.icon-tile` (`.sm`, `.mono`) | สี่เหลี่ยมมน gradient ใส่ไอคอน/ตัวอักษร |
| `.card` (`.card-hover`) | การ์ดพื้นฐาน |
| `.grid` + `.grid-2/3/4` | กริด responsive (→ 2 → 1 คอลัมน์) |
| `.check-list` + `.ck` | รายการเครื่องหมายถูก gradient |
| `.accordion[data-accordion]` + `.acc-item/.acc-trigger/.acc-panel` | accordion — เพิ่ม `data-single` = เปิดทีละข้อ (ใช้กับ FAQ) |
| `.pricing-card` (`.featured`) | การ์ดราคา (featured = ขอบแบรนด์ + `.pc-badge`) |
| `.flow` + `.step-card` | workflow diagram + การ์ดขั้นตอน |
| `.tool-card` / `.note-box` | การ์ดเครื่องมือ / กล่องหมายเหตุ |
| `.nav` (`.nav--scrolled`) / `.footer` | navbar sticky / footer |

## 6. Interaction (`js/main.js`)

- `initNav()` — เมนูมือถือ toggle (`aria-expanded`)
- `initAccordions()` — accordion engine (รองรับ `data-single`, ปรับ maxHeight ตอน resize)
- `initScrollFx()` — navbar เปลี่ยนพื้นตอน scroll + reveal-on-scroll (IntersectionObserver)

Reveal ถูก gate ด้วย `<html class="js">` (ตั้งใน inline script ที่ `<head>`) → ถ้า JS ไม่ทำงาน เนื้อหาจะไม่ถูกซ่อน และ `prefers-reduced-motion` ปิด animation
