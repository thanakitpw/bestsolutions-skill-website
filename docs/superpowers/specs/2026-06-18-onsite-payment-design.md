# ระบบจ่ายเงินบนเว็บ + เก็บ Purchase Conversion — Design

วันที่: 2026-06-18
สถานะ: รออนุมัติ spec → ทำแผน implement

## 1. เป้าหมาย (Goal)

เปิดให้ลูกค้า **ซื้อคอร์สและจ่ายเงินบนเว็บได้จริง** เพื่อ:

1. รองรับการยิงแอด Facebook แล้วเก็บ **Purchase conversion** ได้แม่นยำ (ให้ algorithm optimize หาคนที่จ่ายจริง)
2. แทนที่ flow เดิมที่ทุกปุ่มวิ่งไป LINE แล้วปิดการขาย/รับเงินด้วยมือ

**ตัวชี้วัดความสำเร็จ:** ลูกค้าจ่ายเงินสำเร็จบนเว็บ → เห็นเหตุการณ์ Purchase ใน Meta Events Manager (ทั้งจาก Pixel และ CAPI, dedupe เป็น 1 รายการ) → ออร์เดอร์ถูกบันทึกใน Supabase → แอดมินได้รับแจ้งทาง LINE

## 2. ขอบเขต (Scope)

**อยู่ในขอบเขต (v1):**
- ขายได้ทุก tier: Early Bird (เดี่ยว 2,990), Group (คนละ 2,590, ตั้งแต่ 2 คน), Private (6,990)
- จ่ายผ่าน Stripe — PromptPay QR + บัตรเครดิต/เดบิต
- เก็บ Purchase conversion: Meta Pixel (client) + Conversions API (server), dedupe ด้วย `event_id`
- บันทึกออร์เดอร์ลง Supabase
- หน้า Thank-you + ปุ่มต่อ LINE
- แจ้งแอดมินทุกออร์เดอร์ที่จ่ายสำเร็จ ผ่าน **LINE Messaging API** (push เข้า LINE Official Account)

**นอกขอบเขต (ไว้ phase ถัดไป):**
- หน้า admin ดูรายการออร์เดอร์ในเว็บ (ช่วงแรกดูใน Supabase dashboard)
- อีเมลยืนยันถึงลูกค้า
- ระบบ login / บัญชีผู้เรียน / ส่งมอบเนื้อหาดิจิทัล (คอร์สเป็นสอนสด ติดต่อกลับทาง LINE)
- คูปอง/ส่วนลด, ใบกำกับภาษี, refund อัตโนมัติ

## 3. Stack ปัจจุบัน (อ้างอิง)

- Next.js 15 App Router, React 19, deploy บน Vercel
- Supabase ต่อไว้แล้ว (`lib/supabase.ts`), migrations ที่ `supabase/migrations/`
- GA4 + GTM ต่อผ่าน env แล้ว (`components/Analytics.tsx`) — **ยังไม่มี Meta Pixel**
- ปุ่ม CTA ปัจจุบันวิ่งไป LINE `https://lin.ee/Q22m30X`

## 4. ทางเลือกที่เลือก (Decisions)

| เรื่อง | เลือก | เหตุผล |
|---|---|---|
| Provider | **Stripe** | รองรับ PromptPay + บัตรในไทย, DX/เอกสารดี, webhook แม่น |
| รูปแบบ integration | **Embedded Checkout** | Stripe จัดการ PCI/หน้าจ่ายเงิน, ฝัง iframe บนหน้าเรา ไม่เด้งออกนอกเว็บ, โค้ดน้อย |
| Tracking | **Pixel + CAPI** | ทนต่อ ad-blocker/iOS, conversion แม่นที่สุด, dedupe ด้วย `event_id` |
| Trigger Purchase | **เมื่อ server ยืนยันจ่ายจริง** | กัน conversion ปลอม ไม่ให้แอด optimize ผิดทาง |
| แจ้งแอดมิน | **LINE Messaging API** | push เข้า LINE OA ทันที (LINE Notify ปิดบริการ มี.ค. 2025) |

## 5. สถาปัตยกรรมและ flow

```
[Course/Pricing page]
   └─ ปุ่ม "สมัครเรียน" (ต่อ tier) → /checkout?plan=<id>
        │
        ▼
[/checkout]  เก็บ ชื่อ/อีเมล/เบอร์ (+จำนวนคน ถ้า group)
   │   ยิง Pixel: InitiateCheckout
   │   POST /api/checkout
   │      → สร้าง event_id
   │      → INSERT orders (status=pending)
   │      → สร้าง Stripe Checkout Session (embedded, metadata: order_id, plan, event_id)
   │      → คืน client_secret
   ▼
[Embedded Stripe Checkout]  จ่ายด้วย PromptPay QR / บัตร
   │
   ├──(redirect on complete)──► [/checkout/success?session_id=...]
   │                               server ตรวจ session ว่า paid จริง
   │                               ยิง Pixel: Purchase (พร้อม event_id)
   │                               แสดงสรุปออร์เดอร์ + ปุ่มต่อ LINE
   │
   └──(async)──► [POST /api/stripe/webhook]  event: checkout.session.completed
                    ตรวจลายเซ็น Stripe
                    ถ้า order ยัง != paid:
                      UPDATE orders SET status=paid, paid_at, payment_intent
                      ยิง Meta CAPI: Purchase (event_id เดียวกัน → Meta dedupe)
                      push LINE Messaging API แจ้งแอดมิน
```

