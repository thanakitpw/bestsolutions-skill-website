# On-site Payment + Purchase Conversion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** เปิดให้ลูกค้าซื้อคอร์สและจ่ายเงินบนเว็บผ่าน Stripe (PromptPay + บัตร) แล้วเก็บ Purchase conversion ส่ง Facebook ได้แม่นยำ

**Architecture:** Next.js App Router API routes สร้าง Stripe Embedded Checkout Session + บันทึก order `pending` ลง Supabase (service role) → ลูกค้าจ่ายในหน้า embedded → หน้า success ยิง Meta Pixel Purchase (client) → Stripe webhook ยืนยันจ่ายจริงแล้วยิง Meta Conversions API Purchase (server, dedupe ด้วย `event_id` เดียวกัน) + แจ้งแอดมินผ่าน LINE Messaging API

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Supabase (`@supabase/supabase-js` service role), Stripe (`stripe` + `@stripe/stripe-js` + `@stripe/react-stripe-js`), Meta Conversions API (fetch), LINE Messaging API (fetch), Vitest (unit tests สำหรับ logic ล้วน)

## Global Constraints

- Next.js 15 App Router + React 19 + TypeScript strict — ตรงกับ repo เดิม
- ราคาเก็บเป็นหน่วยสตางค์ (THB ×100); currency = `thb`
- ราคา/จำนวน คำนวณและ validate **ฝั่ง server เท่านั้น** จาก `lib/plans.ts` — ห้ามเชื่อ amount จาก client
- ทุก integration behind env: ถ้าไม่มี key ที่เกี่ยว ต้อง degrade อย่างปลอดภัย (ไม่ crash)
- `SUPABASE_SERVICE_ROLE_KEY` และ secret อื่น ๆ ใช้ฝั่ง server เท่านั้น ห้าม prefix `NEXT_PUBLIC_`
- Side-effect ใน webhook ต้อง idempotent (กัน Stripe retry ยิงซ้ำ)
- ใช้ path alias `@/*` (มีใน tsconfig แล้ว)
- spec อ้างอิง: `docs/superpowers/specs/2026-06-18-onsite-payment-design.md`

---

## File Structure

- `lib/plans.ts` — แหล่งความจริงเดียวของ tier + คำนวณ/validate ราคา (pure)
- `lib/meta.ts` — hash user data + สร้าง payload + ส่ง Purchase ไป Conversions API
- `lib/notify.ts` — push ข้อความแจ้งแอดมินผ่าน LINE Messaging API
- `lib/stripe.ts` — Stripe server client (singleton)
- `lib/orders.ts` — data layer ตาราง `orders` ด้วย Supabase service role
- `lib/supabaseAdmin.ts` — Supabase service-role client (singleton, server-only)
- `app/api/checkout/route.ts` — POST: validate → createPendingOrder → Stripe session → คืน clientSecret
- `app/api/stripe/webhook/route.ts` — POST: verify → markPaid + CAPI + notify (idempotent)
- `components/MetaPixel.tsx` — base Pixel (client) ทั้งเว็บ
- `components/CheckoutForm.tsx` — client: ฟอร์มข้อมูลผู้ซื้อ + เลือกจำนวน + mount Embedded Checkout
- `app/checkout/page.tsx` — server wrapper อ่าน `?plan=` ส่งเข้า CheckoutForm
- `app/checkout/success/page.tsx` — server: ตรวจ session paid → render thank-you + Pixel Purchase
- `components/PixelPurchase.tsx` — client: ยิง Pixel `Purchase` ด้วย event_id ตอน mount
- `supabase/migrations/0002_orders.sql` — ตาราง `orders` (เก็บไว้ใน repo เป็น source of truth; apply ผ่าน MCP)
- แก้ CTA: `components/Hero.tsx`, `components/Pricing.tsx`, `components/FinalCta.tsx`
- test: `lib/plans.test.ts`, `lib/meta.test.ts`

---

### Task 1: Test runner + `lib/plans.ts` (แหล่งความจริงราคา)

**Files:**
- Modify: `package.json` (เพิ่ม vitest + script `test`)
- Create: `vitest.config.ts`
- Create: `lib/plans.ts`
- Test: `lib/plans.test.ts`

**Interfaces:**
- Produces:
  - `type PlanId = "early-bird" | "group" | "private"`
  - `interface Plan { id: PlanId; name: string; unitAmount: number; minQty: number; maxQty: number }`
  - `const PLANS: Record<PlanId, Plan>`
  - `function getPlan(id: string): Plan | null`
  - `function computeOrder(id: string, qty: number): { plan: Plan; quantity: number; amountTotal: number }` — throws `Error` ถ้า plan/qty ไม่ถูกต้อง

- [ ] **Step 1: ติดตั้ง vitest**

