# Best Solutions Skill — Landing Page (Phase 1: HTML) Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** สร้าง Landing Page ขายคอร์ส "AI Website Developer Live Class" เป็นหน้าเดียว ด้วย Vanilla HTML + CSS (token-based design system) + JS เล็กน้อย ตาม spec `docs/superpowers/specs/2026-06-02-best-solutions-skill-landing-design.md`

**Architecture:** หน้าเดียว `index.html` แยก CSS เป็น 3 ชั้น (tokens → base → styles) และ JS หนึ่งไฟล์. Dark theme, brand gradient ส้ม→แดง, no-glow, mobile-first responsive. เนื้อหา copy จริงจาก `ai-website-developer-live-class-landing-page.md`.

**Tech Stack:** HTML5, CSS3 (Custom Properties, Grid/Flex, clamp), Vanilla JS (ES6), Google Fonts (Prompt / IBM Plex Sans Thai / IBM Plex Mono). ไม่มี build step.

**Verification model (static site):** ไม่มี test runner — แต่ละ task ตรวจด้วยการเปิดในเบราว์เซอร์ผ่าน local server แล้วเช็ค acceptance criteria ที่ระบุ. รัน server ครั้งเดียว:
```bash
cd /Users/thanakitchaithong/Developer/projects/bestsolutionskill-website
python3 -m http.server 8080
# เปิด http://localhost:8080
```

---

## File Structure

| ไฟล์ | หน้าที่ |
|---|---|
| `index.html` | โครงหน้าเดียว ทุก section (semantic HTML) |
| `css/tokens.css` | design system variables (สี/ฟอนต์/spacing/radius/shadow/layout) |
| `css/base.css` | reset, root typography, container/section utilities, link/list resets |
| `css/styles.css` | components (btn, pill, card, accordion…) + layout เฉพาะแต่ละ section |
| `js/main.js` | mobile nav, accordions, smooth scroll, navbar-on-scroll, fade-in |
| `assets/logo.png` | โลโก้จริง (มีอยู่แล้ว) |
| `assets/img/` | รูป placeholder (hero, instructor, og) |
| `docs/design-system.md` | เอกสาร token + component (ใช้ต่อเฟส Next.js) |
| `README.md` | วิธีเปิด/แก้ + map ไป Next.js |

CSS load order ใน `<head>`: `tokens.css` → `base.css` → `styles.css`.

---

## Task 1: Scaffold + Design Tokens + Base

**Files:**
- Create: `index.html`, `css/tokens.css`, `css/base.css`

- [ ] **Step 1: Create `css/tokens.css`** — ตาม §5 ของ spec ทั้งหมด

```css
:root{
  /* color */
  --bg:#070a12; --bg-alt:#0d1220; --surface:#141a2b; --surface-2:#1b2236;
  --border:rgba(255,255,255,.08); --border-strong:rgba(255,255,255,.15);
  --brand-from:#f85a20; --brand-to:#f82020; --brand-solid:#f8431f; --brand-tint:#ff8a5c;
  --gradient-brand:linear-gradient(90deg,var(--brand-from),var(--brand-to));
  --text:#f5f7fa; --text-dim:#9aa3b2; --text-mute:#6b7280;
  /* type */
  --font-display:'Prompt',sans-serif;
  --font-body:'IBM Plex Sans Thai','Prompt',sans-serif;
  --font-mono:'IBM Plex Mono',monospace;
  /* spacing */
  --space-1:4px;--space-2:8px;--space-3:12px;--space-4:16px;--space-6:24px;
  --space-8:32px;--space-12:48px;--space-16:64px;--space-24:96px;
  /* radius / shadow / layout */
  --r-sm:8px;--r-md:11px;--r-lg:14px;--r-xl:16px;--r-pill:999px;
  --shadow-sm:0 6px 18px rgba(0,0,0,.40);
  --shadow-lg:0 24px 50px rgba(0,0,0,.50);
  --container:1200px;
  --section-py:clamp(56px,8vw,96px);
  --gutter:clamp(20px,5vw,40px);
}
```

