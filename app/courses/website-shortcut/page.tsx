import type { Metadata } from "next";
import { Footer } from "@/components/Footer";
import { SiteNavbar } from "@/components/SiteNavbar";
import {
  ArrowRight,
  Bolt,
  CheckCircle,
  Clock,
  Code,
  CreditCard,
  Doc,
  Layout,
  Palette,
  ShieldCheck,
  Users,
  Wand,
} from "@/components/icons";

const CHECKOUT_URL = "/courses/website-shortcut/checkout";

export const metadata: Metadata = {
  title: "Website Shortcut | คอร์สทำเว็บไซต์ 2 ชั่วโมง ราคา 990 บาท",
  description:
    "Website Shortcut คอร์สสั้น 2 ชั่วโมงสำหรับมือใหม่ที่อยากเริ่มทำเว็บไซต์ของตัวเอง ราคา 990 บาท พร้อมการบ้าน 1 โปรเจกต์ ตรวจงาน และคำแนะนำหลังเรียน",
};

const pains = [
  {
    icon: Code,
    title: "อยากมีเว็บ แต่ไม่รู้จะเริ่มตรงไหน",
    body: "มีไอเดีย มีธุรกิจ หรือมีบริการที่อยากนำเสนอ แต่พอจะเริ่มทำเว็บจริงกลับไม่รู้ว่าควรวางอะไรก่อนหลัง",
  },
  {
    icon: Clock,
    title: "ไม่มีเวลานั่งเรียนยาวหลายวัน",
    body: "คอร์สนี้ตัดให้เหลือเฉพาะสิ่งที่ต้องใช้ตอนเริ่มทำหน้าเว็บจริง ไม่วนกับทฤษฎีหรือศัพท์เทคนิคเกินจำเป็น",
  },
  {
    icon: CreditCard,
    title: "ยังไม่พร้อมจ้างทำเว็บหลักหมื่น",
    body: "เหมาะกับคนที่อยากลองทำต้นแบบก่อน เห็นภาพก่อน แล้วค่อยตัดสินใจว่าจะต่อยอดเองหรือส่งต่อให้ทีมทำเว็บ",
  },
];

const outcomes = [
  {
    icon: Layout,
    title: "ได้หน้าเว็บฉบับแรกที่เป็นรูปเป็นร่าง",
    body: "รู้ว่าหน้าเว็บควรมีส่วนไหนบ้าง และจัดลำดับเนื้อหาให้คนอ่านเข้าใจธุรกิจหรือบริการของคุณเร็วขึ้น",
  },
  {
    icon: Wand,
    title: "ใช้ AI ช่วยทำเว็บแบบไม่ต้องเดาเอง",
    body: "ได้วิธีคุยกับ AI ให้ช่วยคิดโครงหน้า เขียนข้อความ และปรับงาน โดยยังคุมทิศทางเว็บด้วยตัวคุณเอง",
  },
  {
    icon: Palette,
    title: "ปรับหน้าตาเว็บให้ดูน่าเชื่อถือขึ้น",
    body: "เข้าใจเรื่องสี ฟอนต์ ระยะห่าง และปุ่มเรียกให้สมัครหรือทักหา โดยใช้ภาษาที่คนทั่วไปเข้าใจได้",
  },
  {
    icon: Doc,
    title: "มีการบ้าน 1 โปรเจกต์ พร้อมตรวจงาน",
    body: "หลังเรียนจะมีโจทย์ให้ทำคนละ 1 โปรเจกต์ ส่งมาตรวจได้ และรับคำแนะนำว่าควรแก้ตรงไหนก่อนนำไปใช้จริง",
  },
];