Run: `npm install -D vitest`
Expected: เพิ่มใน devDependencies สำเร็จ

- [ ] **Step 2: เพิ่ม script test ใน package.json**

ใน `"scripts"` เพิ่ม:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 3: สร้าง vitest.config.ts**

```ts
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["**/*.test.ts"],
  },
});
```

- [ ] **Step 4: เขียน failing test `lib/plans.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { getPlan, computeOrder } from "./plans";

describe("getPlan", () => {
  it("คืน plan ที่รู้จัก", () => {
    expect(getPlan("early-bird")?.unitAmount).toBe(299000);
  });
  it("คืน null สำหรับ plan ที่ไม่รู้จัก", () => {
    expect(getPlan("nope")).toBeNull();
  });
});

describe("computeOrder", () => {
  it("early-bird 1 คน = 299000 สตางค์", () => {
    expect(computeOrder("early-bird", 1).amountTotal).toBe(299000);
  });
  it("group 2 คน = 518000 สตางค์", () => {
    expect(computeOrder("group", 2).amountTotal).toBe(518000);
  });
  it("group ต่ำกว่า min (1) โยน error", () => {
    expect(() => computeOrder("group", 1)).toThrow();
  });
  it("private เกิน max โยน error", () => {
    expect(() => computeOrder("private", 2)).toThrow();
  });
  it("plan ไม่รู้จักโยน error", () => {
    expect(() => computeOrder("nope", 1)).toThrow();
  });
  it("qty ไม่ใช่จำนวนเต็มบวกโยน error", () => {
    expect(() => computeOrder("early-bird", 0)).toThrow();
  });
});
```

- [ ] **Step 5: รัน test ให้เห็นว่า fail**

Run: `npm test`
Expected: FAIL — `getPlan`/`computeOrder` ยังไม่มี

- [ ] **Step 6: เขียน `lib/plans.ts`**

```ts
export type PlanId = "early-bird" | "group" | "private";

export interface Plan {
  id: PlanId;
  name: string;
  unitAmount: number; // สตางค์ (THB ×100)
  minQty: number;
  maxQty: number;
}

export const PLANS: Record<PlanId, Plan> = {
  "early-bird": { id: "early-bird", name: "Vibe Code Bootcamp — Early Bird", unitAmount: 299000, minQty: 1, maxQty: 1 },
  group: { id: "group", name: "Vibe Code Bootcamp — กลุ่ม (ต่อคน)", unitAmount: 259000, minQty: 2, maxQty: 20 },
  private: { id: "private", name: "Vibe Code Bootcamp — Private Class", unitAmount: 699000, minQty: 1, maxQty: 1 },
};

export function getPlan(id: string): Plan | null {
  return (PLANS as Record<string, Plan>)[id] ?? null;
}

export function computeOrder(
  id: string,
  qty: number
): { plan: Plan; quantity: number; amountTotal: number } {
  const plan = getPlan(id);
  if (!plan) throw new Error(`unknown plan: ${id}`);
  if (!Number.isInteger(qty) || qty < plan.minQty || qty > plan.maxQty) {
    throw new Error(`invalid quantity ${qty} for plan ${id}`);
  }
  return { plan, quantity: qty, amountTotal: plan.unitAmount * qty };
}
```

- [ ] **Step 7: รัน test ให้ผ่าน**

Run: `npm test`
Expected: PASS ทุก case

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json vitest.config.ts lib/plans.ts lib/plans.test.ts
git commit -m "feat: plans pricing source of truth + vitest"
```

---

### Task 2: ตาราง `orders` + data layer

**Files:**
- Create: `supabase/migrations/0002_orders.sql`
- Create: `lib/supabaseAdmin.ts`
- Create: `lib/orders.ts`

**Interfaces:**
- Consumes: `PlanId` จาก `lib/plans.ts`
- Produces:
  - `getSupabaseAdmin(): SupabaseClient | null` (service role, server-only)
  - `interface OrderInput { plan: PlanId; quantity: number; unitAmount: number; amountTotal: number; buyerName: string; buyerEmail: string; buyerPhone: string; eventId: string; stripeSessionId: string }`
  - `interface Order extends OrderInput { id: string; status: "pending" | "paid" | "failed"; stripePaymentIntent: string | null; paidAt: string | null }`
  - `createPendingOrder(input: OrderInput): Promise<void>`
  - `getOrderBySessionId(sessionId: string): Promise<Order | null>`
  - `markOrderPaid(sessionId: string, paymentIntent: string): Promise<{ updated: boolean }>` — `updated=false` ถ้าจ่ายแล้ว (idempotent)

- [ ] **Step 1: เขียน migration `supabase/migrations/0002_orders.sql`**

```sql
create extension if not exists "pgcrypto";

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  plan text not null,
  quantity int not null,
  unit_amount int not null,
  amount_total int not null,
  currency text not null default 'thb',
  status text not null default 'pending',
  buyer_name text not null,
  buyer_email text not null,
  buyer_phone text not null,
  event_id text not null,
  stripe_session_id text unique not null,
  stripe_payment_intent text,
  created_at timestamptz not null default now(),
  paid_at timestamptz
);