- [ ] **Step 2: Create `css/base.css`** — reset + typography + utilities

```css
*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
html{scroll-behavior:smooth}
body{background:var(--bg);color:var(--text);font-family:var(--font-body);
  line-height:1.6;-webkit-font-smoothing:antialiased}
img{max-width:100%;display:block}
a{color:inherit;text-decoration:none}
ul{list-style:none}
h1,h2,h3,h4{font-family:var(--font-display);line-height:1.15;font-weight:700}
/* layout utilities */
.container{max-width:var(--container);margin-inline:auto;padding-inline:var(--gutter)}
.section{padding-block:var(--section-py)}
.section--alt{background:var(--bg-alt)}
.eyebrow{font-family:var(--font-mono);font-size:.6875rem;letter-spacing:.14em;
  text-transform:uppercase;color:var(--brand-tint);font-weight:600}
.section-head{text-align:center;max-width:46rem;margin-inline:auto;margin-bottom:var(--space-12)}
.section-head h2{font-size:clamp(1.5rem,3vw,2rem);margin-block:var(--space-3)}
.section-head p{color:var(--text-dim)}
.g-text{background:var(--gradient-brand);-webkit-background-clip:text;
  background-clip:text;color:transparent}
@media (prefers-reduced-motion:reduce){html{scroll-behavior:auto}}
```

- [ ] **Step 3: Create `index.html` skeleton**

```html
<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>AI Website Developer Live Class | Best Solutions Skill</title>
  <meta name="description" content="คอร์สสอนสด สร้างเว็บไซต์ Custom Code ด้วย AI ตั้งแต่ Design, Next.js, Supabase จน Deploy ออนไลน์จริง">
  <link rel="icon" href="assets/logo.png">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Prompt:wght@300;400;500;600;700;800&family=IBM+Plex+Sans+Thai:wght@400;500;600;700&family=IBM+Plex+Mono:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="css/tokens.css">
  <link rel="stylesheet" href="css/base.css">
  <link rel="stylesheet" href="css/styles.css">
</head>
<body>
  <!-- sections inserted by later tasks -->
  <script src="js/main.js" defer></script>
</body>
</html>
```

- [ ] **Step 4: Create empty `css/styles.css` and `js/main.js`** (เติมใน task ถัดไป) เพื่อไม่ให้ 404
- [ ] **Step 5: Verify** — เปิด `http://localhost:8080` เห็นพื้นจอดำ navy, ไม่มี error 404 ใน console, ฟอนต์โหลด
- [ ] **Step 6: Commit** — `git add -A && git commit -m "feat: scaffold + design tokens + base styles"`

---

## Task 2: Core Components (styles.css foundation)

**Files:** Modify: `css/styles.css`

สร้าง component classes ที่ใช้ซ้ำทั้งหน้า. หลังเขียนแต่ละกลุ่ม ใส่ตัวอย่างชั่วคราวใน `<body>` เพื่อเช็ค แล้วลบออกก่อน commit (หรือเช็คตอนสร้าง section จริง)

- [ ] **Step 1: Buttons**

```css
.btn{font-family:var(--font-display);font-weight:600;font-size:.95rem;
  padding:12px 20px;border-radius:var(--r-md);border:1px solid transparent;
  display:inline-flex;align-items:center;gap:8px;cursor:pointer;transition:.15s;white-space:nowrap}
.btn-primary{background:var(--gradient-brand);color:#fff;box-shadow:var(--shadow-sm)}
.btn-primary:hover{filter:brightness(1.07)}
.btn-outline{background:transparent;color:var(--text);border-color:var(--border-strong)}
.btn-outline:hover{border-color:var(--brand-tint);color:var(--brand-tint)}
.btn-ghost{background:var(--surface);color:var(--text-dim)}
@media(max-width:640px){.btn{width:100%;justify-content:center}}
```

- [ ] **Step 2: Pill / badge / icon-tile**