const timeline = [
  {
    time: "0-20 นาที",
    title: "จับโจทย์เว็บให้ชัด",
    body: "คุยให้ชัดว่าหน้าเว็บนี้ทำไปเพื่ออะไร ใครคือคนอ่าน และควรพาเขาไปทำอะไรต่อ",
  },
  {
    time: "20-60 นาที",
    title: "วางเนื้อหาและโครงหน้า",
    body: "ร่างหัวข้อหลัก ข้อความขาย จุดเด่น ราคา และปุ่มติดต่อ ให้กลายเป็นหน้าเว็บที่อ่านต่อเนื่อง",
  },
  {
    time: "60-100 นาที",
    title: "ปรับดีไซน์ให้ดูพร้อมใช้งาน",
    body: "ดูเรื่องฟอนต์ สี ระยะห่าง รูปภาพ และปุ่มสำคัญ ให้หน้าเว็บไม่ดูเหมือนงานร่าง",
  },
  {
    time: "100-120 นาที",
    title: "สรุปงานและให้โจทย์กลับไปทำต่อ",
    body: "เช็กสิ่งที่ทำในคลาส พร้อมมอบการบ้าน 1 โปรเจกต์ต่อคน และบอกวิธีส่งงานมาตรวจ",
  },
];

const audiences = [
  "เจ้าของธุรกิจเล็กที่อยากมีหน้าเว็บแนะนำบริการของตัวเอง",
  "ฟรีแลนซ์ โค้ช หรือคนทำคอนเทนต์ที่อยากมีหน้าโปรไฟล์ขายงาน",
  "คนขายของออนไลน์ที่อยากมี landing page สำหรับส่งลูกค้าหรือยิงแอด",
  "มือใหม่ที่อยากลองทำเว็บเองก่อนตัดสินใจจ้างทำจริง",
];

const features = [
  "เรียนสด 2 ชั่วโมงแบบจับมือทำ",
  "เหมาะกับมือใหม่ ไม่ต้องมีพื้นฐานเขียนโค้ด",
  "ได้ prompt และวิธีคิดสำหรับนำไปทำเว็บหน้าอื่นต่อ",
  "มีการบ้านให้ทำคนละ 1 โปรเจกต์",
  "ส่งงานมาตรวจได้ พร้อมคำแนะนำว่าควรปรับตรงไหน",
  "ถามตอบระหว่างเรียนตามโจทย์จริงของคุณ",
];

const faqs = [
  {
    question: "ไม่มีพื้นฐานเลย เรียนได้ไหม?",
    answer:
      "เรียนได้ คอร์สนี้เริ่มจากการคิดหน้าเว็บและใช้ AI ช่วยทำงาน ไม่ได้เริ่มจากการเขียนโค้ดลึก ๆ",
  },
  {
    question: "ใน 2 ชั่วโมงจะได้เว็บจริงเลยไหม?",
    answer:
      "เป้าหมายคือให้คุณได้หน้าเว็บหรือต้นแบบที่นำไปต่อได้ทันที ผลลัพธ์จะเร็วขึ้นมากถ้าคุณเตรียมข้อมูลธุรกิจ รูปภาพ และตัวอย่างเว็บที่ชอบมาก่อน",
  },
  {
    question: "การบ้าน 1 โปรเจกต์คืออะไร?",
    answer:
      "หลังเรียนจะมีโจทย์ให้คุณทำหน้าเว็บของตัวเอง 1 โปรเจกต์ ส่งมาตรวจได้ แล้วจะได้รับคำแนะนำว่าควรแก้ข้อความ ดีไซน์ หรือโครงหน้าเว็บตรงไหน",
  },
  {
    question: "ต้องเตรียมอะไรก่อนเรียน?",
    answer:
      "เตรียมข้อมูลธุรกิจหรือบริการ กลุ่มลูกค้า ตัวอย่างเว็บที่ชอบ และรูปภาพหรือโลโก้ถ้ามี เพื่อให้ใช้เวลาในคลาสได้คุ้มที่สุด",
  },
  {
    question: "เรียนผ่านช่องทางไหน?",
    answer:
      "ติดต่อผ่าน LINE เพื่อจองรอบและสรุปรูปแบบการเรียนที่เหมาะกับคุณก่อนเริ่มคลาส",
  },
];