create index if not exists orders_status_idx on public.orders (status);

-- เปิด RLS แต่ไม่มี policy ให้ anon: เข้าถึงผ่าน service role (ฝั่ง server) เท่านั้น
alter table public.orders enable row level security;
```

- [ ] **Step 2: apply migration ผ่าน MCP**

ใช้ tool `mcp__supabase__apply_migration` ชื่อ `0002_orders` เนื้อหา = SQL จาก Step 1
จากนั้นยืนยันด้วย `mcp__supabase__list_tables` → ต้องเห็น `orders`
และ `mcp__supabase__get_advisors` (type `security`) → ต้องไม่มี warning ว่า `orders` เปิด public โดยไม่มี RLS

- [ ] **Step 3: สร้าง `lib/supabaseAdmin.ts`**

```ts
import { createClient, type SupabaseClient } from "@supabase/supabase-js";

let cached: SupabaseClient | null | undefined;

/** Service-role client — server-only. คืน null ถ้า env ไม่ครบ. */
export function getSupabaseAdmin(): SupabaseClient | null {
  if (cached !== undefined) return cached;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  cached = url && key ? createClient(url, key, { auth: { persistSession: false } }) : null;
  return cached;
}
```

- [ ] **Step 4: สร้าง `lib/orders.ts`**

```ts
import type { PlanId } from "./plans";
import { getSupabaseAdmin } from "./supabaseAdmin";

export interface OrderInput {
  plan: PlanId;
  quantity: number;
  unitAmount: number;
  amountTotal: number;
  buyerName: string;
  buyerEmail: string;
  buyerPhone: string;
  eventId: string;
  stripeSessionId: string;
}

export interface Order extends OrderInput {
  id: string;
  status: "pending" | "paid" | "failed";
  stripePaymentIntent: string | null;
  paidAt: string | null;
}

function db() {
  const sb = getSupabaseAdmin();
  if (!sb) throw new Error("Supabase service role not configured");
  return sb;
}

export async function createPendingOrder(input: OrderInput): Promise<void> {
  const { error } = await db()
    .from("orders")
    .insert({
      plan: input.plan,
      quantity: input.quantity,
      unit_amount: input.unitAmount,
      amount_total: input.amountTotal,
      buyer_name: input.buyerName,
      buyer_email: input.buyerEmail,
      buyer_phone: input.buyerPhone,
      event_id: input.eventId,
      stripe_session_id: input.stripeSessionId,
    });
  if (error) throw new Error(`createPendingOrder: ${error.message}`);
}

function mapRow(r: Record<string, unknown>): Order {
  return {
    id: r.id as string,
    plan: r.plan as PlanId,
    quantity: r.quantity as number,
    unitAmount: r.unit_amount as number,
    amountTotal: r.amount_total as number,
    buyerName: r.buyer_name as string,
    buyerEmail: r.buyer_email as string,
    buyerPhone: r.buyer_phone as string,
    eventId: r.event_id as string,
    stripeSessionId: r.stripe_session_id as string,
    status: r.status as Order["status"],
    stripePaymentIntent: (r.stripe_payment_intent as string) ?? null,
    paidAt: (r.paid_at as string) ?? null,
  };
}

export async function getOrderBySessionId(sessionId: string): Promise<Order | null> {
  const { data, error } = await db()
    .from("orders")
    .select("*")
    .eq("stripe_session_id", sessionId)
    .maybeSingle();
  if (error) throw new Error(`getOrderBySessionId: ${error.message}`);
  return data ? mapRow(data) : null;
}