```css
.pill{display:inline-flex;align-items:center;gap:7px;font-size:.78rem;font-weight:500;
  padding:6px 13px;border-radius:var(--r-pill);background:rgba(248,67,31,.10);
  border:1px solid rgba(248,67,31,.35);color:var(--brand-tint)}
.pill .dot{width:6px;height:6px;border-radius:50%;background:var(--brand-from)}
.icon-tile{width:44px;height:44px;border-radius:var(--r-md);background:var(--gradient-brand);
  display:grid;place-items:center;color:#fff;flex:none}
.icon-tile svg{width:22px;height:22px}
```

- [ ] **Step 3: Card + grids**

```css
.card{background:var(--surface);border:1px solid var(--border);border-radius:var(--r-lg);
  padding:var(--space-6)}
.card-hover{transition:.15s}
.card-hover:hover{border-color:var(--border-strong);transform:translateY(-2px)}
.grid{display:grid;gap:var(--space-4)}
.grid-2{grid-template-columns:repeat(2,1fr)}
.grid-3{grid-template-columns:repeat(3,1fr)}
.grid-4{grid-template-columns:repeat(4,1fr)}
@media(max-width:900px){.grid-3,.grid-4{grid-template-columns:repeat(2,1fr)}}
@media(max-width:640px){.grid-2,.grid-3,.grid-4{grid-template-columns:1fr}}
.check-list{display:grid;gap:10px}
.check-list li{display:flex;gap:10px;align-items:flex-start}
.check-list .ck{flex:none;width:20px;height:20px;border-radius:6px;
  background:var(--gradient-brand);display:grid;place-items:center;font-size:11px;color:#fff;margin-top:2px}
```

- [ ] **Step 4: Accordion (curriculum + FAQ shared base)**

```css
.acc-item{background:var(--surface);border:1px solid var(--border);
  border-radius:var(--r-lg);overflow:hidden;margin-bottom:12px}
.acc-trigger{width:100%;text-align:left;background:none;border:none;color:var(--text);
  font-family:var(--font-display);font-weight:600;font-size:1rem;cursor:pointer;
  padding:18px 20px;display:flex;justify-content:space-between;align-items:center;gap:12px}
.acc-trigger .sign{font-size:1.4rem;font-weight:300;line-height:1;
  background:var(--gradient-brand);-webkit-background-clip:text;background-clip:text;color:transparent;transition:.2s}
.acc-item[aria-expanded="true"] .sign{transform:rotate(45deg)}
.acc-panel{max-height:0;overflow:hidden;transition:max-height .25s ease}
.acc-panel-inner{padding:0 20px 20px;color:var(--text-dim)}
```

- [ ] **Step 5: Verify** — เพิ่ม markup ตัวอย่างชั่วคราวของ btn/pill/card ใน body, เปิดเบราว์เซอร์ เช็คว่าปุ่ม gradient, pill, card แสดงถูก, ไม่มี glow. ลบ markup ตัวอย่างออก
- [ ] **Step 6: Commit** — `git commit -am "feat: core component styles (buttons, cards, pills, accordion base)"`

---

## Task 3: Navbar + Mobile Menu

**Files:** Modify `index.html` (เพิ่มบนสุดของ body), `css/styles.css`, `js/main.js`

