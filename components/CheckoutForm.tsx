"use client";

import { useCallback, useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { PLANS, type PlanId } from "@/lib/plans";

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
// อย่าเรียก loadStripe("") เพราะ Stripe จะ throw ทั้งหน้า — มี key ค่อยสร้าง promise
const stripePromise = PUBLISHABLE_KEY ? loadStripe(PUBLISHABLE_KEY) : null;

// รายละเอียดคอร์ส (ทุก tier เป็นคอร์สเดียวกัน) — ใช้แสดงในสรุปคำสั่งซื้อ
const COURSE = {
  title: "Vibe Code Website Bootcamp",
  tag: "เรียนสด 2 วัน",
  schedule: "27–28 มิ.ย. 2026 · เสาร์–อาทิตย์",
  bullets: [
    "เรียนสด 2 วัน รวม 10 ชั่วโมง",
    "ใช้ AI ช่วยออกแบบ เขียนโค้ด และแก้ Error",
    "ติดตั้ง Tracking และ Deploy เว็บออนไลน์จริง",
  ],
};
const TIER_LABEL: Record<PlanId, string> = {
  "early-bird": "Early Bird",
  group: "Group Class (ต่อคน)",
  private: "Private Class",
};
// ราคาเต็มต่อคน (บาท) สำหรับโชว์ขีดฆ่า — มีเฉพาะบางแพ็กเกจ
const TIER_WAS: Partial<Record<PlanId, number>> = { "early-bird": 4990 };

function baht(n: number) {
  return "฿" + n.toLocaleString("th-TH");
}

export function CheckoutForm({ plan }: { plan: PlanId }) {
  const def = PLANS[plan];
  const [quantity, setQuantity] = useState(def.minQty);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [started, setStarted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const buyerRef = useRef({ name, email, phone, quantity });
  if (!started) buyerRef.current = { name, email, phone, quantity };

  const fetchClientSecret = useCallback(async () => {
    const b = buyerRef.current;
    const res = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ plan, quantity: b.quantity, name: b.name, email: b.email, phone: b.phone }),
    });
    const text = await res.text();
    let data: { clientSecret?: string; error?: string } = {};
    try {
      data = text ? JSON.parse(text) : {};
    } catch {
      throw new Error(`HTTP ${res.status}`);
    }
    if (!res.ok) throw new Error(data.error ?? `HTTP ${res.status}`);
    if (!data.clientSecret) throw new Error("no client secret");
    return data.clientSecret;
  }, [plan]);

  function start() {
    setError(null);
    if (!stripePromise) {
      setError("ระบบชำระเงินยังไม่พร้อมใช้งาน กรุณาติดต่อทีมงานทาง LINE");
      return;
    }
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

  const unit = def.unitAmount / 100;
  const total = unit * quantity;
  const was = TIER_WAS[plan];

  return (
    <div className="checkout-grid">
      <section className="checkout-card checkout-main">
        {started ? (
          <>
            <button type="button" className="checkout-back" onClick={() => setStarted(false)}>
              ← กลับไปแก้ข้อมูล
            </button>
            <div className="checkout-embed">
              <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret }}>
                <EmbeddedCheckout />
              </EmbeddedCheckoutProvider>
            </div>
          </>
        ) : (
          <>
            <div className="checkout-head">
              <h1>ข้อมูลผู้สมัคร</h1>
              <p>กรอกข้อมูลเพื่อออกใบเสร็จและให้ทีมงานติดต่อกลับ</p>
            </div>
            <div className="checkout-form">
              {def.maxQty > 1 && (
                <div className="checkout-field">
                  <label htmlFor="qty">จำนวนผู้เรียน</label>
                  <input
                    id="qty"
                    type="number"
                    min={def.minQty}
                    max={def.maxQty}
                    value={quantity}
                    onChange={(e) => {
                      const v = Number(e.target.value);
                      if (Number.isNaN(v)) return setQuantity(def.minQty);
                      setQuantity(Math.min(def.maxQty, Math.max(def.minQty, Math.floor(v))));
                    }}
                  />
                </div>
              )}
              <div className="checkout-field">
                <label htmlFor="name">ชื่อ-นามสกุล</label>
                <input id="name" value={name} onChange={(e) => setName(e.target.value)} placeholder="เช่น ธนกฤต ชายทอง" />
              </div>
              <div className="checkout-field">
                <label htmlFor="email">อีเมล</label>
                <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@email.com" />
              </div>
              <div className="checkout-field">
                <label htmlFor="phone">เบอร์โทร</label>
                <input id="phone" inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="08x-xxx-xxxx" />
              </div>
              {error && <p className="checkout-error">{error}</p>}
              <button className="btn btn-primary btn-block-sm" onClick={start}>
                ดำเนินการชำระเงิน · {baht(total)}
              </button>
            </div>
          </>
        )}
      </section>

      <aside className="checkout-card checkout-summary">
        <span className="pill">
          <span className="dot" /> {COURSE.tag}
        </span>
        <div>
          <h2 className="summary-title">{COURSE.title}</h2>
          <p className="summary-tier">{TIER_LABEL[plan]}</p>
        </div>
        <p className="summary-meta">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18" />
          </svg>
          {COURSE.schedule}
        </p>

        <div className="summary-divider" />

        <div className="summary-row">
          <span>{plan === "group" ? "ราคา / คน" : "ราคาคอร์ส"}</span>
          <span>
            {baht(unit)}
            {quantity > 1 ? ` × ${quantity}` : ""}
          </span>
        </div>
        <div className="summary-total">
          <span>รวมทั้งสิ้น</span>
          <span>
            <b className="g-text">{baht(total)}</b>
            {was ? <s>{baht(was * quantity)}</s> : null}
          </span>
        </div>

        <div className="summary-divider" />

        <ul className="check-list summary-list">
          {COURSE.bullets.map((b, i) => (
            <li key={i}>
              <span className="ck">✓</span> {b}
            </li>
          ))}
        </ul>

        <div className="summary-secure">
          <span aria-hidden="true">🔒</span>
          <span>
            ชำระเงินปลอดภัยผ่าน Stripe (บัตรเครดิต/เดบิต และ PromptPay)
            <br />
            ทีมงานจะติดต่อกลับทาง LINE หลังได้รับการชำระเงิน
          </span>
        </div>
      </aside>
    </div>
  );
}