/** ทำเป็น paid แบบ idempotent: อัปเดตเฉพาะแถวที่ยัง status='pending'. */
export async function markOrderPaid(
  sessionId: string,
  paymentIntent: string
): Promise<{ updated: boolean }> {
  const { data, error } = await db()
    .from("orders")
    .update({
      status: "paid",
      stripe_payment_intent: paymentIntent,
      paid_at: new Date().toISOString(),
    })
    .eq("stripe_session_id", sessionId)
    .eq("status", "pending")
    .select("id");
  if (error) throw new Error(`markOrderPaid: ${error.message}`);
  return { updated: (data?.length ?? 0) > 0 };
}
```

- [ ] **Step 5: ยืนยัน typecheck ผ่าน**

Run: `npx tsc --noEmit`
Expected: exit 0

- [ ] **Step 6: Commit**

```bash
git add supabase/migrations/0002_orders.sql lib/supabaseAdmin.ts lib/orders.ts
git commit -m "feat: orders table + service-role data layer"
```

---

### Task 3: Meta Conversions API helper

**Files:**
- Create: `lib/meta.ts`
- Test: `lib/meta.test.ts`

**Interfaces:**
- Produces:
  - `hashField(value: string): string` — sha256 ของค่า normalize แล้ว (lowercase + trim)
  - `normalizePhone(phone: string): string` — เหลือเฉพาะตัวเลข, เบอร์ไทยขึ้นต้น 0 → แทนด้วย 66
  - `sendPurchaseEvent(args: { eventId: string; email: string; phone: string; value: number; currency: string; sourceUrl?: string }): Promise<void>` — no-op ถ้า env ไม่ครบ; ไม่ throw

- [ ] **Step 1: เขียน failing test `lib/meta.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { hashField, normalizePhone } from "./meta";

describe("hashField", () => {
  it("hash sha256 ของค่า lowercase+trim (ค่าคงที่)", () => {
    // sha256("test@example.com")
    expect(hashField("  Test@Example.com ")).toBe(
      "973dfe463ec85785f5f95af5ba3906eedb2d931c24e69824a89ea65dba4e813b"
    );
  });
});

describe("normalizePhone", () => {
  it("เบอร์ไทย 0 นำหน้า → 66", () => {
    expect(normalizePhone("095-385-4906")).toBe("66953854906");
  });
  it("มี +66 อยู่แล้ว คงเดิม (เหลือเลข)", () => {
    expect(normalizePhone("+66 95 385 4906")).toBe("66953854906");
  });
});
```

- [ ] **Step 2: รัน test ให้เห็น fail**

Run: `npm test`
Expected: FAIL — module ยังไม่มี

- [ ] **Step 3: เขียน `lib/meta.ts`**

```ts
import { createHash } from "node:crypto";

export function hashField(value: string): string {
  return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
}

export function normalizePhone(phone: string): string {
  let digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) digits = "66" + digits.slice(1);
  return digits;
}

const GRAPH_VERSION = "v21.0";

export async function sendPurchaseEvent(args: {
  eventId: string;
  email: string;
  phone: string;
  value: number; // หน่วยบาท (ไม่ใช่สตางค์)
  currency: string;
  sourceUrl?: string;
}): Promise<void> {
  const pixelId = process.env.META_PIXEL_ID;
  const token = process.env.META_CAPI_TOKEN;
  if (!pixelId || !token) return; // degrade เงียบ ๆ

  const body = {
    data: [
      {
        event_name: "Purchase",
        event_time: Math.floor(Date.now() / 1000),
        event_id: args.eventId,
        action_source: "website",
        ...(args.sourceUrl ? { event_source_url: args.sourceUrl } : {}),
        user_data: {
          em: [hashField(args.email)],
          ph: [hashField(normalizePhone(args.phone))],
        },
        custom_data: { currency: args.currency, value: args.value },
      },
    ],
  };

  const res = await fetch(
    `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events?access_token=${token}`,
    { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }
  );
  if (!res.ok) {
    console.error("Meta CAPI error", res.status, await res.text());
  }
}
```

- [ ] **Step 4: รัน test ให้ผ่าน**

Run: `npm test`
Expected: PASS (ถ้า hash ค่าไม่ตรง ให้แก้ค่าคาดหวังใน test ให้ตรงกับ sha256 จริงของ `test@example.com`)

- [ ] **Step 5: Commit**

```bash
git add lib/meta.ts lib/meta.test.ts
git commit -m "feat: Meta Conversions API Purchase helper"
```

---

### Task 4: LINE Messaging API notify

**Files:**
- Create: `lib/notify.ts`

**Interfaces:**
- Consumes: `Order` จาก `lib/orders.ts`
- Produces: `notifyAdminNewOrder(order: Order): Promise<void>` — no-op ถ้า env ไม่ครบ; ไม่ throw

- [ ] **Step 1: เขียน `lib/notify.ts`**

```ts
import type { Order } from "./orders";

function formatBaht(satang: number): string {
  return (satang / 100).toLocaleString("th-TH");
}