- [ ] **Step 1: HTML** — `<header class="nav">` มี: โลโก้ (`assets/logo.png` + ข้อความ "Best Solutions"), เมนู anchor (`#curriculum` คอร์ส, `#workflow` Workflow, `#pricing` ราคา, `#faq` FAQ), ปุ่ม `.btn-primary` "สมัครเรียน", ปุ่ม hamburger `.nav-toggle` (`aria-expanded="false"`, `aria-controls="navmenu"`). เมนูใส่ `id="navmenu"`.
- [ ] **Step 2: CSS** — nav sticky top, พื้นโปร่ง→ทึบเมื่อ scroll (class `.nav--scrolled`: `background:rgba(7,10,18,.85);backdrop-filter:blur(10px);border-bottom:1px solid var(--border)`). โลโก้สูง ~36px วงกลม. ≤768px ซ่อนเมนู, โชว์ hamburger; `.navmenu.open` แสดงเป็น overlay เต็มกว้างพื้น `--bg-alt`.
- [ ] **Step 3: JS** — `main.js`: toggle `.open` + สลับ `aria-expanded` เมื่อคลิก hamburger; คลิกลิงก์ในเมนูแล้วปิด.
- [ ] **Step 4: Verify** — เดสก์ท็อป: เมนูเรียงแนวนอน, คลิก anchor เลื่อนลง. มือถือ (DevTools ≤768): hamburger เปิด/ปิด overlay, คลิกลิงก์แล้วปิด. scroll ลงแล้ว navbar เปลี่ยนพื้น.
- [ ] **Step 5: Commit** — `git commit -am "feat: sticky navbar + mobile menu"`

---

## Task 4: Hero Section (brief §1)

**Files:** Modify `index.html`, `css/styles.css`

- [ ] **Step 1: HTML** — `<section class="hero">` grid 2 คอลัมน์:
  - ซ้าย: `.pill` "คอร์สสอนสด · รับจำนวนจำกัด" → `<h1>` "สร้างเว็บไซต์ `<span class="g-text">Custom Code</span>` ด้วย AI" → `<p class="hero-sub">` subhead → `<ul class="check-list">` 4 bullet (จาก spec §6.2) → `.hero-price` (Early Bird `1,990.-` g-text + `<s>2,590.-</s>` + `.pill` "รับจำนวนจำกัด") → `.cta-row` (btn-primary "สมัคร Early Bird →" + btn-outline "สอบถามคอร์สเดี่ยว 1:1 ทาง LINE")
  - ขวา: `.heroimg` (`<img loading="eager" width height>` placeholder `assets/img/hero.jpg` + label "ภาพตัวอย่าง" + scrim gradient ล่าง) + การ์ดลอย 2 ใบ ".float" ("▲ Deployed · Vercel · Live", "6 คลาสสด / สไลด์ · การบ้าน · ตรวจงาน")
- [ ] **Step 2: CSS** — `.hero{padding-top:calc(var(--section-py) + 64px)}`, grid `1.05fr .95fr` gap 34px, `<h1>` `clamp(2rem,5vw,2.75rem)` letter-spacing -.02em. `.heroimg` radius `--r-xl`, `aspect-ratio:4/3.4`, `object-fit:cover`, scrim = `linear-gradient(180deg,transparent,rgba(7,10,18,.72))`. `.float` พื้น `rgba(13,18,32,.82)` + `backdrop-filter:blur(10px)` + border-strong (ไม่มี glow). ≤760px: คอลัมน์เดียว, รูปขึ้นก่อน/หลังตามเหมาะ.
- [ ] **Step 3: เพิ่ม placeholder รูป** — สร้าง `assets/img/hero.jpg` (หรืออ้าง Unsplash ชั่วคราว `https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1000&q=80`). หมายเหตุ TODO แทนรูปจริง.
- [ ] **Step 4: Verify** — Hero เต็มจอบนเดสก์ท็อป, ราคาเด่น, ปุ่ม 2 ตัว, การ์ดลอยอ่านออก. มือถือยุบคอลัมน์เดียว ปุ่มเต็มกว้าง.
- [ ] **Step 5: Commit** — `git commit -am "feat: hero section"`

---

## Task 5: Trust Bar

**Files:** Modify `index.html`, `css/styles.css`

