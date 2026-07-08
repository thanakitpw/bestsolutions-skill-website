import type { Ebook } from "./ebooks";
import { EbookCover } from "./EbookCover";
import { Icon } from "../Icon";

// หน้าแจกฟรี E-book (lead magnet) — โครงคล้ายหน้าขาย flagship แต่ตัดเรื่องราคา/urgency ออก
// CTA หลักทุกจุด = ปุ่มดาวน์โหลด ลิงก์ไป Google Drive โดยตรง (เปิดแท็บใหม่)
// ยกเนื้อหาบางส่วนมาจากหน้า /ebooks/start-business-ai-30-days แล้วปรับ copy ให้เป็นของแจกฟรี

// ลิงก์ไฟล์ดาวน์โหลดบน Google Drive
const DOWNLOAD_URL =
  "https://drive.google.com/file/d/1Oo64-A5vG8aJzIyt1GSTbS3Dv3ctw9EE/view?usp=sharing";

const heroBullets: string[] = [
  "รวมพื้นฐานการเริ่มต้นทำธุรกิจด้วย AI ไว้ในไฟล์เดียว อ่านจบเห็นภาพรวมทั้งเส้นทาง",
  "เหมาะกับคนเริ่มจากศูนย์ ไม่ต้องมีพื้นฐานเทคนิคหรือทุนก้อนใหญ่",
  "ดาวน์โหลดได้ทันที ฟรี ไม่มีค่าใช้จ่าย ไม่ต้องกรอกบัตร",
];

const pains: string[] = [
  "อยากเริ่มธุรกิจมานาน แต่ยังจับต้นชนปลายไม่ถูก",
  "คิดว่าต้องมีทุนเยอะ มีทีม หรือมีความรู้เทคนิคก่อนถึงจะเริ่มได้",
  "เห็นคนอื่นใช้ AI แล้วอยากใช้บ้าง แต่พอเปิดมาแล้วไม่รู้จะสั่งอย่างไร",
];

// ภาพรวมเส้นทาง 4 ช่วง ที่คู่มือฉบับนี้พาไปทำความรู้จัก (ยกโครงมาจากแผน 30 วัน)
const inside: { no: number; title: string; desc: string }[] = [
  {
    no: 1,
    title: "วางฐานให้พร้อมขาย",
    desc: "หาไอเดียที่เหมาะกับตัวเอง ปั้นสินค้าแรก ตั้งราคา และเปิดหน้าร้านออนไลน์ด้วย AI",
  },
  {
    no: 2,
    title: "หาลูกค้ากลุ่มแรก",
    desc: "วางระบบคอนเทนต์ทำครั้งเดียวลงได้หลายช่อง ตอบแชท และพาไปสู่ออเดอร์แรก",
  },
  {
    no: 3,
    title: "ให้คนหาเจอ",
    desc: "ตั้ง Google Business ปักหมุด Maps เขียนบทความให้ถูกค้นเจอ และทดสอบโฆษณางบเล็ก",
  },
  {
    no: 4,
    title: "จัดระบบให้ทำซ้ำได้",
    desc: "วาง automation งานซ้ำ ขายซ้ำ เก็บรายชื่อลูกค้า และวางแผนต่อเนื่องหลังเริ่มขาย",
  },
];

const outcomes: string[] = [
  "เห็นภาพรวมทั้งเส้นทางว่าการเริ่มธุรกิจด้วย AI ต้องผ่านอะไรบ้าง",
  "รู้ว่าจะเริ่มลงมือทำจากตรงไหนในวันแรก โดยไม่ต้องเดา",
  "เข้าใจว่า AI เข้ามาช่วยลดเวลาและต้นทุนในแต่ละขั้นตอนอย่างไร",
  "มีแนวคิดตั้งต้นที่นำไปต่อยอดเป็นแผนลงมือทำของตัวเองได้",
];

