import { redirect } from "next/navigation";
import { getStripe } from "@/lib/stripe";
import { getOrderBySessionId } from "@/lib/orders";
import { PLANS } from "@/lib/plans";
import { PixelPurchase } from "@/components/PixelPurchase";
import { SiteNavbar } from "@/components/SiteNavbar";
import { Footer } from "@/components/Footer";

export const dynamic = "force-dynamic";

export const metadata = { title: "ชำระเงินสำเร็จ | Best Solutions Skill" };

const LEARN = [
  "เรียนสด 2 วัน รวม 10 ชั่วโมง (27–28 มิ.ย. 2026 · เสาร์–อาทิตย์)",
  "ใช้ AI ช่วยออกแบบ เขียนโค้ด และแก้ Error ตั้งแต่ศูนย์",
  "ขึ้น Next.js ติดตั้ง Tracking และ Deploy เว็บออนไลน์จริง",
  "ได้เว็บเป็น Portfolio ต่อยอดสมัครงาน รับงาน หรือสร้างรายได้",
];

const STEPS = [
  "ทีมงานจะติดต่อกลับทาง LINE ภายใน 24 ชั่วโมง",
  "ยืนยันรายละเอียดและส่งลิงก์เข้ากลุ่มเรียน",
  "รับคำแนะนำการเตรียมเครื่องมือก่อนถึงวันเรียน",
];

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
  const planName = order ? (PLANS[order.plan]?.name ?? order.plan) : null;

  return (
    <>
      <SiteNavbar />
      <main className="container checkout-page">
        {eventId && <PixelPurchase eventId={eventId} value={amountBaht} currency="THB" />}

        <div className="success-wrap">
          <header className="success-hero">
            <span className="pill">
              <span className="dot" /> ชำระเงินสำเร็จ
            </span>
            <h1>ขอบคุณสำหรับการสมัคร</h1>
            <p>
              เราได้รับการชำระเงินของคุณเรียบร้อยแล้ว และจองที่นั่งในคอร์สให้คุณเรียบร้อย
            </p>
          </header>

          {order && (
            <section className="checkout-card">
              <h2 className="success-h">รายละเอียดคำสั่งซื้อ</h2>
              <div className="success-rows">
                <div className="success-row">
                  <span>แพ็กเกจ</span>
                  <span>{planName}</span>
                </div>
                <div className="success-row">
                  <span>จำนวนผู้เรียน</span>
                  <span>{order.quantity} ท่าน</span>
                </div>
                <div className="success-row">
                  <span>ยอดชำระ</span>
                  <span className="g-text" style={{ fontWeight: 700 }}>
                    ฿{amountBaht.toLocaleString("th-TH")}
                  </span>
                </div>
                <div className="success-row">
                  <span>อีเมล</span>
                  <span>{order.buyerEmail}</span>
                </div>
                <div className="success-row">
                  <span>เลขคำสั่งซื้อ</span>
                  <span className="text-mute">{order.id.slice(0, 8).toUpperCase()}</span>
                </div>
              </div>
            </section>
          )}

          <section className="checkout-card">
            <h2 className="success-h">ขั้นตอนถัดไป</h2>
            <ol className="success-steps">
              {STEPS.map((s, i) => (
                <li key={i} className="success-step">
                  <span className="num">{i + 1}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ol>
          </section>

          <section className="checkout-card">
            <h2 className="success-h">สิ่งที่คุณจะได้ในคอร์สนี้</h2>
            <ul className="check-list summary-list">
              {LEARN.map((b, i) => (
                <li key={i}>
                  <span className="ck">✓</span> {b}
                </li>
              ))}
            </ul>
          </section>

          <div className="success-cta">
            <a
              className="btn btn-primary"
              href="https://lin.ee/Q22m30X"
              target="_blank"
              rel="noopener noreferrer"
              data-cta="line"
            >
              เพิ่มเพื่อน LINE เพื่อยืนยันสิทธิ์
            </a>
            <a className="btn btn-outline" href="/courses">
              ดูคอร์สทั้งหมด
            </a>
          </div>

          <p className="success-note">
            หากไม่ได้รับการติดต่อภายใน 24 ชั่วโมง ทักหาเราทาง LINE ได้ทันที หรือโทร 095-385-4906
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