- [ ] **Step 1: HTML** — `<section class="trustbar">` `.container` แถบ flex 4 `.stat-chip` (icon-tile เล็ก/inline svg + ข้อความ): "Agency 8+ ปี", "เรียนสด 6 คลาส", "สไลด์ + Replay", "Community ถามตอบ". (ห้ามใส่ตัวเลขผู้เรียนที่ไม่มีจริง)
- [ ] **Step 2: CSS** — flex wrap, justify-between/center, เส้นคั่นบน-ล่าง border, gap. ≤640px เรียง 2x2.
- [ ] **Step 3: Verify** — 4 ชิปแสดงเรียงสวย, มือถือ 2 แถว.
- [ ] **Step 4: Commit** — `git commit -am "feat: trust bar"`

---

## Task 6: Problem Section (brief §2)

**Files:** Modify `index.html`, `css/styles.css`

- [ ] **Step 1: HTML** — `<section class="section section--alt" id="problem">` `.section-head` (eyebrow "PROBLEM" + h2 "อยากใช้ AI ทำเว็บไซต์ แต่ไม่รู้จะเริ่มจากตรงไหน?" + ย่อหน้านำจาก brief) + `.grid grid-3` การ์ด pain points (8 ข้อจาก brief → ใช้ 6–8 การ์ด, แต่ละใบ icon-tile + ข้อความ)
- [ ] **Step 2: CSS** — ใช้ `.card`; ไอคอนใช้ inline svg (เช่น ⚠/❌ แนว outline). ระยะห่างปกติ.
- [ ] **Step 3: Verify** — กริด pain points เรียงถูก, มือถือคอลัมน์เดียว.
- [ ] **Step 4: Commit** — `git commit -am "feat: problem section"`

---

## Task 7: Solution + Workflow Section (brief §3)

**Files:** Modify `index.html`, `css/styles.css`

- [ ] **Step 1: HTML** — `<section class="section" id="workflow">` `.section-head` ("คอร์สนี้จะสอนให้คุณทำเว็บด้วย AI แบบมีระบบ") + `.workflow-flow` แสดง 7 ขั้น `Brief → Structure → Design → HTML Preview → Next.js → Supabase → Deploy` (มีลูกศร) + `.grid` ของ 7 `.step-card` (เลขลำดับ g-text + ชื่อ + คำอธิบายจาก brief)
- [ ] **Step 2: CSS** — `.workflow-flow` flex wrap แนวนอน (เดสก์ท็อป) มีตัวคั่นลูกศร "→"; ≤760px เป็นแนวตั้ง. `.step-card` มีเลขมุมบน. `.step-card .num` font-mono g-text.
- [ ] **Step 3: Verify** — flow อ่านลำดับชัด, 7 การ์ดครบ, มือถือ stack แนวตั้ง.
- [ ] **Step 4: Commit** — `git commit -am "feat: solution + workflow section"`

---

## Task 8: What You'll Build (brief §4)

**Files:** Modify `index.html`, `css/styles.css`

- [ ] **Step 1: HTML** — `<section class="section section--alt" id="build">` `.section-head` ("เรียนจบแล้วคุณจะมีเว็บไซต์จริง 1 โปรเจกต์") + 2 คอลัมน์: ซ้าย = "ตัวอย่างเว็บที่ทำได้" เป็น chips/การ์ดเล็ก (6 ข้อจาก brief); ขวา = `.check-list` "ผลลัพธ์ที่ได้" (6 ข้อ)
- [ ] **Step 2: CSS** — 2 คอลัมน์ `.grid-2`; chips ใช้ pill/`.tag`. มือถือคอลัมน์เดียว.
- [ ] **Step 3: Verify** — สองคอลัมน์สมดุล, มือถือ stack.
- [ ] **Step 4: Commit** — `git commit -am "feat: what-you-build section"`

---

## Task 9: Curriculum Section + Accordion JS (brief §5)

**Files:** Modify `index.html`, `css/styles.css`, `js/main.js`

