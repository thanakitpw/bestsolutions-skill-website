import type { Ebook } from "./ebooks";
import { EbookCover } from "./EbookCover";
import { Icon } from "../Icon";
import { CountdownTimer } from "../CountdownTimer";

const SEATS_LIMIT = 50; // จำกัดจำนวนผู้ซื้อช่วงเปิดตัว

// หน้าขายเต็ม (12 ส่วน) เฉพาะเล่ม flagship — โทน honest ไม่ขายฝัน
// อ้างอิงโครงจาก ebook-details.md ข้อ 11 · CTA ซ้ำหลายจุด → หน้า checkout (โอน + ส่งสลิป LINE)

const beforeAfter: { before: string; after: string }[] = [
  { before: "อยากมีธุรกิจ แต่ไม่รู้ว่าควรเริ่มจากอะไร", after: "มีสินค้าและหน้าร้านออนไลน์ที่พร้อมเริ่มขาย" },
  { before: "คิดว่าต้องมีทุน ทีม หรือพื้นฐานเทคนิคก่อน", after: "เริ่มเองได้ โดยใช้ AI ช่วยคิดและช่วยลงมือ" },
  { before: "ทำคอนเทนต์ไม่เป็น โพสต์แล้วเงียบ", after: "มีแนวทางทำคอนเทนต์และหาลูกค้าที่ทำซ้ำได้" },
  { before: "เปิดร้านแล้ว แต่ยังไม่มีคนเห็น", after: "รู้วิธีทำให้คนหาเจอและเริ่มคุยกับลูกค้ากลุ่มแรก" },
];

const pains: string[] = [
  "อยากเริ่มธุรกิจมานาน แต่ยังจับต้นชนปลายไม่ถูก",
  "คิดว่าต้องมีทุนเยอะ มีทีม หรือมีความรู้เทคนิคก่อนถึงจะเริ่มได้",
  "เห็นคนอื่นใช้ AI แล้วอยากใช้บ้าง แต่พอเปิดมาแล้วไม่รู้จะสั่งอย่างไร",
  "ทำคอนเทนต์เอง ตอบลูกค้าเอง ทำทุกอย่างเอง จนไม่มีระบบที่ช่วยประหยัดเวลา",
  "ไม่อยากเสียเงินกับคอร์สหรือคู่มือที่พูดสวย แต่ทำตามจริงได้ยาก",
];

type Week = { no: number; title: string; range: string; free?: boolean; days: string[] };

const weeks: Week[] = [
  {
    no: 1,
    title: "วางฐานให้พร้อมขาย",
    range: "วันที่ 1–7",
    free: true,
    days: [
      "หาไอเดียธุรกิจที่เหมาะกับคุณด้วย AI",
      "รู้จักลูกค้าตัวจริงว่าเขาต้องการอะไรและติดปัญหาอะไร",
      "ปั้นสินค้า/บริการแรกและตั้งราคาด้วย AI",
      "ตั้งชื่อแบรนด์และกำหนดภาพลักษณ์เริ่มต้นด้วย AI",
      "เปิดหน้าร้านออนไลน์แบบเร็วด้วย AI",
      "เขียนไบโอและโพสต์แนะนำตัวชุดแรก",
      "เช็กลิสต์พร้อมขาย: มีสินค้า มีร้าน มีตัวตนออนไลน์",
    ],
  },
  {
    no: 2,
    title: "หาลูกค้ากลุ่มแรก",
    range: "วันที่ 8–14",
    days: [
      "ระบบคอนเทนต์ทำครั้งเดียว ลงได้หลายช่อง",
      "เขียนแคปชั่น/คลิปสั้นด้วย AI",
      "ตอบแชทปิดการขายด้วย AI",
      "วางขั้นตอนเพื่อพาไปสู่ออเดอร์แรก",
    ],
  },
  {
    no: 3,
    title: "ให้คนหาเจอ + ขยายการเข้าถึง",
    range: "วันที่ 15–21",
    days: [
      "ตั้ง Google Business / ปักหมุด Maps",
      "เขียนบทความให้มีโอกาสถูกค้นเจอบน Google",
      "เริ่มทดสอบโฆษณางบเล็กและ comment-to-DM",
      "ทำหน้าเว็บปิดการขาย",
    ],
  },
  {
    no: 4,
    title: "จัดระบบให้ทำซ้ำได้",
    range: "วันที่ 22–30",
    days: [
      "วาง automation งานซ้ำ",
      "ขายซ้ำ / upsell / เก็บรีวิว",
      "วางระบบเก็บ list + ดูตัวเลข",
      "วางแผนต่อเนื่องหลัง 30 วัน",
    ],
  },
];

