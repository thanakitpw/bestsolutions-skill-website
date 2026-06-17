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

  try {
    const res = await fetch(
      `https://graph.facebook.com/${GRAPH_VERSION}/${pixelId}/events`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(body),
      }
    );
    if (!res.ok) {
      console.error("Meta CAPI error", res.status, await res.text());
    }
  } catch (err) {
    console.error("Meta CAPI network error", err);
  }
}