export default function WebsiteShortcutPage() {
  return (
    <>
      <SiteNavbar />
      <main id="top" className="intensive-landing">
        <section className="intensive-hero">
          <div className="container intensive-hero-grid">
            <div className="intensive-hero-copy js-reveal">
              <span className="pill intensive-pill">
                <Clock /> Website Shortcut · 2 ชั่วโมง
              </span>
              <h1>
                <span className="intensive-hero-line">Website Shortcut</span>
                <span className="intensive-hero-line">ทำเว็บหน้าแรก</span>
                <span className="intensive-hero-line g-text">ให้พร้อมไปต่อใน 2 ชั่วโมง</span>
              </h1>
              <p className="intensive-hero-sub">
                คลาสสั้นสำหรับคนที่อยากมีหน้าเว็บของตัวเอง แต่ไม่อยากเริ่มแบบงง ๆ
                เราจะช่วยวางโครง เขียนข้อความ จัดหน้าตาเว็บ และให้โจทย์กลับไปทำต่ออีก 1 โปรเจกต์
              </p>
              <div className="intensive-proof-row" aria-label="ข้อมูลคอร์ส">
                <span>
                  <CreditCard /> ราคา 990 บาท
                </span>
                <span>
                  <Users /> มือใหม่เรียนได้
                </span>
                <span>
                  <ShieldCheck /> มีตรวจการบ้าน
                </span>
              </div>
              <div className="cta-row">
                <a
                  className="btn btn-primary btn-block-sm"
                  href={CHECKOUT_URL}
                >
                  สมัครเรียน 990 บาท <ArrowRight />
                </a>
                <a className="btn btn-outline btn-block-sm" href="#timeline">
                  ดูสิ่งที่จะเรียน
                </a>
              </div>
            </div>

            <div className="intensive-hero-visual js-reveal">
              <figure className="intensive-window">
                <div className="intensive-window-bar" aria-hidden="true">
                  <span />
                  <span />
                  <span />
                </div>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/hero-vibe-code.png"
                  alt="หน้าจอแล็ปท็อปแสดงการทำเว็บไซต์ด้วย AI"
                  width={1000}
                  height={750}
                />
              </figure>
              <div className="intensive-stat intensive-stat-a">
                <Bolt />
                <span>
                  <b>2 ชั่วโมง</b>
                  <small>โฟกัสเฉพาะสิ่งที่ทำให้เว็บเดินหน้า</small>
                </span>
              </div>
              <div className="intensive-stat intensive-stat-b">
                <CheckCircle />
                <span>
                  <b>1 โปรเจกต์</b>
                  <small>มีการบ้านพร้อมคำแนะนำหลังเรียน</small>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="section intensive-band">
          <div className="container">
            <div className="section-head js-reveal">
              <span className="eyebrow">ปัญหาที่เจอบ่อย</span>
              <h2>ถ้าคุณอยากมีเว็บ แต่ติดอยู่ตรงนี้</h2>
              <p>คอร์สนี้ทำมาให้คนเริ่มต้นได้เดินต่อเร็วขึ้น โดยไม่ต้องหลงกับเครื่องมือหรือศัพท์เทคนิคตั้งแต่วันแรก</p>
            </div>
            <div className="intensive-card-grid js-reveal">
              {pains.map((item) => {
                const Icon = item.icon;
                return (
                  <article className="intensive-card" key={item.title}>
                    <span className="intensive-icon danger">
                      <Icon />
                    </span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head js-reveal">
              <span className="eyebrow">เรียนแล้วได้อะไร</span>
              <h2>
                ไม่ใช่แค่นั่งฟัง แต่ได้<span className="g-text"> งานกลับไปทำต่อ</span>
              </h2>
              <p>เราเน้นให้คุณเห็นภาพเว็บของตัวเอง และรู้ว่าหลังจบคลาสควรแก้อะไรต่อเป็นลำดับแรก</p>
            </div>
            <div className="intensive-outcome-grid js-reveal">
              {outcomes.map((item) => {
                const Icon = item.icon;
                return (
                  <article className="intensive-card intensive-card-wide" key={item.title}>
                    <span className="intensive-icon">
                      <Icon />
                    </span>
                    <div>
                      <h3>{item.title}</h3>
                      <p>{item.body}</p>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="section intensive-band" id="timeline">
          <div className="container">
            <div className="section-head js-reveal">
              <span className="eyebrow">ในคลาสทำอะไรบ้าง</span>
              <h2>2 ชั่วโมงที่ไม่ปล่อยให้คุณนั่งงง</h2>
              <p>แต่ละช่วงมีเป้าหมายชัดเจน ตั้งแต่จับโจทย์ วางหน้าเว็บ ไปจนถึงสรุปการบ้านที่ต้องทำต่อ</p>
            </div>
            <ol className="intensive-timeline js-reveal">
              {timeline.map((item, index) => (
                <li key={item.time}>
                  <span className="intensive-timeline-no">{index + 1}</span>
                  <div className="intensive-timeline-card">
                    <span className="intensive-time">{item.time}</span>
                    <h3>{item.title}</h3>
                    <p>{item.body}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section">
          <div className="container intensive-split js-reveal">
            <div>
              <span className="eyebrow">เหมาะกับใคร</span>
              <h2>เหมาะกับคนที่อยากเริ่มเว็บเร็ว แต่ยังไม่อยากลงทุนหนัก</h2>
              <p className="intensive-copy">
                คลาสนี้เหมาะกับคนที่มีโจทย์อยู่ในหัวแล้ว แต่อยากให้มีคนช่วยจัดให้เป็นหน้าเว็บที่อ่านรู้เรื่อง
                เช่น หน้าแนะนำบริการ หน้าโปรโมตคอร์ส หน้าโปรไฟล์ หรือ landing page สำหรับทดสอบตลาด
              </p>
            </div>
            <div className="intensive-list-card">
              <ul className="intensive-icon-list">
                {audiences.map((item) => (
                  <li key={item}>
                    <CheckCircle />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="section intensive-band" id="pricing">
          <div className="container">
            <div className="intensive-pricing js-reveal">
              <div className="intensive-pricing-copy">
                <span className="eyebrow">ราคา</span>
                <h2>Website Shortcut</h2>
                <p>
                  ราคาเดียวสำหรับคลาสสด 2 ชั่วโมง พร้อมโจทย์การบ้าน 1 โปรเจกต์
                  และการตรวจงานพร้อมคำแนะนำหลังเรียน
                </p>
                <ul className="intensive-icon-list">
                  {features.map((item) => (
                    <li key={item}>
                      <CheckCircle />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <aside className="intensive-price-card" aria-label="ราคา">
                <span className="pc-badge">Website Shortcut</span>
                <span className="intensive-price-label">จ่ายครั้งเดียว</span>
                <div className="intensive-price">
                  <b>990</b>
                  <span>บาท</span>
                </div>
                <p>เรียนสด 2 ชั่วโมง พร้อมการบ้าน 1 โปรเจกต์ ตรวจงาน และคำแนะนำหลังเรียน</p>
                <a
                  className="btn btn-primary"
                  href={CHECKOUT_URL}
                >
                  ไปหน้าชำระเงิน <ArrowRight />
                </a>
              </aside>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container">
            <div className="section-head js-reveal">
              <span className="eyebrow">คำถามก่อนสมัคร</span>
              <h2>คำถามที่พบบ่อย</h2>
            </div>
            <div className="intensive-faq js-reveal">
              {faqs.map((faq) => (
                <article className="intensive-faq-item" key={faq.question}>
                  <h3>{faq.question}</h3>
                  <p>{faq.answer}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="final-cta intensive-final">
          <div className="container final-cta-inner js-reveal">
            <span className="eyebrow">Website Shortcut</span>
            <h2>เริ่มหน้าเว็บแรกของคุณแบบมีคนช่วยดูทาง</h2>
            <p>ราคา 990 บาท เรียนสด 2 ชั่วโมง พร้อมการบ้าน 1 โปรเจกต์ ตรวจงาน และคำแนะนำหลังเรียน</p>
            <div className="cta-row cta-center">
              <a
                className="btn btn-primary btn-block-sm"
                href={CHECKOUT_URL}
              >
                สมัครและชำระเงิน <ArrowRight />
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
