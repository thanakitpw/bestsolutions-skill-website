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
    ui_mode: "embedded_page",
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