const outcomes: string[] = [
  "มีสินค้า/บริการแรกที่พร้อมขาย",
  "มีหน้าร้านออนไลน์ + คอนเทนต์ชุดแรก",
  "มีพรอมต์ AI สำเร็จรูปให้คัดลอกไปใช้ได้ทุกขั้นตอน",
  "รู้วิธีหาลูกค้ากลุ่มแรกและปิดการขาย",
  "มีระบบที่ทำซ้ำได้ ไม่ต้องเริ่มจากศูนย์ทุกวัน",
];

const valueStack: { item: string; value: string }[] = [
  { item: "แผนธุรกิจทีละวัน 30 วัน (E-book หลัก)", value: "฿590" },
  { item: "Prompt Pack เริ่มต้นธุรกิจด้วย AI (100+ พรอมต์)", value: "฿390" },
  { item: "กลุ่มถาม-ตอบเฉพาะคนซื้อ (ช่วงเปิดตัว)", value: "฿500" },
  { item: "สิทธิ์ถามคำถามและขอคำแนะนำจากผู้สอน", value: "฿990" },
  { item: "อัปเดตเนื้อหาฟรีตลอดชีพ", value: "฿200" },
];

// image?: ใส่ path รูปโบนัส (เช่น /ebooks/bonus-1.webp) — ถ้าไม่ใส่จะขึ้นช่องเว้นว่างไว้ก่อน
// value?: ป้ายมูลค่า — ตัดออกได้ถ้าอยากให้เป็นของแถมฟรีล้วน
// points?: bullet เนื้อหาเพิ่ม (ใช้กับโบนัสที่ไม่มีรูป — จะ render เป็นบล็อกเนื้อหาแทนช่องรูป)
const bonuses: { title: string; tag?: string; desc: string; value?: string; image?: string; points?: string[] }[] = [
  {
    title: "Prompt Pack เริ่มต้นธุรกิจด้วย AI",
    tag: "มากกว่า 100 พรอมต์",
    desc: "ชุดพรอมต์สำหรับคนเริ่มจากศูนย์ ใช้ให้ AI ช่วยคิด วางแผน เขียนคอนเทนต์ ตอบลูกค้า และจัดระบบธุรกิจแบบลงมือทำได้จริง",
    value: "มูลค่า ฿390",
    image: "/ebooks/bonus-prompt-pack.webp",
  },
  {
    title: "กลุ่มถาม-ตอบเฉพาะคนซื้อ",
    desc: "ติดตรงไหนถามได้ในกลุ่มเฉพาะผู้ซื้อ เปิดให้เข้าร่วมในช่วงเปิดตัวเล่มนี้",
    image: "/ebooks/bonus-community.webp",
  },
  {
    title: "ถามคำถามกับผู้สอนได้โดยตรง",
    tag: "ปรึกษาได้จนกว่าจะทำเป็น",
    desc: "เล่มนี้ไม่ได้ขายจบแล้วปล่อยให้ทำเองคนเดียว ระหว่างลงมือทำจริง ถ้าติดตรงไหนหรือไม่แน่ใจ ทักมาปรึกษาได้เรื่อยๆ ผมช่วยดูให้จนคุณทำเป็นและเดินต่อเองได้",
    points: [
      "ติดขั้นตอนไหนในเล่ม ถามได้ทีละสเต็ป ไม่ต้องเดาเอง",
      "ขอความเห็นเรื่องไอเดีย สินค้า หรือการตั้งราคาได้",
      "ช่วยดูหน้าร้านและคอนเทนต์ก่อนปล่อยจริง",
    ],
  },
];