- [ ] **Step 1: HTML** — `<section class="section" id="curriculum">` `.section-head` ("หลักสูตรเรียนสด 6 คลาส แบบจับมือทำ") + 6 `.acc-item` (curriculum). แต่ละใบ: `.acc-trigger` (`<span class="num">CLASS 0N</span>` + ชื่อคลาส + `.sign` "+") และ `.acc-panel > .acc-panel-inner` มี "สิ่งที่จะได้เรียน" (`<ul>` bullet) + กล่อง "การบ้าน" (callout). เนื้อหา 6 คลาสจาก brief §5. ใบแรกตั้ง `aria-expanded="true"`.
- [ ] **Step 2: JS** — ฟังก์ชัน accordion ทั่วไป: ฟัง click ที่ `.acc-trigger`, toggle `aria-expanded` ที่ `.acc-item`, ตั้ง `panel.style.maxHeight = expanded ? panel.scrollHeight+'px' : 0`. ใช้ร่วมกับ FAQ (Task 14). curriculum อนุญาตเปิดหลายใบ.
- [ ] **Step 3: CSS** — `.num` font-mono brand-tint; callout การบ้าน พื้น `--surface-2` + ขอบซ้าย brand.
- [ ] **Step 4: Verify** — คลิกหัวการ์ดเปิด/ปิดลื่น, ใบแรกเปิดอยู่, เปิดหลายใบได้, `aria-expanded` สลับถูก (เช็ค DevTools), คีย์บอร์ด Tab+Enter ใช้ได้.
- [ ] **Step 5: Commit** — `git commit -am "feat: curriculum accordion + js"`

---

## Task 10: Bonus Section (brief §6)

**Files:** Modify `index.html`, `css/styles.css`

- [ ] **Step 1: HTML** — `<section class="section section--alt" id="bonus">` `.section-head` ("นอกจากเรียนสด ยังได้รับเครื่องมือช่วยเรียนครบชุด") + `.grid grid-3` รายการ bonus (จาก brief: Slide, Replay, Prompt Pack, Starter Template, Supabase Schema, HTML Preview Template, Checklist, Community, การบ้าน/ตรวจงาน...) แต่ละใบ icon-tile + ชื่อ + บรรยายสั้น
- [ ] **Step 2: Verify** — กริดครบ, มือถือ stack.
- [ ] **Step 3: Commit** — `git commit -am "feat: bonus section"`

---

## Task 11: Instructor Section (brief §7)

**Files:** Modify `index.html`, `css/styles.css`

- [ ] **Step 1: HTML** — `<section class="section" id="instructor">` `.section-head` ("สอนโดยคนทำ Agency จริง ประสบการณ์กว่า 8 ปี") + 2 คอลัมน์: ซ้าย = การ์ดรูปผู้สอน/ทีม (placeholder `assets/img/instructor.jpg` + label) ; ขวา = `.check-list` จุดเด่นผู้สอน (5 ข้อ) + บล็อก quote copy สั้นจาก brief
- [ ] **Step 2: CSS** — `.grid-2`; รูป radius `--r-lg`. มือถือ stack รูปขึ้นก่อน.
- [ ] **Step 3: Verify** — เลย์เอาต์สมดุล, มือถือ stack.
- [ ] **Step 4: Commit** — `git commit -am "feat: instructor section"`

---

## Task 12: Pricing Section (brief §8)

**Files:** Modify `index.html`, `css/styles.css`

- [ ] **Step 1: HTML** — `<section class="section section--alt" id="pricing">` `.section-head` ("เลือกรูปแบบการเรียนที่เหมาะกับคุณ") + `.grid-2` 2 `.pricing-card`:
  - **Group Class** (`.featured` + badge "แนะนำ"): ราคา `1,990.-` g-text + `<s>2,590.-</s>` + "เหมาะสำหรับ" + "สิ่งที่ได้รับ" (check-list) + btn-primary "สมัครเรียนกลุ่ม Early Bird"
  - **Private Class**: "เริ่มต้น 6,990.-" + รายการ + หมายเหตุนัดนอกสถานที่ + btn-outline "สอบถามคอร์สเดี่ยวทาง LINE"