const faqs: { id: string; q: string; a: string }[] = [
  {
    id: "free-faq-1",
    q: "ต้องเสียเงินไหม?",
    a: "ไม่เสีย ไฟล์นี้แจกฟรี กดปุ่มดาวน์โหลดแล้วเปิดอ่านได้ทันที ไม่ต้องกรอกบัตรหรือชำระเงินใดๆ",
  },
  {
    id: "free-faq-2",
    q: "ไม่มีพื้นฐานเทคนิคเลย อ่านรู้เรื่องไหม?",
    a: "อ่านรู้เรื่อง คู่มือฉบับนี้เขียนให้คนที่ไม่ใช่สายเทค อธิบายเป็นภาษาที่เข้าใจง่ายและเห็นภาพรวมก่อนลงรายละเอียด",
  },
  {
    id: "free-faq-3",
    q: "โหลดไฟล์ยังไง?",
    a: "กดปุ่ม “ดาวน์โหลดฟรี” ระบบจะพาไปที่ไฟล์บน Google Drive จากนั้นกดปุ่มดาวน์โหลดมุมขวาบนเพื่อบันทึกไฟล์ หรืออ่านบนเบราว์เซอร์ได้เลย",
  },
  {
    id: "free-faq-4",
    q: "อ่านฟรีจบแล้ว อยากได้แผนลงมือทำแบบละเอียดต่อได้ไหม?",
    a: "ได้ เรามีเล่มเต็ม “เริ่มต้นธุรกิจด้วย AI ใน 30 วัน” ที่ลงรายละเอียดทีละวัน พร้อมชุดพรอมต์ AI สำเร็จรูป ดูรายละเอียดได้ที่ปุ่มด้านล่าง",
  },
];