const faqs: { id: string; q: string; a: string }[] = [
  {
    id: "sp-faq-1",
    q: "ไม่มีพื้นฐานเทคนิคเลย ทำได้ไหม?",
    a: "ได้ เล่มนี้ออกแบบมาสำหรับคนที่ไม่ใช่สายเทค มีพรอมต์และขั้นตอนให้ทำตามทีละวัน",
  },
  {
    id: "sp-faq-2",
    q: "ต้องมีทุนเท่าไหร่?",
    a: "เริ่มด้วยเครื่องมือฟรีเป็นหลัก ค่อยลงทุนเพิ่มเมื่อเริ่มมีรายได้ ไม่ต้องมีทุนก้อนใหญ่ก่อนเริ่ม",
  },
  {
    id: "sp-faq-4",
    q: "ต้องใช้เวลาวันละกี่ชั่วโมง?",
    a: "ทำวันละหัวข้อ ปรับตามเวลาที่คุณมีได้ ไม่จำเป็นต้องลาออกหรือทำเต็มเวลาตั้งแต่วันแรก",
  },
  {
    id: "sp-faq-5",
    q: "ซื้อแล้วได้อะไรบ้าง?",
    a: "ไฟล์ PDF แผน 30 วัน ชุดพรอมต์ AI กลุ่มถาม-ตอบช่วงเปิดตัว และอัปเดตเนื้อหาฟรี ส่งให้ทาง LINE หลังยืนยันการชำระเงิน",
  },
];

function CtaButton({ label, href }: { label: string; href: string }) {
  return (
    <a className="btn btn-primary sp-cta-btn" href={href} data-cta="ebook-checkout">
      {label}
    </a>
  );
}

