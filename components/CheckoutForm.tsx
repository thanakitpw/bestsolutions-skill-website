"use client";

import { useCallback, useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { EmbeddedCheckoutProvider, EmbeddedCheckout } from "@stripe/react-stripe-js";
import { PLANS, type PlanId } from "@/lib/plans";

const PUBLISHABLE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
// อย่าเรียก loadStripe("") เพราะ Stripe จะ throw ทั้งหน้า — มี key ค่อยสร้าง promise
const stripePromise = PUBLISHABLE_KEY ? loadStripe(PUBLISHABLE_KEY) : null;

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