function DownloadButton({
  label = "ดาวน์โหลดฟรี",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  return (
    <a
      className={`btn btn-primary sp-cta-btn ${className}`.trim()}
      href={DOWNLOAD_URL}
      target="_blank"
      rel="noopener noreferrer"
      data-cta="ebook-free-download"
    >
      <Icon name="download" aria-hidden="true" /> {label}
    </a>
  );
}

export function EbookFreePage({ ebook }: { ebook: Ebook }) {
  const fullBookHref = "/ebooks/start-business-ai-30-days";
  return (
    <div className="ebook-sales">
      {/* 1 · HERO */}
      <section className="section sp-hero">
        <div className="container">
          <a className="ebook-back" href="/ebooks">
            ← กลับไปหน้ารวม E-book
          </a>
          <div className="sp-hero-row">
            <div className="sp-hero-copy js-reveal">
              <span className="eyebrow">E-book แจกฟรี · เริ่มต้นธุรกิจด้วย AI</span>
              <h1 className="sp-hero-title">
                คู่มือเริ่มต้นทำธุรกิจด้วย AI{" "}
                <span className="g-text">ฉบับแจกฟรี</span>
              </h1>
              <p className="sp-hero-sub">
                รวมพื้นฐานและภาพรวมทั้งเส้นทางของการเริ่มธุรกิจด้วย AI สำหรับคนเริ่มจากศูนย์
                อ่านจบแล้วรู้ว่าจะลงมือทำจากตรงไหน — ดาวน์โหลดได้ฟรี ไม่มีค่าใช้จ่าย
              </p>
              <ul className="check-list sp-hero-bullets">
                {heroBullets.map((b, i) => (
                  <li key={i}>
                    <span className="ck">✓</span> {b}
                  </li>
                ))}
              </ul>
              <span className="pill sp-hero-scarcity">
                <span className="dot" /> ฟรี 100% · ไฟล์ PDF · อ่านได้ทุกอุปกรณ์
              </span>
              <div className="sp-hero-buy">
                <DownloadButton label="ดาวน์โหลดฟรีทันที" />
              </div>
              <p className="sp-hero-note text-dim">
                ไม่ต้องกรอกบัตร ไม่ต้องชำระเงิน · กดแล้วเปิดไฟล์บน Google Drive ได้เลย
              </p>
            </div>
            <div className="sp-hero-media js-reveal">
              <EbookCover ebook={ebook} className="sp-hero-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 2 · PAIN — ทำไมควรอ่าน */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-head js-reveal">
            <span className="eyebrow">ถ้าคุณกำลังเป็นแบบนี้</span>
            <h2>
              อยากเริ่มธุรกิจ<span className="g-text">แต่ยังไม่ได้เริ่มสักที</span>
            </h2>
            <p>คู่มือฉบับนี้ทำมาเพื่อช่วยให้คุณเห็นทางและเริ่มก้าวแรกได้จริง</p>
          </div>
          <ul className="sp-pain-list js-reveal">
            {pains.map((p, i) => (
              <li key={i} className="sp-pain-item">
                <span className="sp-pain-mark" aria-hidden="true">
                  ✕
                </span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <p className="sp-pain-turn js-reveal">
            บ่อยครั้งปัญหาไม่ใช่คุณขาดไอเดีย แต่เป็นเพราะยังไม่มี{" "}
            <b className="g-text">ภาพรวมที่ชัดพอให้ลงมือทำ</b> — เริ่มจากอ่านเล่มฟรีเล่มนี้ก่อนได้เลย
          </p>
        </div>
      </section>

      {/* 3 · ในเล่มนี้มีอะไร */}
      <section className="section">
        <div className="container">
          <div className="section-head js-reveal">
            <span className="eyebrow">ในเล่มนี้มีอะไร</span>
            <h2>
              พาไปรู้จัก <span className="g-text">4 ช่วงของการเริ่มต้น</span>
            </h2>
            <p>เห็นภาพรวมทั้งเส้นทาง ตั้งแต่หาไอเดียไปจนถึงจัดระบบให้ทำซ้ำได้</p>
          </div>
          <div className="grid grid-4 sp-week-grid js-reveal">
            {inside.map((s) => (
              <div className="card sp-week-card" key={s.no}>
                <span className="sp-week-no">{s.no}</span>
                <h3 className="sp-week-title">{s.title}</h3>
                <span className="text-dim sp-week-range">{s.desc}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4 · อ่านจบแล้วคุณจะได้ */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-head js-reveal">
            <span className="eyebrow">อ่านจบแล้วคุณจะ</span>
            <h2>
              เห็นทางและ<span className="g-text">พร้อมลงมือก้าวแรก</span>
            </h2>
          </div>
          <div className="sp-outcomes card js-reveal">
            <ul className="check-list sp-outcomes-list">
              {outcomes.map((o, i) => (
                <li key={i}>
                  <span className="ck">✓</span> {o}
                </li>
              ))}
            </ul>
            <DownloadButton label="ดาวน์โหลดฟรี" />
          </div>
        </div>
      </section>

      {/* 5 · ผู้เขียน */}
      <section className="section">
        <div className="container">
          <div className="section-head js-reveal">
            <span className="eyebrow">ผู้เขียน</span>
            <h2>
              เขียนโดยคนทำ Agency จริง{" "}
              <span className="g-text">ประสบการณ์กว่า 8 ปี</span>
            </h2>
          </div>
          <div className="grid grid-2 instructor-grid js-reveal">
            <div>
              <div className="instructor-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/instructor.png"
                  alt="Thanakit Chaithong (Bank)"
                  width={1200}
                  height={1200}
                />
              </div>
              <div className="instructor-caption">
                <span className="instructor-name">Thanakit Chaithong (Bank)</span>
                <span className="instructor-role">
                  CEO &amp; Founder of Best Solution Skill
                </span>
              </div>
            </div>
            <div>
              <ul className="check-list instructor-points">
                <li>
                  <span className="ck">✓</span> มีประสบการณ์ทำเว็บไซต์และการตลาดออนไลน์ให้ธุรกิจจริง
                </li>
                <li>
                  <span className="ck">✓</span> เข้าใจทั้งมุม Design, Development และ Marketing
                </li>
                <li>
                  <span className="ck">✓</span> นำ AI มาใช้กับงานธุรกิจจริง ทั้งของตัวเองและลูกค้า
                </li>
                <li>
                  <span className="ck">✓</span> เน้นให้คนอ่านนำไปลงมือทำได้จริง ไม่ใช่แค่ทฤษฎี
                </li>
              </ul>
              <blockquote className="instructor-quote">
                “แอดมินทำ Agency รับทำเว็บไซต์และการตลาดออนไลน์มากว่า 8 ปี
                เล่มฟรีเล่มนี้ย่อภาพรวมของการเริ่มต้นธุรกิจด้วย AI
                ให้คนไม่มีพื้นเทคนิคอ่านแล้วเห็นทางและกล้าเริ่มก้าวแรก”
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 6 · FAQ */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-head js-reveal">
            <span className="eyebrow">FAQ</span>
            <h2>
              คำถาม<span className="g-text">ที่พบบ่อย</span>
            </h2>
          </div>
          <div className="accordion faq js-reveal" data-accordion data-single>
            {faqs.map((f) => (
              <div className="acc-item" key={f.id}>
                <h3 className="acc-h">
                  <button
                    className="acc-trigger"
                    aria-expanded="false"
                    aria-controls={f.id}
                  >
                    <span className="acc-name">{f.q}</span>
                    <span className="sign" aria-hidden="true">
                      +
                    </span>
                  </button>
                </h3>
                <div className="acc-panel" id={f.id} role="region">
                  <div className="acc-panel-inner">
                    <p>{f.a}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 7 · CROSS-SELL → เล่มเต็ม 30 วัน */}
      <section className="section">
        <div className="container">
          <div className="sp-guarantee card js-reveal">
            <Icon name="gift" className="sp-guarantee-icon" />
            <div>
              <h2>อยากได้แผนลงมือทำแบบละเอียดทีละวัน?</h2>
              <p>
                ถ้าอ่านเล่มฟรีแล้วอยากลงมือทำจริงแบบมีสเต็ปครบ เรามีเล่มเต็ม{" "}
                <b>“เริ่มต้นธุรกิจด้วย AI ใน 30 วัน”</b> ที่พาทำทีละวันตั้งแต่หาไอเดีย
                ปั้นสินค้า เปิดหน้าร้าน ไปจนถึงหาลูกค้ากลุ่มแรก พร้อมชุดพรอมต์ AI สำเร็จรูป
              </p>
              <p className="sp-final-price">
                <b className="g-text">{ebook.priceNow}</b>
                {ebook.priceWas ? <s className="text-dim">{ebook.priceWas}</s> : null}
              </p>
              <a className="btn btn-ghost sp-cta-btn" href={fullBookHref} data-cta="ebook-free-crosssell">
                ดูรายละเอียดเล่มเต็ม
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8 · FINAL DOWNLOAD CTA */}
      <section className="section section--alt" id="sp-buy">
        <div className="container">
          <div className="sp-final card js-reveal">
            <span className="pill sp-final-pill">
              <span className="dot" /> แจกฟรี · ดาวน์โหลดได้ทันที
            </span>
            <h2>
              เริ่มจากอ่านเล่มฟรีเล่มนี้ <span className="g-text">แล้วค่อยลงมือทำ</span>
            </h2>
            <p>
              ไฟล์ PDF อ่านได้ทุกอุปกรณ์ ไม่ต้องกรอกบัตร ไม่ต้องชำระเงิน
              กดปุ่มด้านล่างเพื่อเปิดและดาวน์โหลดจาก Google Drive ได้เลย
            </p>
            <div className="sp-hero-buy">
              <DownloadButton label="ดาวน์โหลดฟรีทันที" />
            </div>
            <p className="sp-hero-note text-dim">
              ไฟล์เปิดบน Google Drive · กดปุ่มดาวน์โหลดมุมขวาบนเพื่อบันทึกลงเครื่อง
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