export function EbookSalesPage({ ebook }: { ebook: Ebook }) {
  const checkoutHref = `/ebooks/${ebook.slug}/checkout`;
  return (
    <div className="ebook-sales">
      {/* 1 · HOOK / HERO */}
      <section className="section sp-hero">
        <div className="container">
          <a className="ebook-back" href="/ebooks">
            ← กลับไปหน้ารวม E-book
          </a>
          <div className="sp-hero-row">
            <div className="sp-hero-copy js-reveal">
              <span className="eyebrow">E-book · แผนธุรกิจ 30 วัน</span>
              <h1 className="sp-hero-title">
                เริ่มจากศูนย์ แล้วใช้ AI ช่วยสร้าง{" "}
                <span className="g-text">ธุรกิจแรกใน 30 วัน</span>
              </h1>
              <p className="sp-hero-sub">
                คู่มือทีละวันสำหรับคนที่อยากเริ่มธุรกิจ แต่ยังไม่รู้ว่าจะเริ่มจากตรงไหน
                พาใช้ AI ช่วยหาไอเดีย ปั้นสินค้า เปิดหน้าร้าน และหาลูกค้ากลุ่มแรกแบบไม่ขายฝัน
              </p>
              <ul className="check-list sp-hero-bullets">
                {ebook.bullets.map((b, i) => (
                  <li key={i}>
                    <span className="ck">✓</span> {b}
                  </li>
                ))}
              </ul>
              <span className="pill sp-hero-scarcity">
                <span className="dot" /> ราคาเปิดตัว · จำกัด {SEATS_LIMIT} ท่านแรก
              </span>
              <div className="sp-hero-buy">
                <span className="sp-price">
                  <b className="g-text">{ebook.priceNow}</b>
                  {ebook.priceWas ? <s className="text-dim">{ebook.priceWas}</s> : null}
                </span>
                <CtaButton label="สั่งซื้อเล่มเต็ม ฿290" href={checkoutHref} />
              </div>
              <p className="sp-hero-note text-dim">
                ไฟล์ PDF · อ่านได้ทุกอุปกรณ์ · ส่งทาง LINE หลังยืนยันการชำระเงิน
              </p>
            </div>
            <div className="sp-hero-media js-reveal">
              <EbookCover ebook={ebook} className="sp-hero-cover" />
            </div>
          </div>
        </div>
      </section>

      {/* 2 · สัญญาใหญ่ (honest) + Before → After */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-head js-reveal">
            <span className="eyebrow">สิ่งที่เล่มนี้ช่วยคุณได้</span>
            <h2>
              จบ 30 วัน คุณจะมีโครงธุรกิจที่{" "}
              <span className="g-text">เริ่มขายและพัฒนาต่อได้</span>
            </h2>
            <p>
              มีสินค้า หน้าร้านออนไลน์ แนวทางทำคอนเทนต์ วิธีหาลูกค้า และขั้นตอนปิดการขายด้วย AI
              โดยไม่จำเป็นต้องมีพื้นฐานเทคนิคมาก่อน
            </p>
          </div>
          <div className="sp-ba-grid js-reveal">
            {beforeAfter.map((r, i) => (
              <div className="sp-ba-row" key={i}>
                <div className="sp-ba-before">
                  <span className="sp-ba-tag">ก่อน</span>
                  <span>{r.before}</span>
                </div>
                <span className="sp-ba-arrow" aria-hidden="true">→</span>
                <div className="sp-ba-after">
                  <span className="sp-ba-tag">หลัง 30 วัน</span>
                  <span>{r.after}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3 · PAIN (agitate) */}
      <section className="section">
        <div className="container">
          <div className="section-head js-reveal">
            <span className="eyebrow">ถ้าคุณกำลังเป็นแบบนี้</span>
            <h2>
              อยากเริ่มธุรกิจ<span className="g-text">แต่ยังไม่ได้เริ่มสักที</span>
            </h2>
          </div>
          <ul className="sp-pain-list js-reveal">
            {pains.map((p, i) => (
              <li key={i} className="sp-pain-item">
                <span className="sp-pain-mark" aria-hidden="true">✕</span>
                <span>{p}</span>
              </li>
            ))}
          </ul>
          <p className="sp-pain-turn js-reveal">
            ปัญหาอาจไม่ใช่คุณขาดไอเดีย แต่อาจเป็นเพราะยังไม่มี{" "}
            <b className="g-text">แผนทีละวันที่ชัดพอให้ลงมือทำ</b> เล่มนี้ถูกทำมาเพื่อช่วยตรงนั้น
          </p>
        </div>
      </section>

      {/* 4 · โชว์ FRAMEWORK 4 อาทิตย์ */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-head js-reveal">
            <span className="eyebrow">ภาพรวมแผน 30 วัน</span>
            <h2>
              4 อาทิตย์ <span className="g-text">จากไอเดียสู่ระบบเริ่มต้น</span>
            </h2>
            <p>เห็นภาพรวมก่อนตัดสินใจ ว่าแต่ละช่วงต้องทำอะไรบ้าง</p>
          </div>
          <div className="grid grid-4 sp-week-grid js-reveal">
            {weeks.map((w) => (
              <div className="card sp-week-card" key={w.no}>
                <span className="sp-week-no">W{w.no}</span>
                <h3 className="sp-week-title">{w.title}</h3>
                <span className="text-dim sp-week-range">{w.range}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5 · สารบัญละเอียด 30 วัน */}
      <section className="section">
        <div className="container">
          <div className="section-head js-reveal">
            <span className="eyebrow">สารบัญละเอียด</span>
            <h2>
              ครบทั้ง <span className="g-text">30 วัน</span> ทำตามได้ทีละหัวข้อ
            </h2>
            <p>อาทิตย์แรกเปิดให้อ่านฟรี เพื่อดูว่าแนวทางนี้เหมาะกับคุณหรือไม่</p>
          </div>
          <div className="sp-toc js-reveal">
            {weeks.map((w) => (
              <div className="card sp-toc-week" key={w.no}>
                <div className="sp-toc-week-head">
                  <h3>
                    <span className="sp-toc-week-no">อาทิตย์ที่ {w.no}</span> · {w.title}
                  </h3>
                  <span className="sp-toc-week-meta">
                    {w.range}
                    {w.free ? <span className="pill sp-free-pill"><span className="dot" /> แจกฟรี</span> : null}
                  </span>
                </div>
                <ul className="sp-toc-days">
                  {w.days.map((d, i) => (
                    <li key={i}>
                      <span className="sp-toc-day-no">{w.no === 1 ? `วันที่ ${i + 1}` : "•"}</span>
                      <span>{d}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="sp-outcomes card js-reveal">
            <h3>อ่านจบทั้งเล่ม คุณจะได้</h3>
            <ul className="check-list sp-outcomes-list">
              {outcomes.map((o, i) => (
                <li key={i}>
                  <span className="ck">✓</span> {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 6 · ผู้เขียน (Instructor section — เดียวกับหน้าคอร์ส ปรับ copy ให้เข้ากับ ebook) */}
      <section className="section section--alt">
        <div className="container">
          <div className="section-head js-reveal">
            <span className="eyebrow">ผู้เขียน</span>
            <h2>
              เขียนโดยคนทำ Agency จริง <span className="g-text">ประสบการณ์กว่า 8 ปี</span>
            </h2>
          </div>
          <div className="grid grid-2 instructor-grid js-reveal">
            <div>
              <div className="instructor-photo">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/instructor.png" alt="Thanakit Chaithong (Bank)" width={1200} height={1200} />
              </div>
              <div className="instructor-caption">
                <span className="instructor-name">Thanakit Chaithong (Bank)</span>
                <span className="instructor-role">CEO &amp; Founder of Best Solution Skill</span>
              </div>
            </div>
            <div>
              <ul className="check-list instructor-points">
                <li><span className="ck">✓</span> มีประสบการณ์ทำเว็บไซต์และการตลาดออนไลน์ให้ธุรกิจจริง</li>
                <li><span className="ck">✓</span> เข้าใจทั้งมุม Design, Development และ Marketing</li>
                <li><span className="ck">✓</span> เคยทำงานแบบ Agency รับโจทย์จากลูกค้าจริง</li>
                <li><span className="ck">✓</span> นำ AI มาใช้กับงานธุรกิจจริง ทั้งของตัวเองและลูกค้า</li>
                <li><span className="ck">✓</span> เน้นให้คนอ่านนำไปลงมือทำธุรกิจได้จริง ไม่ใช่แค่ทฤษฎี</li>
              </ul>
              <blockquote className="instructor-quote">
                “แอดมินทำ Agency รับทำเว็บไซต์และการตลาดออนไลน์มากว่า 8 ปี
                เล่มนี้เลยไม่ได้เขียนแค่ทฤษฎี แต่คือขั้นตอนเดียวกับที่ผมใช้ตั้งต้นธุรกิจจริง
                ย่อให้คนไม่มีพื้นเทคนิคทำตามได้ใน 30 วัน”
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* 7 · SOCIAL PROOF (trust signals จริง — รีวิวจริงเก็บเพิ่มภายหลัง) */}
      <section className="section">
        <div className="container">
          <div className="section-head js-reveal">
            <span className="eyebrow">ทำไมถึงเชื่อใจได้</span>
            <h2>
              ให้ลองอ่านและลองทำ <span className="g-text">ก่อนตัดสินใจ</span>
            </h2>
          </div>
          <div className="grid grid-3 sp-trust-grid js-reveal">
            <div className="card sp-trust-card">
              <Icon name="book" className="sp-trust-icon" />
              <h3>อ่านฟรีก่อนได้</h3>
              <p className="text-dim">เปิดอาทิตย์แรก (7 วัน) ให้ลองอ่านและลองทำก่อนซื้อเล่มเต็ม</p>
            </div>
            <div className="card sp-trust-card">
              <Icon name="wrench" className="sp-trust-icon" />
              <h3>ทำมาจากงานจริง</h3>
              <p className="text-dim">เรียบเรียงจากขั้นตอนที่ใช้กับธุรกิจตัวเองและงานลูกค้าของ Best Solutions Skill</p>
            </div>
            <div className="card sp-trust-card">
              <Icon name="chat" className="sp-trust-icon" />
              <h3>มีพื้นที่ให้ถามต่อ</h3>
              <p className="text-dim">ช่วงเปิดตัวมีกลุ่มถาม-ตอบสำหรับคนซื้อ เพื่อให้ถามจุดที่ติดระหว่างลงมือทำ</p>
            </div>
          </div>
          {/* TODO: ใส่รีวิว/แคปแชตจริงจากคนอ่านไฟล์ฟรีเมื่อเริ่มเก็บได้ */}
        </div>
      </section>

      {/* 8 · BONUS — แต่ละโบนัสเป็น section สลับซ้าย-ขวา + ช่องเว้นใส่รูป (มาก่อนสรุปมูลค่า) */}
      {bonuses.map((b, i) => (
        <section
          className={`section sp-bonus-sec${i % 2 === 0 ? " section--alt" : ""}`}
          key={i}
        >
          <div className="container">
            {i === 0 ? (
              <div className="section-head js-reveal">
                <span className="eyebrow">โบนัสพิเศษ</span>
                <h2>
                  ซื้อช่วงเปิดตัว <span className="g-text">ได้เครื่องมือช่วยลงมือทำเพิ่ม</span>
                </h2>
              </div>
            ) : null}
            {b.image ? (
              <div
                className={`feature-row js-reveal${i % 2 === 1 ? " feature-row--reverse" : ""}`}
              >
                <div className="feature-copy">
                  <span className="pill sp-bonus-pill">
                    <span className="dot" /> โบนัส {i + 1}
                  </span>
                  <h2>{b.title}</h2>
                  {b.tag ? <span className="sp-bonus-count">{b.tag}</span> : null}
                  <p className="feature-desc">{b.desc}</p>
                  {b.value ? <span className="sp-bonus-value g-text">{b.value}</span> : null}
                </div>
                <div className="feature-media">
                  <div className="sp-bonus-shot">
                    <img src={b.image} alt={b.title} loading="lazy" />
                  </div>
                </div>
              </div>
            ) : (
              <div className="sp-bonus-solo js-reveal">
                <span className="pill sp-bonus-pill">
                  <span className="dot" /> โบนัส {i + 1}
                </span>
                <h2>{b.title}</h2>
                {b.tag ? <p className="sp-bonus-promise g-text">{b.tag}</p> : null}
                <p className="feature-desc sp-bonus-solo-desc">{b.desc}</p>
                {b.points ? (
                  <ul className="check-list sp-bonus-points">
                    {b.points.map((p, k) => (
                      <li key={k}>
                        <span className="ck">✓</span> {p}
                      </li>
                    ))}
                  </ul>
                ) : null}
                {b.value ? <span className="sp-bonus-value g-text">{b.value}</span> : null}
              </div>
            )}
          </div>
        </section>
      ))}

      {/* 9 · สรุปสิ่งที่คุณได้ + ราคา + ANCHOR (หลังโชว์โบนัสครบ) */}
      <section className="section" id="sp-price">
        <div className="container">
          <div className="section-head js-reveal">
            <span className="eyebrow">สรุปสิ่งที่คุณได้</span>
            <h2>
              เล่มหลักพร้อมโบนัสช่วงเปิดตัว <span className="g-text">ราคา ฿290</span>
            </h2>
          </div>
          <div className="sp-value card js-reveal">
            <ul className="sp-value-list">
              {valueStack.map((v, i) => (
                <li key={i}>
                  <span className="sp-value-item">
                    <span className="ck">✓</span> {v.item}
                  </span>
                  <span className="sp-value-price">{v.value}</span>
                </li>
              ))}
            </ul>
            <div className="sp-value-total">
              <span>มูลค่ารวม</span>
              <s className="text-dim">฿2,670</s>
            </div>
            <div className="sp-value-now">
              <span className="sp-value-now-label">ราคาเปิดตัววันนี้</span>
              <span className="sp-value-now-price g-text">฿290</span>
            </div>
            <p className="sp-scarcity-note">
              <span className="dot" /> ราคานี้จำกัดเฉพาะ {SEATS_LIMIT} ท่านแรกในช่วงเปิดตัว
            </p>
            <CtaButton label="สั่งซื้อเล่มเต็ม (฿290)" href={checkoutHref} />
            <p className="sp-hero-note text-dim">
              ชำระผ่านพร้อมเพย์หรือโอนบัญชี · แจ้งสลิปทาง LINE · รับไฟล์หลังยืนยัน
            </p>
          </div>
        </div>
      </section>

      {/* 10 · การันตี (honest risk reversal) */}
      <section className="section section--alt">
        <div className="container">
          <div className="sp-guarantee card js-reveal">
            <Icon name="shieldCheck" className="sp-guarantee-icon" />
            <div>
              <h2>ซื้อแล้วมีช่องทางให้ถามต่อ</h2>
              <p>
                ถ้าลองทำตามแล้วติดบางขั้นตอน สามารถทักมาถามเพื่อขอแนวทางเพิ่มเติมได้
                เป้าหมายของเล่มนี้คือช่วยให้คุณเริ่มได้จริง ไม่ใช่แค่อ่านจบแล้ววางไว้
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 11 · FAQ */}
      <section className="section" id="sp-faq">
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
                  <button className="acc-trigger" aria-expanded="false" aria-controls={f.id}>
                    <span className="acc-name">{f.q}</span>
                    <span className="sign" aria-hidden="true">+</span>
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

      {/* 12 · URGENCY + สั่งซื้อ / ชำระเงิน */}
      <section className="section section--alt" id="sp-buy">
        <div className="container">
          <div className="sp-final card js-reveal">
            <span className="pill sp-final-pill"><span className="dot" /> ราคาเปิดตัว · จำกัด {SEATS_LIMIT} ท่านแรก</span>
            <h2>
              พร้อมเริ่มวางธุรกิจแรกของคุณ <span className="g-text">แบบเป็นขั้นตอน</span>
            </h2>
            <p>
              ราคาเปิดตัว ฿290 จากราคาเต็ม ฿590 พร้อมโบนัสและกลุ่มถาม-ตอบ —
              เฉพาะ {SEATS_LIMIT} ท่านแรกในช่วงเปิดตัวนี้เท่านั้น
            </p>
            <div className="sp-final-price">
              <b className="g-text">฿290</b>
              <s className="text-dim">฿590</s>
            </div>

            <div className="sp-countdown-wrap">
              <span className="sp-countdown-label">ราคาเปิดตัวและโบนัสทั้งหมดปิดใน</span>
              <CountdownTimer days={5} />
            </div>

            <ol className="sp-steps">
              <li><span className="sp-step-no">1</span> กดปุ่มสั่งซื้อ ไปที่หน้าชำระเงิน</li>
              <li><span className="sp-step-no">2</span> โอนเงินตามเลขบัญชี ยอด ฿290</li>
              <li><span className="sp-step-no">3</span> แอดไลน์แล้วส่งสลิปในแชท</li>
              <li><span className="sp-step-no">4</span> รับไฟล์ E-book ทาง LINE หลังยืนยันการชำระเงิน</li>
            </ol>

            <CtaButton label="สั่งซื้อเล่มเต็ม — ฿290" href={checkoutHref} />
            <p className="sp-hero-note text-dim">
              ผู้ซื้อช่วงเปิดตัวจะได้เข้ากลุ่มถาม-ตอบและรับอัปเดตเนื้อหาฟรี
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