- [ ] **Step 2: CSS** — `.pricing-card.featured{border-color:rgba(248,67,31,.5);position:relative}`; badge มุมขวาบน gradient; ราคา font-display ใหญ่. มือถือ stack (featured ขึ้นก่อน).
- [ ] **Step 3: Verify** — การ์ด featured เด่นด้วยขอบส้ม + badge, ราคาชัด, ปุ่มถูกชนิด.
- [ ] **Step 4: Commit** — `git commit -am "feat: pricing section"`

---

## Task 13: Tools Section (brief §9)

**Files:** Modify `index.html`, `css/styles.css`

- [ ] **Step 1: HTML** — `<section class="section" id="tools">` `.section-head` ("เครื่องมือที่ใช้ในคอร์ส") + `.grid grid-4` การ์ดเครื่องมือ (Claude/Claude Code, Codex/ChatGPT, Cursor, VS Code, Node.js, GitHub, Next.js, Supabase, Vercel) แต่ละใบ icon-tile (inline svg/อักษรย่อ) + ชื่อ + `.note-box` หมายเหตุค่าใช้จ่ายที่ไม่รวม (copy สั้นจาก brief)
- [ ] **Step 2: CSS** — `.note-box` พื้น `--surface-2` ขอบ border radius. grid-4 → 2 → 1 ตาม breakpoint.
- [ ] **Step 3: Verify** — กริดเครื่องมือเรียบ, note อ่านชัด.
- [ ] **Step 4: Commit** — `git commit -am "feat: tools section"`

---

## Task 14: FAQ Section (brief §10)

**Files:** Modify `index.html`, `css/styles.css`

- [ ] **Step 1: HTML** — `<section class="section section--alt" id="faq">` `.section-head` ("คำถามที่พบบ่อย") + 9 `.acc-item` (FAQ) ใช้ accordion จาก Task 2/9. คำถาม+คำตอบ 9 ข้อจาก brief. ทุกใบเริ่มปิด.
- [ ] **Step 2: Verify** — accordion เปิด/ปิดได้ (reuse JS เดิม, ไม่ต้องเขียน JS ใหม่), เนื้อหาครบ 9 ข้อ.
- [ ] **Step 3: Commit** — `git commit -am "feat: faq section"`

---

## Task 15: Final CTA + Footer (brief §11)

**Files:** Modify `index.html`, `css/styles.css`

- [ ] **Step 1: HTML (Final CTA)** — `<section class="final-cta">` พื้นเด่น (gradient/surface) กลางจอ: h2 "พร้อมเริ่มสร้างเว็บไซต์ Custom Code ด้วย AI แล้วหรือยัง?" + subhead + `.cta-row` (btn-primary "สมัคร Early Bird 1,990.-" + btn-outline "สอบถาม Private Class ทาง LINE") + ข้อความ "รับจำนวนจำกัด"
- [ ] **Step 2: HTML (Footer)** — `<footer class="footer">` โลโก้ + "Best Solutions — รับทำเว็บไซต์ & การตลาดออนไลน์" + ลิงก์ LINE (placeholder) + copyright "© 2026 Best Solutions Skill"
- [ ] **Step 3: CSS** — final-cta จัดกลาง, footer พื้น `--bg-alt` border-top.
- [ ] **Step 4: Verify** — CTA ปิดท้ายเด่น, footer ครบ.
- [ ] **Step 5: Commit** — `git commit -am "feat: final cta + footer"`

---

## Task 16: JS Polish (scroll behaviors + motion)

**Files:** Modify `js/main.js`