## 6. Data model

Migration ใหม่: `supabase/migrations/0002_orders.sql`

ตาราง `orders`:

| คอลัมน์ | ชนิด | หมายเหตุ |
|---|---|---|
| `id` | uuid (pk, default gen_random_uuid) | order id |
| `plan` | text | `early-bird` \| `group` \| `private` |
| `quantity` | int | จำนวนคน (group ≥ 2, อื่น = 1) |
| `unit_amount` | int | ราคาต่อหน่วย (สตางค์, THB ×100) |
| `amount_total` | int | ยอดรวม (สตางค์) |
| `currency` | text | `thb` |
| `status` | text | `pending` \| `paid` \| `failed` |
| `buyer_name` | text | |
| `buyer_email` | text | |
| `buyer_phone` | text | |
| `event_id` | text | ใช้ dedupe Pixel↔CAPI |
| `stripe_session_id` | text | |
| `stripe_payment_intent` | text | nullable จนจ่ายเสร็จ |
| `created_at` | timestamptz default now() | |
| `paid_at` | timestamptz | nullable |

- RLS: เปิด RLS, **ไม่มี** policy ให้ anon — เขียน/อ่านผ่าน service role key ฝั่ง server เท่านั้น (ออร์เดอร์มีข้อมูลส่วนตัว ห้าม anon แตะ)
- index บน `stripe_session_id`, `status`

## 7. ส่วนประกอบ (units)

แต่ละไฟล์มีหน้าที่เดียว ทดสอบแยกได้:

- **`lib/plans.ts`** — แหล่งความจริงเดียวของ tier: `{ id, name, unitAmount, minQty, maxQty, mode }`. หน้าเว็บ/ราคา/checkout ดึงจากที่นี่ที่เดียว (ผูกกับ `components/Pricing.tsx` เดิมให้ราคาตรงกัน)
- **`lib/stripe.ts`** — สร้าง Stripe server client จาก `STRIPE_SECRET_KEY`
- **`lib/orders.ts`** — ฟังก์ชันแตะตาราง orders ด้วย Supabase service role (`createPendingOrder`, `markPaid`, `getBySessionId`) แยกจาก `lib/supabase.ts` เดิม (ตัวเดิมใช้ anon key สำหรับ public read)
- **`lib/meta.ts`** — Conversions API helper: hash (sha256) อีเมล/เบอร์, ส่ง Purchase event ไป Graph API (`META_PIXEL_ID`, `META_CAPI_TOKEN`)
- **`lib/notify.ts`** — `notifyAdminNewOrder(order)` push ข้อความผ่าน LINE Messaging API (`LINE_CHANNEL_ACCESS_TOKEN`, `LINE_ADMIN_TO`)
- **`app/api/checkout/route.ts`** — `POST`: validate input → `createPendingOrder` → สร้าง Stripe embedded session → คืน `clientSecret`
- **`app/api/stripe/webhook/route.ts`** — `POST`: ตรวจลายเซ็น → จัดการ `checkout.session.completed` แบบ idempotent → `markPaid` + CAPI + notify
- **`app/checkout/page.tsx`** — เลือก tier/จำนวน + ฟอร์มข้อมูลผู้ซื้อ + mount `<EmbeddedCheckout>`; ยิง `InitiateCheckout`
- **`app/checkout/success/page.tsx`** — server ตรวจ session paid → ยิง Pixel Purchase → สรุปออร์เดอร์ + ปุ่ม LINE
- **`components/MetaPixel.tsx`** — โหลด base Pixel ทั้งเว็บ (เพิ่มใน `app/layout.tsx` คู่กับ `Analytics`); เปิดเมื่อมี `NEXT_PUBLIC_META_PIXEL_ID`
- **อัปเดต CTA**: ปุ่ม "สมัคร" ใน `Hero`, `Pricing`, `FinalCta`, `FloatingContact` (เฉพาะปุ่มสมัคร ไม่ใช่ปุ่มสอบถาม) ชี้ไป `/checkout?plan=...`

## 8. สัญญา API (contracts)

**`POST /api/checkout`**
- request: `{ plan: string, quantity: number, name: string, email: string, phone: string }`
- ทำงาน: validate plan/quantity ตาม `lib/plans.ts` (กันยิงราคาปลอมจาก client — ราคาคำนวณฝั่ง server เท่านั้น) → สร้าง order pending → Stripe session
- response: `{ clientSecret: string }` หรือ `{ error }` (400/500)