export async function notifyAdminNewOrder(order: Order): Promise<void> {
  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  const to = process.env.LINE_ADMIN_TO;
  if (!token || !to) return; // degrade เงียบ ๆ

  const text =
    `🟢 ออร์เดอร์ใหม่ (จ่ายแล้ว)\n` +
    `แพ็กเกจ: ${order.plan} ×${order.quantity}\n` +
    `ยอด: ${formatBaht(order.amountTotal)} บาท\n` +
    `ชื่อ: ${order.buyerName}\n` +
    `อีเมล: ${order.buyerEmail}\n` +
    `เบอร์: ${order.buyerPhone}\n` +
    `order: ${order.id}`;

  const res = await fetch("https://api.line.me/v2/bot/message/push", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ to, messages: [{ type: "text", text }] }),
  });
  if (!res.ok) {
    console.error("LINE push error", res.status, await res.text());
  }
}
```

- [ ] **Step 2: ยืนยัน typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0

- [ ] **Step 3: Commit**

```bash
git add lib/notify.ts
git commit -m "feat: LINE Messaging API admin notification"
```

---

### Task 5: Stripe client + `POST /api/checkout`

**Files:**
- Create: `lib/stripe.ts`
- Create: `app/api/checkout/route.ts`

**Interfaces:**
- Consumes: `computeOrder` (plans), `createPendingOrder` (orders)
- Produces: `getStripe(): Stripe | null`; endpoint `POST /api/checkout` → `{ clientSecret: string }`

- [ ] **Step 1: ติดตั้ง Stripe server SDK**

Run: `npm install stripe`
Expected: เพิ่มใน dependencies

- [ ] **Step 2: สร้าง `lib/stripe.ts`**

```ts
import Stripe from "stripe";

let cached: Stripe | null | undefined;

export function getStripe(): Stripe | null {
  if (cached !== undefined) return cached;
  const key = process.env.STRIPE_SECRET_KEY;
  cached = key ? new Stripe(key) : null;
  return cached;
}
```

- [ ] **Step 3: สร้าง `app/api/checkout/route.ts`**

```ts
import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { computeOrder } from "@/lib/plans";
import { createPendingOrder } from "@/lib/orders";
import { getStripe } from "@/lib/stripe";

export async function POST(req: Request) {
  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "payment not configured" }, { status: 503 });
  }

  let payload: { plan?: string; quantity?: number; name?: string; email?: string; phone?: string };
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "invalid body" }, { status: 400 });
  }

  const { plan, quantity, name, email, phone } = payload;
  if (!name?.trim() || !email?.trim() || !phone?.trim()) {
    return NextResponse.json({ error: "missing buyer info" }, { status: 400 });
  }

  let computed;
  try {
    computed = computeOrder(String(plan), Number(quantity));
  } catch {
    return NextResponse.json({ error: "invalid plan or quantity" }, { status: 400 });
  }

  const eventId = randomUUID();
  const origin = req.headers.get("origin") ?? new URL(req.url).origin;

  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    mode: "payment",
    payment_method_types: ["card", "promptpay"],
    line_items: [
      {
        quantity: computed.quantity,
        price_data: {
          currency: "thb",
          unit_amount: computed.plan.unitAmount,
          product_data: { name: computed.plan.name },
        },
      },
    ],
    return_url: `${origin}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
    metadata: { plan: computed.plan.id, event_id: eventId },
  });

  await createPendingOrder({
    plan: computed.plan.id,
    quantity: computed.quantity,
    unitAmount: computed.plan.unitAmount,
    amountTotal: computed.amountTotal,
    buyerName: name.trim(),
    buyerEmail: email.trim(),
    buyerPhone: phone.trim(),
    eventId,
    stripeSessionId: session.id,
  });

  return NextResponse.json({ clientSecret: session.client_secret });
}
```

- [ ] **Step 4: ยืนยัน typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0

- [ ] **Step 5: Commit**

```bash
git add package.json package-lock.json lib/stripe.ts app/api/checkout/route.ts
git commit -m "feat: checkout API creates embedded session + pending order"
```

---

### Task 6: `POST /api/stripe/webhook` (idempotent)

**Files:**
- Create: `app/api/stripe/webhook/route.ts`

**Interfaces:**
- Consumes: `getStripe`, `markOrderPaid`/`getOrderBySessionId` (orders), `sendPurchaseEvent` (meta), `notifyAdminNewOrder` (notify)

- [ ] **Step 1: สร้าง `app/api/stripe/webhook/route.ts`**

