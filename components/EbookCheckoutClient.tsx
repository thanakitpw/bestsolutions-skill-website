"use client";

import { useState } from "react";
import type { Ebook } from "./home/ebooks";
import { EbookCover } from "./home/EbookCover";
import { CopyButton } from "./CopyButton";
import { PAYMENT } from "@/lib/payment";

// ตัวเลือกเสริม (upsell) — ประชุมส่วนตัวสอนแบบจับมือทำ
const ADDON = {
  title: "ประชุมออนไลน์ถามตอบแบบส่วนตัว",
  desc: "สอนแบบจับมือทำ ตัวต่อตัวผ่าน Zoom",
  meta: "1 ชั่วโมง · นัดเวลาได้",
  price: 500,
};

const baht = (n: number) => "฿" + n.toLocaleString("th-TH");

export function EbookCheckoutClient({
  ebook,
  slug,
  amount,
  was,
}: {
  ebook: Ebook;
  slug: string;
  amount: number;
  was: number | null;
}) {
  const [addon, setAddon] = useState(false);
  const total = amount + (addon ? ADDON.price : 0);

  return (
    <div className="checkout-grid">
      {/* ซ้าย — วิธีชำระเงิน */}
      <section className="checkout-card checkout-main">
        <a className="checkout-back" href={`/ebooks/${slug}`}>
          ← กลับไปหน้ารายละเอียด
        </a>
        <div className="checkout-head">
          <h1>ชำระเงิน</h1>
          <p>โอนเงินตามบัญชีด้านล่าง แล้วส่งสลิปทาง LINE รับไฟล์ทันทีหลังยืนยัน</p>
        </div>

        {/* ตัวเลือกเสริม */}
        <div className="addon">
          <span className="addon-label text-dim">เพิ่มได้ (ไม่บังคับ)</span>
          <button
            type="button"
            className={`addon-card${addon ? " is-on" : ""}`}
            onClick={() => setAddon((v) => !v)}
            aria-pressed={addon}
          >
            <span className="addon-check" aria-hidden="true">
              {addon ? "✓" : ""}
            </span>
            <span className="addon-body">
              <span className="addon-title">{ADDON.title}</span>
              <span className="addon-desc">{ADDON.desc}</span>
              <span className="addon-meta">{ADDON.meta}</span>
            </span>
            <span className="addon-price g-text">+{baht(ADDON.price)}</span>
          </button>
        </div>

        <ol className="pay-steps">
          <li>
            <span className="pay-step-no">1</span>
            <span>โอนเงิน {baht(total)} เข้าบัญชีด้านล่าง</span>
          </li>
          <li>
            <span className="pay-step-no">2</span>
            <span>แคปหน้าจอสลิปการโอนไว้</span>
          </li>
          <li>
            <span className="pay-step-no">3</span>
            <span>
              กดปุ่มแอดไลน์ แล้วส่งสลิปในแชท
              {addon ? " พร้อมนัดเวลาประชุมส่วนตัว" : ""}
            </span>
          </li>
          <li>
            <span className="pay-step-no">4</span>
            <span>รับไฟล์ E-book ทาง LINE ทันทีหลังยืนยัน</span>
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
            <b className="g-text">{baht(total)}</b>
          </div>
        </div>

        <a
          className="btn btn-primary checkout-line-btn"
          href={PAYMENT.lineUrl}
          target="_blank"
          rel="noopener noreferrer"
          data-cta="line"
        >
          แอดไลน์เพื่อส่งสลิป →
        </a>
        <p className="checkout-line-note text-dim">
          หลังกดปุ่มจะพาไปที่ LINE — ส่งสลิปในแชทได้เลย ทีมงานยืนยันแล้วส่งไฟล์ให้ทันที
        </p>
      </section>

      {/* ขวา — สรุปคำสั่งซื้อ */}
      <aside className="checkout-card checkout-summary">
        <div className="summary-ebook">
          <EbookCover ebook={ebook} className="summary-ebook-cover" />
          <div>
            <span className="pill">
              <span className="dot" /> {ebook.tag}
            </span>
            <h2 className="summary-title">{ebook.title}</h2>
          </div>
        </div>

        <div className="summary-divider" />

        <div className="summary-row">
          <span>ราคา E-book</span>
          <span>{baht(amount)}</span>
        </div>
        {addon ? (
          <div className="summary-row">
            <span>{ADDON.title} ({ADDON.meta})</span>
            <span>{baht(ADDON.price)}</span>
          </div>
        ) : null}
        <div className="summary-total">
          <span>รวมทั้งสิ้น</span>
          <span>
            <b className="g-text">{baht(total)}</b>
            {!addon && was ? <s>{baht(was)}</s> : null}
          </span>
        </div>

        <div className="summary-divider" />

        <ul className="check-list summary-list">
          {ebook.bullets.map((b, i) => (
            <li key={i}>
              <span className="ck">✓</span> {b}
            </li>
          ))}
          {addon ? (
            <li>
              <span className="ck">✓</span> ประชุมส่วนตัว 1 ชั่วโมง (นัดเวลาได้)
            </li>
          ) : null}
        </ul>

        <div className="summary-secure">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span>
            ส่งไฟล์ทาง LINE หลังยืนยันการชำระเงิน
            <br />
            มีทีมงานดูแลและกลุ่มถาม-ตอบหลังซื้อ
          </span>
        </div>
      </aside>
    </div>
  );
}