**`POST /api/stripe/webhook`**
- verify ด้วย `STRIPE_WEBHOOK_SECRET`
- จัดการ `checkout.session.completed`: ดึง `order_id`/`event_id` จาก metadata → ถ้า order ยัง != paid → markPaid → CAPI Purchase → notify LINE
- ตอบ 200 เสมอเมื่อรับเรื่องสำเร็จ (กัน Stripe retry ซ้ำ); ทุก side-effect idempotent

## 9. Error handling

- **ลายเซ็น webhook ผิด** → 400, ไม่แตะ DB
- **Stripe retry** → idempotent ด้วยการเช็ค `status != paid` ก่อนทำ side-effect → ไม่ยิง CAPI/LINE ซ้ำ
- **CAPI หรือ LINE ล้ม** → log error แต่ไม่ทำให้ webhook fail (จ่ายเงินสำเร็จแล้ว ห้ามให้ Stripe retry รัวเพราะ notify ล้ม); markPaid ต้องสำเร็จก่อนเป็นหลัก
- **conversion ปลอม** → Pixel ยิง Purchase เฉพาะเมื่อ success page ตรวจกับ server แล้วว่า session `payment_status = paid`
- **ราคาถูกแก้จาก client** → backend ใช้ราคาจาก `lib/plans.ts` เท่านั้น ไม่เชื่อ amount จาก request
- **order pending ที่ไม่จ่าย** → คาไว้ status pending (ไม่ยิง conversion) — cleanup เป็นงาน phase ถัดไป

## 10. Tracking / dedupe

- สร้าง `event_id` (uuid) ตอนสร้าง session → เก็บใน order + ใส่ใน session metadata
- **Pixel Purchase** (success page) ใช้ `eventID = event_id`
- **CAPI Purchase** (webhook) ใช้ `event_id` เดียวกัน + `event_name=Purchase`, `value`, `currency=THB`, hash อีเมล/เบอร์เป็น user_data
- Meta จับคู่ dedupe เหลือ 1 conversion
- เพิ่ม `InitiateCheckout` ตอนเข้าหน้า checkout เพื่อช่วยแอดเรียนรู้ funnel (optional แต่แนะนำ)

## 11. Environment variables (เพิ่มใหม่)

| ตัวแปร | ใช้ที่ | หมายเหตุ |
|---|---|---|
| `STRIPE_SECRET_KEY` | server | |
| `STRIPE_WEBHOOK_SECRET` | server | จาก Stripe dashboard / CLI |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | client | embedded checkout |
| `NEXT_PUBLIC_META_PIXEL_ID` | client | base Pixel + eventID |
| `META_PIXEL_ID` | server | CAPI |
| `META_CAPI_TOKEN` | server | Conversions API access token |
| `LINE_CHANNEL_ACCESS_TOKEN` | server | LINE Messaging API (Long-lived/channel token จาก LINE OA) |
| `LINE_ADMIN_TO` | server | userId/groupId ปลายทางที่จะ push แจ้งแอดมิน |
| `SUPABASE_SERVICE_ROLE_KEY` | server | เขียน orders แบบข้าม RLS (เก็บเป็น secret เท่านั้น) |

ทุกฟีเจอร์ behind env: ถ้าไม่มี key ที่เกี่ยว ให้ degrade อย่างปลอดภัย (เช่น ไม่มี Pixel ID ก็ไม่โหลด Pixel) เพื่อ deploy ได้ก่อนตั้งค่าครบ

## 12. การทดสอบ

- **Stripe test mode**: บัตรทดสอบ + PromptPay test, ใช้ Stripe CLI (`stripe listen`) ยิง webhook เข้า local
- **Meta**: Events Manager → Test Events ตรวจว่า Purchase เข้าครบทั้ง Pixel + CAPI และ dedupe เหลือ 1
- **Idempotency**: ยิง webhook ซ้ำด้วย event เดิม → ต้องไม่เกิด order ซ้ำ / ไม่ push LINE ซ้ำ
- **ราคา**: ส่ง amount ปลอมจาก client → backend ต้องไม่สนใจ ใช้ราคาจาก plans
- **degrade**: ลบ env Pixel/LINE → เว็บยังจ่ายเงินได้ ไม่ crash

## 13. ความเสี่ยง / ข้อควรระวัง

- Stripe ต้องสมัครด้วยเอกสารธุรกิจ และเปิดใช้ PromptPay ใน dashboard ก่อน
- LINE OA ต้องเปิด Messaging API channel + เอา channel access token + รู้ปลายทาง (userId/groupId) ที่จะ push
- ต้องตั้ง Meta Pixel + สร้าง CAPI access token ใน Events Manager
- `SUPABASE_SERVICE_ROLE_KEY` ห้ามหลุดฝั่ง client เด็ดขาด
