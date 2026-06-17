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
