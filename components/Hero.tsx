const bullets = [
  "ใช้ AI ช่วยวางโครง ออกแบบ และเขียนโค้ดเว็บไซต์",
  "เริ่มจากทำ HTML Preview ก่อนขึ้น Next.js จริง",
  "เชื่อมฐานข้อมูล Supabase และ Deploy ด้วย Vercel",
  "สอนโดยคนทำ Digital Agency จริง ประสบการณ์ 8+ ปี",
];

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-copy js-reveal">
          <span className="pill">
            <span className="dot" /> คอร์สสอนสด · รับจำนวนจำกัด
          </span>
          <h1>
            สร้างเว็บไซต์ <span className="g-text">Custom Code</span>
            <br />
            ด้วย AI
          </h1>
          <p className="hero-sub">
            เรียนตั้งแต่วางโครง ดีไซน์ ทำ HTML Preview ขึ้น Next.js เชื่อม Supabase จน Deploy
            เว็บออนไลน์จริง
          </p>
          <ul className="check-list hero-bullets">
            {bullets.map((b, i) => (
              <li key={i}>
                <span className="ck">✓</span> {b}
              </li>
            ))}
          </ul>
          <div className="hero-price">
            <span className="eyebrow">Early Bird</span>
            <span className="hero-price-now g-text">1,990.-</span>
            <span className="hero-price-was">2,590.-</span>
            <span className="pill">รับจำนวนจำกัด</span>
          </div>
          <div className="cta-row">
            <a className="btn btn-primary btn-block-sm" href="#pricing">
              สมัคร Early Bird →
            </a>
            <a className="btn btn-outline btn-block-sm" href="#pricing">
              สอบถามคอร์สเดี่ยว 1:1 ทาง LINE
            </a>
          </div>
        </div>

        <div className="hero-visual js-reveal">
          <figure className="heroimg">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1531403009284-440f080d1e12?w=1000&q=80&auto=format&fit=crop"
              alt="บรรยากาศการทำเว็บไซต์ด้วย AI"
              width={1000}
              height={850}
            />
            <figcaption className="img-note">ภาพตัวอย่าง — แทนด้วยรูปจริงภายหลัง</figcaption>
          </figure>
          <div className="float float-tl">
            <b className="g-text">▲ Deployed</b> · Vercel · Live
          </div>
          <div className="float float-br">
            <b>6 คลาสสด</b>
            <br />
            <span className="text-dim">สไลด์ · การบ้าน · ตรวจงาน</span>
          </div>
        </div>
      </div>
    </section>
  );
}
