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
