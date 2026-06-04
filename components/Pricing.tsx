const groupFeatures = [
  "เรียนสด 2 วัน รวม 10 ชั่วโมง",
  "ราคา Early Bird 2,990.- จากปกติ 4,990.-",
  "Early Bird รับจำกัด 10 ที่นั่ง",
  "สมัคร 2 คน เหลือคนละ 2,590.-",
  "สไลด์ + Replay ดูย้อนหลัง",
  "Prompt Pack + Starter Template",
  "Consult หลังเรียนจบ + Community ถามตอบ",
];

const privateFeatures = [
  "เรียนแบบส่วนตัว 1:1",
  "เลือกวันเวลาเรียนเองได้",
  "โฟกัสเว็บไซต์หรือเป้าหมายอาชีพของคุณ",
  "ช่วยวาง Brief, Design Preview และ Next.js",
  "ช่วยดู Tracking และ Deploy ตามโจทย์",
  "เหมาะกับคนที่ต้องการความเร็วและการดูแลเฉพาะตัว",
];

const onsiteFeatures = [
  "สอนนอกสถานที่ / สอนองค์กร / สอนทีม",
  "เลือกวันเวลาและรูปแบบการเรียนได้",
  "ปรับเนื้อหาให้เหมาะกับทีมและประเภทธุรกิจ",
  "เหมาะกับทีม Marketing, Content, Design หรือ Digital",
  "มี Workshop จากโจทย์จริงขององค์กร",
  "ติดต่อประเมินราคาและรายละเอียดทาง LINE",
];

export function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section-head js-reveal">
          <span className="eyebrow">Pricing</span>
          <h2>
            เลือกรูปแบบการเรียน<span className="g-text">ที่เหมาะกับเป้าหมายของคุณ</span>
          </h2>
          <p>เรียนแบบกลุ่มในรอบ Bootcamp เลือก Private ที่จัดเวลาเองได้ หรือจัดสอนนอกสถานที่สำหรับทีม</p>
        </div>
        <div className="grid grid-3 pricing-grid js-reveal">
          <article className="pricing-card featured">
            <span className="pc-badge">แนะนำ</span>
            <span className="eyebrow">Group Class</span>
            <h3 className="pc-title">Vibe Code Bootcamp</h3>
            <p className="pc-date">📅 รอบสอน เสาร์–อาทิตย์ ที่ 27–28 มิถุนายน 2026</p>
            <div className="pc-price">
              <span className="pc-now g-text">2,990.-</span>
              <span className="pc-was">4,990.-</span>
            </div>
            <p className="pc-save">Early Bird รับจำกัด 10 ที่นั่ง · มา 2 คน เหลือคนละ 2,590.-</p>
            <p className="pc-for">
              เหมาะกับคนที่อยากเริ่มทำเว็บด้วย AI แบบเป็นระบบ มีเว็บเป็นผลงาน และมี Community ถามต่อ
            </p>
            <ul className="check-list pc-list">
              {groupFeatures.map((f, i) => (
                <li key={i}>
                  <span className="ck">✓</span> {f}
                </li>
              ))}
            </ul>
            <a className="btn btn-primary" href="https://lin.ee/Q22m30X" target="_blank" rel="noopener noreferrer" data-cta="line">
              สมัคร Group Class
            </a>
          </article>

          <article className="pricing-card">
            <span className="eyebrow">Private Class</span>
            <h3 className="pc-title">เรียนเดี่ยว 1:1</h3>
            <div className="pc-price">
              <span className="pc-now">6,990.-</span>
            </div>
            <p className="pc-save">เลือกเวลาเรียนเองได้</p>
            <p className="pc-for">
              เหมาะกับคนที่มีโจทย์เว็บจริง อยากให้สอนจับมือทำเฉพาะตามเป้าหมายของตัวเอง
            </p>
            <ul className="check-list pc-list">
              {privateFeatures.map((f, i) => (
                <li key={i}>
                  <span className="ck">✓</span> {f}
                </li>
              ))}
            </ul>
            <a className="btn btn-outline" href="https://lin.ee/Q22m30X" target="_blank" rel="noopener noreferrer" data-cta="line">
              สอบถาม Private Class
            </a>
          </article>

          <article className="pricing-card">
            <span className="eyebrow">On-site Training</span>
            <h3 className="pc-title">สอนนอกสถานที่ / องค์กร</h3>
            <div className="pc-price">
              <span className="pc-now">ติดต่อทาง LINE</span>
            </div>
            <p className="pc-save">เลือกเวลาและรูปแบบการสอนได้</p>
            <p className="pc-for">
              เหมาะกับทีมที่อยากอัปสกิล AI Website, Vibe Code และ Website Tracking พร้อมกัน
            </p>
            <ul className="check-list pc-list">
              {onsiteFeatures.map((f, i) => (
                <li key={i}>
                  <span className="ck">✓</span> {f}
                </li>
              ))}
            </ul>
            <a className="btn btn-outline" href="https://lin.ee/Q22m30X" target="_blank" rel="noopener noreferrer" data-cta="line">
              คุยรายละเอียด On-site
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
