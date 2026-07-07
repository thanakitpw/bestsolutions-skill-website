const bullets = [
  "เรียนตัวต่อตัว 1:1 รวม 5 ชั่วโมง · เลือกวันเวลาเองได้",
  "ใช้ AI ช่วยวางไอเดีย ออกแบบ เขียนโค้ด และแก้ Error",
  "ติดตั้ง Tracking พื้นฐาน เช่น GA4, Google Tag และ Search Console",
  "ต่อยอดเป็น Portfolio สมัครงาน รับงาน หรือสร้างรายได้",
];

const LINE_URL = "https://lin.ee/Q22m30X";

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy js-reveal">
          <span className="pill">
            <span className="dot" /> Vibe Code · เรียนตัวต่อตัว 1:1
          </span>
          <h1>
            สร้างเว็บไซต์ <span className="g-text">Vibe Code</span>
            <br />
            ด้วย AI แบบตัวต่อตัว
          </h1>
          <p className="hero-sub">
            เรียนตั้งแต่วางไอเดีย ออกแบบ ทำ HTML Preview ขึ้น Next.js ติดตั้ง Tracking
            และ Deploy เว็บออนไลน์ พร้อมแนวทางต่อยอดเป็นอาชีพหรือรายได้เสริม
          </p>
          <ul className="check-list hero-bullets">
            {bullets.map((b, i) => (
              <li key={i}>
                <span className="ck">✓</span> {b}
              </li>
            ))}
          </ul>
          <div className="hero-price">
            <span className="eyebrow">เรียนตัวต่อตัว 1:1</span>
            <span className="hero-price-now g-text">6,900.-</span>
            <span className="pill">5 ชั่วโมง</span>
            <span className="pill">เลือกวันเวลาเรียนเองได้</span>
          </div>
          <div className="cta-row">
            <a
              className="btn btn-primary btn-block-sm"
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="line"
            >
              ทักไลน์เพื่อสมัครเรียน →
            </a>
            <a className="btn btn-outline btn-block-sm" href="#pricing">
              ดูรูปแบบการเรียน
            </a>
          </div>
        </div>

        <div className="hero-visual js-reveal">
          <figure className="heroimg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/hero-vibe-code.png"
              alt="คนกำลังเขียนโค้ดเว็บไซต์บนแล็ปท็อปด้วย AI"
              width={1000}
              height={850}
            />
          </figure>
          <div className="float float-tl">
            <b className="g-text">สอนตั้งแต่พื้นฐาน</b>
            <br />
            <span className="text-dim">ครบ จบ ในที่เดียว</span>
          </div>
          <div className="float float-br">
            <b>เรียนตัวต่อตัว 1:1</b>
            <br />
            <span className="text-dim">5 ชั่วโมง · เลือกเวลาเองได้</span>
          </div>
        </div>
      </div>
    </section>
  );
}
