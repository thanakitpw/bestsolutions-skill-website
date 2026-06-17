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

  const eventId = order?.eventId ?? session.metadata?.event_id;
  const amountBaht = (order?.amountTotal ?? session.amount_total ?? 0) / 100;

  return (
    <>
      <SiteNavbar />
      <main className="container checkout-page">
        {eventId && (
          <PixelPurchase
            eventId={eventId}
            value={amountBaht}
            currency="THB"
          />
        )}
        <div className="coming-soon">
          <h1>ขอบคุณสำหรับการสมัคร 🎉</h1>
          <p>เราได้รับการชำระเงินเรียบร้อยแล้ว</p>
          {order && (
            <p className="text-dim">
              {order.plan} ×{order.quantity} — {amountBaht.toLocaleString("th-TH")} บาท
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
