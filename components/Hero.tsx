const bullets = [
  "เรียนสด 2 วัน รวม 10 ชั่วโมง แบบเข้มข้น",
  "ใช้ AI ช่วยวางไอเดีย ออกแบบ เขียนโค้ด และแก้ Error",
  "ติดตั้ง Tracking พื้นฐาน เช่น GA4, Google Tag และ Search Console",
  "ต่อยอดเป็น Portfolio สมัครงาน รับงาน หรือสร้างรายได้",
];

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy js-reveal">
          <span className="pill">
            <span className="dot" /> Vibe Code Bootcamp · เรียนสด 2 วัน
          </span>
          <span className="hero-schedule">
            📅 รอบสอน เสาร์–อาทิตย์ ที่ <b>27–28 มิถุนายน 2026</b>
          </span>
          <h1>
            สร้างเว็บไซต์ <span className="g-text">Vibe Code</span>
            <br />
            ด้วย AI ใน 2 วัน
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
            <span className="eyebrow">Early Bird · 10 Seats Only</span>
            <span className="hero-price-now g-text">2,990.-</span>
            <span className="hero-price-was">4,990.-</span>
            <span className="pill">รับจำกัด 10 ที่นั่ง</span>
            <span className="pill">มา 2 คน เหลือคนละ 2,590.-</span>
          </div>
          <div className="cta-row">
            <a className="btn btn-primary btn-block-sm" href="/checkout?plan=early-bird">
              สมัคร Vibe Code Bootcamp →
            </a>
            <a className="btn btn-outline btn-block-sm" href="#pricing">
              ดูราคา Private / On-site
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
            <b>27–28 มิ.ย. 2026</b>
            <br />
            <span className="text-dim">เสาร์–อาทิตย์ · 2 วัน 10 ชม.</span>
          </div>
        </div>
      </div>
    </section>
  );
}