- [ ] **Step 1: Navbar-on-scroll** — `IntersectionObserver`/scroll listener: เพิ่ม/ลบ `.nav--scrolled` เมื่อเลื่อนพ้น hero (~80px)
- [ ] **Step 2: Smooth-scroll + offset** — คลิกลิงก์ `a[href^="#"]` เลื่อนแบบนุ่ม ชดเชยความสูง navbar (ใช้ `scroll-margin-top` บน section ก็ได้ — เพิ่มใน base.css)
- [ ] **Step 3: Fade-in on scroll** — `IntersectionObserver` เพิ่ม class `.in-view` ให้ `.section`/`.card` เมื่อเข้าจอ; CSS: เริ่ม `opacity:0;translateY(12px)` → `.in-view` คืนค่า. ครอบด้วย `if(!matchMedia('(prefers-reduced-motion: reduce)').matches)`
- [ ] **Step 4: Verify** — navbar เปลี่ยนตอน scroll, anchor เลื่อนไม่ถูก navbar บัง, fade-in ทำงาน, เปิด reduce-motion แล้วไม่มี animation
- [ ] **Step 5: Commit** — `git commit -am "feat: scroll behaviors + fade-in (reduced-motion aware)"`

---

## Task 17: Responsive + Accessibility Pass

**Files:** Modify `css/styles.css`, `index.html`

- [ ] **Step 1: Responsive sweep** — เช็คทุก section ที่ 375px / 768px / 1024px / 1440px. แก้ overflow, ตัวอักษรล้น, gap. ปุ่ม CTA เต็มกว้างบนมือถือ.
- [ ] **Step 2: A11y** — heading hierarchy เรียงถูก (h1 เดียว), ทุก `<img>` มี `alt`, ปุ่ม accordion/เมนูมี `aria-*`, โฟกัส keyboard เห็น (`:focus-visible` outline brand), คอนทราสต์ผ่าน. ใส่ `loading="lazy"` รูปใต้ fold + `width/height`.
- [ ] **Step 3: Verify** — ผ่านทุก breakpoint ไม่มี horizontal scroll; Tab ไล่ทั้งหน้าได้; (ถ้ามี) Lighthouse a11y ≥ 90
- [ ] **Step 4: Commit** — `git commit -am "fix: responsive + accessibility pass"`

---

## Task 18: Docs + OG meta + Polish

**Files:** Create `docs/design-system.md`, `README.md`, `assets/img/og.jpg`; Modify `index.html`

- [ ] **Step 1: `docs/design-system.md`** — สรุป token (สี/ฟอนต์/spacing/radius/shadow) + ตาราง component + ภาพการใช้ ใช้เป็น reference ตอนทำ Next.js
- [ ] **Step 2: `README.md`** — โปรเจคคืออะไร, วิธีเปิด (`python3 -m http.server`), โครงไฟล์, และ map section → component สำหรับเฟส Next.js (อ้าง spec)
- [ ] **Step 3: OG/meta** — เพิ่ม `og:title/description/image`, `twitter:card` ใน `<head>`, ใส่รูป `assets/img/og.jpg` (placeholder)
- [ ] **Step 4: Verify** — เปิดหน้า ครบทุก section ไหลต่อเนื่อง ไม่มี console error; เอกสารอ่านรู้เรื่อง
- [ ] **Step 5: Commit** — `git commit -am "docs: design system + readme + og meta"`

---

## Self-Review (spec coverage)

- brief §1 Hero → Task 4 ✓ · §2 Problem → Task 6 ✓ · §3 Solution/Workflow → Task 7 ✓ · §4 Build → Task 8 ✓ · §5 Curriculum → Task 9 ✓ · §6 Bonus → Task 10 ✓ · §7 Instructor → Task 11 ✓ · §8 Pricing → Task 12 ✓ · §9 Tools → Task 13 ✓ · §10 FAQ → Task 14 ✓ · §11 Final CTA → Task 15 ✓
- spec §3 navbar/trust/footer → Task 3/5/15 ✓ · §5 design system → Task 1/2 + 18 ✓ · §7 interactions → Task 3/9/16 ✓ · §8 responsive → Task 17 ✓ · §10 a11y/perf → Task 17/18 ✓
- โลโก้จริง `assets/logo.png` → ใช้ใน Task 3/15 (อัปเดตจากสมมติฐาน spec §13)
- Testimonials เว้นไว้ตามตั้งใจ (ไม่อยู่ในแผน) ✓
- No-glow rule บังคับใน Task 4/ทุก shadow ✓
```
