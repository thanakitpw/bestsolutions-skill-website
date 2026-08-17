import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { SiteNavbar } from "@/components/SiteNavbar";
import { CopyButton } from "@/components/CopyButton";
import { CheckCircle } from "@/components/icons";
import { PAYMENT } from "@/lib/payment";

const COURSE = {
  title: "Website Shortcut",
  tag: "คลาสสด 2 ชั่วโมง",
  price: 990,
  bullets: [
    "เรียนสด 2 ชั่วโมงแบบจับมือทำ",
    "ช่วยวางโครงหน้าเว็บและข้อความสำคัญ",
    "มีการบ้านให้ทำคนละ 1 โปรเจกต์",
    "ตรวจงานและให้คำแนะนำหลังเรียน",
    "นัดคิวเรียนผ่าน LINE หลังส่งสลิป",
  ],
};

const baht = (n: number) => "฿" + n.toLocaleString("th-TH");

export const metadata: Metadata = {
  title: "ชำระเงิน · Website Shortcut | Best Solutions Skill",
  robots: { index: false, follow: false },
};

export default function WebsiteShortcutCheckoutPage() {
  return (
    <>
      <SiteNavbar />
      <main className="container checkout-page">
        <div className="checkout-grid">
          <section className="checkout-card checkout-main">
            <a className="checkout-back" href="/courses/website-shortcut">
              ← กลับไปหน้า Website Shortcut
            </a>
            <div className="checkout-head">
              <h1>ชำระเงิน Website Shortcut</h1>
              <p>
                โอนเงินตามบัญชีด้านล่าง แล้วแอด LINE เพื่อส่งสลิปและนัดคิวเรียน
              </p>
            </div>

            <ol className="pay-steps">
              <li>
                <span className="pay-step-no">1</span>
                <span>โอนเงิน {baht(COURSE.price)} เข้าบัญชีด้านล่าง</span>
              </li>
              <li>
                <span className="pay-step-no">2</span>
                <span>แคปหน้าจอสลิปการโอนไว้</span>
              </li>
              <li>
                <span className="pay-step-no">3</span>
                <span>กดปุ่มแอด LINE แล้วส่งสลิป พร้อมแจ้งชื่อและเบอร์ติดต่อ</span>
              </li>
              <li>
                <span className="pay-step-no">4</span>
                <span>ทีมงานยืนยันยอดและนัดคิวเรียน Website Shortcut ให้คุณ</span>
              </li>
            </ol>

            <div className="pay-account">
              <div className="pay-bank-row">
                {PAYMENT.bankLogo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img className="pay-bank-logo" src={PAYMENT.bankLogo} alt={PAYMENT.bankName} />
                ) : null}
                <div className="pay-bank-meta">
                  <span className="pay-acct-label text-dim">โอนเข้าบัญชี</span>
                  <span className="pay-bank">{PAYMENT.bankName}</span>
                </div>
              </div>
              <div className="pay-acct-num-row">
                <span className="pay-acct-num">{PAYMENT.accountNumber}</span>
                <CopyButton value={PAYMENT.accountNumber} className="pay-copy" />
              </div>
              <div className="pay-acct-name text-dim">ชื่อบัญชี: {PAYMENT.accountName}</div>
              {PAYMENT.promptpay ? (
                <div className="pay-acct-name text-dim">พร้อมเพย์: {PAYMENT.promptpay}</div>
              ) : null}
              <div className="pay-amount">
                <span className="text-dim">ยอดที่ต้องโอน</span>
                <b className="g-text">{baht(COURSE.price)}</b>
              </div>
            </div>

            <a
              className="btn btn-primary checkout-line-btn"
              href={PAYMENT.lineUrl}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="line"
            >
              แอดไลน์เพื่อส่งสลิปและนัดคิวเรียน →
            </a>
            <p className="checkout-line-note text-dim">
              หลังส่งสลิป ทีมงานจะยืนยันยอด แจ้งรอบเรียนที่ว่าง และส่งรายละเอียดการเตรียมตัวก่อนคลาส
            </p>
          </section>

          <aside className="checkout-card checkout-summary">
            <span className="pill">
              <span className="dot" /> {COURSE.tag}
            </span>
            <div>
              <h2 className="summary-title">{COURSE.title}</h2>
              <p className="summary-tier">คอร์สทำเว็บไซต์แบบ Shortcut</p>
            </div>
            <p className="summary-meta">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <circle cx="12" cy="12" r="9" />
                <path d="M12 7v5l3 2" />
              </svg>
              นัดวันและเวลาผ่าน LINE หลังส่งสลิป
            </p>

            <div className="summary-divider" />

            <div className="summary-row">
              <span>ราคาคอร์ส</span>
              <span>{baht(COURSE.price)}</span>
            </div>
            <div className="summary-total">
              <span>รวมทั้งสิ้น</span>
              <span>
                <b className="g-text">{baht(COURSE.price)}</b>
              </span>
            </div>

            <div className="summary-divider" />

            <ul className="check-list summary-list">
              {COURSE.bullets.map((b, i) => (
                <li key={i}>
                  <span className="ck" aria-hidden="true">
                    <CheckCircle />
                  </span>
                  {b}
                </li>
              ))}
            </ul>

            <div className="summary-secure">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="11" width="18" height="11" rx="2" />
                <path d="M7 11V7a5 5 0 0 1 10 0v4" />
              </svg>
              <span>
                ส่งสลิปทาง LINE เพื่อยืนยันการชำระเงิน
                <br />
                ทีมงานจะนัดคิวเรียนและตรวจการบ้าน 1 โปรเจกต์หลังเรียน
              </span>
            </div>
          </aside>
        </div>
      </main>
      <Footer />
    </>
  );
}