```ts
import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { getOrderBySessionId, markOrderPaid } from "@/lib/orders";
import { sendPurchaseEvent } from "@/lib/meta";
import { notifyAdminNewOrder } from "@/lib/notify";

// Stripe ต้องการ raw body — ปิด body parsing โดยอ่านเป็น text
export async function POST(req: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!stripe || !secret) {
    return NextResponse.json({ error: "not configured" }, { status: 503 });
  }

  const sig = req.headers.get("stripe-signature");
  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(raw, sig!, secret);
  } catch (err) {
    return NextResponse.json({ error: `signature: ${(err as Error).message}` }, { status: 400 });
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.payment_status === "paid") {
      try {
        const paymentIntent =
          typeof session.payment_intent === "string" ? session.payment_intent : "";
        const { updated } = await markOrderPaid(session.id, paymentIntent);
        if (updated) {
          const order = await getOrderBySessionId(session.id);
          if (order) {
            // side-effects: ถ้าล้มก็ log แต่ห้ามทำให้ webhook fail
            await sendPurchaseEvent({
              eventId: order.eventId,
              email: order.buyerEmail,
              phone: order.buyerPhone,
              value: order.amountTotal / 100,
              currency: "THB",
            }).catch((e) => console.error("CAPI failed", e));
            await notifyAdminNewOrder(order).catch((e) => console.error("notify failed", e));
          }
        }
      } catch (e) {
        console.error("webhook processing error", e);
        // ยังตอบ 200 เพื่อไม่ให้ Stripe retry รัว (order อาจ paid แล้ว)
      }
    }
  }

  return NextResponse.json({ received: true });
}
```

- [ ] **Step 2: ยืนยัน typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0

- [ ] **Step 3: ทดสอบ webhook ด้วย Stripe CLI (test mode)**

Run (เทอร์มินัลของผู้ใช้ ผ่าน `!`): `stripe listen --forward-to localhost:3000/api/stripe/webhook`
คัดลอก `whsec_...` ที่ได้ ใส่ `STRIPE_WEBHOOK_SECRET` ใน `.env.local` แล้ว restart `npm run dev`
Expected: เมื่อจ่ายเงินทดสอบสำเร็จ เห็น event `checkout.session.completed` ส่งเข้ามา 200

- [ ] **Step 4: Commit**

```bash
git add app/api/stripe/webhook/route.ts
git commit -m "feat: stripe webhook marks paid + fires CAPI + notifies admin (idempotent)"
```

---

### Task 7: Meta Pixel base + layout integration

**Files:**
- Create: `components/MetaPixel.tsx`
- Modify: `app/layout.tsx` (เพิ่ม `<MetaPixel />` คู่กับ `<Analytics />`)

**Interfaces:**
- Produces: component `MetaPixel` โหลด base pixel เมื่อมี `NEXT_PUBLIC_META_PIXEL_ID`; ประกาศ global `window.fbq`

- [ ] **Step 1: สร้าง `components/MetaPixel.tsx`**

```tsx
"use client";

import Script from "next/script";

const PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID;

export function MetaPixel() {
  if (!PIXEL_ID) return null;
  return (
    <Script id="meta-pixel" strategy="afterInteractive">
      {`!function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script',
      'https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${PIXEL_ID}');
      fbq('track', 'PageView');`}
    </Script>
  );
}
```

- [ ] **Step 2: เพิ่ม global type ให้ `window.fbq`**

สร้าง `components/fbq.d.ts`:
```ts
export {};
declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}
```

- [ ] **Step 3: เพิ่มใน `app/layout.tsx`**

import และวางใน body คู่กับ Analytics เดิม:
```tsx
import { MetaPixel } from "@/components/MetaPixel";
// ...ใน <body> ใกล้ ๆ <Analytics />:
<MetaPixel />
```

- [ ] **Step 4: ยืนยัน build/typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0

- [ ] **Step 5: Commit**

```bash
git add components/MetaPixel.tsx components/fbq.d.ts app/layout.tsx
git commit -m "feat: Meta Pixel base loader"
```

---

### Task 8: หน้า `/checkout` (embedded checkout + InitiateCheckout)

**Files:**
- Create: `components/CheckoutForm.tsx`
- Create: `app/checkout/page.tsx`

**Interfaces:**
- Consumes: `PLANS`/`getPlan` (plans), endpoint `/api/checkout`, `window.fbq`
- Produces: หน้า checkout ที่ mount Embedded Checkout

- [ ] **Step 1: ติดตั้ง Stripe client libs**

Run: `npm install @stripe/stripe-js @stripe/react-stripe-js`
Expected: เพิ่มใน dependencies

- [ ] **Step 2: สร้าง `components/CheckoutForm.tsx`**

