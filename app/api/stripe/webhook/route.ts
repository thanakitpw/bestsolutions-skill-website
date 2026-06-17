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
