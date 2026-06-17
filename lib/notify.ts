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

  try {
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
  } catch (err) {
    console.error("LINE push network error", err);
  }
}