```tsx
"use client";

import { useCallback, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { PLANS, type PlanId } from "@/lib/plans";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY ?? "");

export function CheckoutForm({ plan }: { plan: PlanId }) {
  const def = PLANS[plan];
  const [quantity, setQuantity] = useState(def.minQty);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [started, setStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchClientSecret = useCallback(async () => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan, quantity, name, email, phone }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "checkout failed");
    return data.clientSecret as string;
  }, [plan, quantity, name, email, phone]);

  function start() {
    setError(null);
    if (!name.trim() || !email.trim() || !phone.trim()) {
      setError("กรอกชื่อ อีเมล และเบอร์โทรให้ครบ");
      return;
    }
    window.fbq?.("track", "InitiateCheckout", {
      currency: "THB",
      value: (def.unitAmount * quantity) / 100,
    });
    setStarted(true);
  }

  if (started) {
    return (
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    );
  }

  return (
    <div className="checkout-form">
      <h1>{def.name}</h1>
      {def.maxQty > 1 && (
        <label>
          จำนวนผู้เรียน
          <input
            type="number"
            min={def.minQty}
            max={def.maxQty}
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
          />
        </label>
      )}
      <label>ชื่อ-นามสกุล<input value={name} onChange={(e) => setName(e.target.value)} /></label>
      <label>อีเมล<input type="email" value={email} onChange={(e) => setEmail(e.target.value)} /></label>
      <label>เบอร์โทร<input value={phone} onChange={(e) => setPhone(e.target.value)} /></label>
      <p className="checkout-total">
        ยอดรวม {((def.unitAmount * quantity) / 100).toLocaleString("th-TH")} บาท
      </p>
      {error && <p className="checkout-error">{error}</p>}
      <button className="btn btn-primary" onClick={start}>ไปหน้าชำระเงิน</button>
    </div>
  );
}
```

- [ ] **Step 3: สร้าง `app/checkout/page.tsx`**

```tsx
import { redirect } from "next/navigation";
import { getPlan, type PlanId } from "@/lib/plans";
import { CheckoutForm } from "@/components/CheckoutForm";
import { SiteNavbar } from "@/components/SiteNavbar";
import { Footer } from "@/components/Footer";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan } = await searchParams;
  if (!plan || !getPlan(plan)) redirect("/courses");
  return (
    <>
      <SiteNavbar />
      <main className="container checkout-page">
        <CheckoutForm plan={plan as PlanId} />
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 4: เพิ่ม style ขั้นต่ำใน `app/styles.css`**

```css
.checkout-page { padding-block: var(--space-12); max-width: 560px; }
.checkout-form { display: grid; gap: var(--space-4); }
.checkout-form label { display: grid; gap: var(--space-1); font-size: .92rem; }
.checkout-form input { padding: 10px 12px; border-radius: var(--r-md); border: 1px solid var(--border-strong); background: var(--surface); color: var(--text); }
.checkout-total { font-family: var(--font-display); font-size: 1.2rem; }
.checkout-error { color: var(--brand-tint); font-size: .9rem; }
```

- [ ] **Step 5: ยืนยัน typecheck + dev**

Run: `npx tsc --noEmit`
Expected: exit 0
Run (ผู้ใช้): เปิด `http://localhost:3000/checkout?plan=early-bird` → เห็นฟอร์ม กรอกแล้วกด "ไปหน้าชำระเงิน" → เห็น Stripe embedded form

- [ ] **Step 6: Commit**

```bash
git add package.json package-lock.json components/CheckoutForm.tsx app/checkout/page.tsx app/styles.css
git commit -m "feat: /checkout page with embedded Stripe checkout"
```

---

### Task 9: หน้า `/checkout/success` + Pixel Purchase

**Files:**
- Create: `components/PixelPurchase.tsx`
- Create: `app/checkout/success/page.tsx`

**Interfaces:**
- Consumes: `getStripe` (ตรวจ session), `getOrderBySessionId` (orders), `window.fbq`

- [ ] **Step 1: สร้าง `components/PixelPurchase.tsx`**

```tsx
"use client";

import { useEffect } from "react";

export function PixelPurchase({
  eventId,
  value,
  currency,
}: {
  eventId: string;
  value: number;
  currency: string;
}) {
  useEffect(() => {
    window.fbq?.("track", "Purchase", { value, currency }, { eventID: eventId });
  }, [eventId, value, currency]);
  return null;
}
```

- [ ] **Step 2: สร้าง `app/checkout/success/page.tsx`**

```tsx
import { redirect } from "next/navigation";
import { getStripe } from "@/lib/stripe";
import { getOrderBySessionId } from "@/lib/orders";
import { PixelPurchase } from "@/components/PixelPurchase";
import { SiteNavbar } from "@/components/SiteNavbar";
import { Footer } from "@/components/Footer";

export const dynamic = "force-dynamic";

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const stripe = getStripe();
  if (!session_id || !stripe) redirect("/courses");

  const session = await stripe.checkout.sessions.retrieve(session_id);
  if (session.payment_status !== "paid") redirect("/courses");

  const order = await getOrderBySessionId(session_id);

  return (
    <>
      <SiteNavbar />
      <main className="container checkout-page">
        {order && (
          <PixelPurchase
            eventId={order.eventId}
            value={order.amountTotal / 100}
            currency="THB"
          />
        )}
        <div className="coming-soon">
          <h1>ขอบคุณสำหรับการสมัคร 🎉</h1>
          <p>เราได้รับการชำระเงินเรียบร้อยแล้ว</p>
          {order && (
            <p className="text-dim">
              {order.plan} ×{order.quantity} — {(order.amountTotal / 100).toLocaleString("th-TH")} บาท
            </p>
          )}
          <p>ทีมงานจะติดต่อกลับทาง LINE เพื่อยืนยันรายละเอียดและส่งลิงก์เข้ากลุ่มเรียน</p>
          <a className="btn btn-primary" href="https://lin.ee/Q22m30X" target="_blank" rel="noopener noreferrer" data-cta="line">
            เพิ่มเพื่อนทาง LINE
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

- [ ] **Step 3: ยืนยัน typecheck**

Run: `npx tsc --noEmit`
Expected: exit 0

- [ ] **Step 4: ทดสอบ end-to-end (test mode)**

Run (ผู้ใช้): จ่ายเงินด้วยบัตรทดสอบ `4242 4242 4242 4242` → ถูก redirect มา `/checkout/success` → เห็นหน้าขอบคุณ
ตรวจ Supabase: order เปลี่ยนเป็น `paid`
ตรวจ Meta Events Manager → Test Events: เห็น Purchase ทั้งจาก Pixel (browser) และ Server (CAPI) และ dedupe เหลือ 1

- [ ] **Step 5: Commit**

```bash
git add components/PixelPurchase.tsx app/checkout/success/page.tsx
git commit -m "feat: checkout success page fires Pixel Purchase + LINE CTA"
```

---

### Task 10: เชื่อม CTA ปุ่มสมัคร + เอกสาร env

**Files:**
- Modify: `components/Hero.tsx:43-47` (ปุ่ม "สมัคร Vibe Code Bootcamp" → `/checkout?plan=early-bird`)
- Modify: `components/FinalCta.tsx:12-14` (ปุ่ม "สมัคร Early Bird" → `/checkout?plan=early-bird`)
- Modify: `components/Pricing.tsx:61-62` (ปุ่ม "สมัคร Group Class" → `/checkout?plan=group`; ปุ่ม Private → `/checkout?plan=private`)
- Modify: `.env.example` (เพิ่ม env ของ Stripe/Meta/LINE)

**Interfaces:**
- Consumes: หน้า `/checkout` จาก Task 8

- [ ] **Step 1: แก้ Hero CTA**

ใน `components/Hero.tsx` ปุ่มหลัก เปลี่ยน `href="#pricing"` เป็น `href="/checkout?plan=early-bird"` (คงปุ่มรองที่ลิงก์ `#pricing`/LINE ตามเดิม)

- [ ] **Step 2: แก้ FinalCta CTA**

ใน `components/FinalCta.tsx` ปุ่ม "สมัคร Early Bird 2,990.-" เปลี่ยน `href="#pricing"` เป็น `href="/checkout?plan=early-bird"`

- [ ] **Step 3: แก้ Pricing CTA**

ใน `components/Pricing.tsx`:
- ปุ่ม "สมัคร Group Class" เปลี่ยนจาก LINE เป็น `href="/checkout?plan=group"` (เอา target/rel ออก)
- ปุ่ม Private (บรรทัด 105) เปลี่ยนเป็น `href="/checkout?plan=private"`
- ปุ่ม "ติดต่อทาง LINE" ทั่วไปคงไว้สำหรับสอบถาม

- [ ] **Step 4: อัปเดต `.env.example`**

เพิ่มท้ายไฟล์:
```
# Stripe (ระบบจ่ายเงิน)
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=

# Meta Pixel + Conversions API
NEXT_PUBLIC_META_PIXEL_ID=
META_PIXEL_ID=
META_CAPI_TOKEN=

# LINE Messaging API (แจ้งแอดมิน)
LINE_CHANNEL_ACCESS_TOKEN=
LINE_ADMIN_TO=
```

- [ ] **Step 5: ยืนยัน build เต็ม**

Run: `npm run build`
Expected: build ผ่าน ไม่มี type error

- [ ] **Step 6: Commit**

```bash
git add components/Hero.tsx components/FinalCta.tsx components/Pricing.tsx .env.example
git commit -m "feat: wire course CTAs to /checkout + document payment env"
```

---

## หมายเหตุการ deploy (ทำหลัง implement ครบ)

- ใส่ env ทั้งหมดใน Vercel (Production + Preview): Stripe live keys, Meta, LINE, `SUPABASE_SERVICE_ROLE_KEY`
- ตั้ง Stripe webhook endpoint ที่ `https://bestsolutionskill.com/api/stripe/webhook` (event: `checkout.session.completed`, `checkout.session.async_payment_succeeded`) แล้วเอา signing secret ใส่ `STRIPE_WEBHOOK_SECRET` ของ production
- เปิด PromptPay ใน Stripe Dashboard
- สลับจาก test → live keys เมื่อทดสอบครบ
</content>
</invoke>
