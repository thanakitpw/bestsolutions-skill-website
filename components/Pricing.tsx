const groupFeatures = [
  "เรียนสดแบบกลุ่ม 6 คลาส",
  "สไลด์ + Replay ดูย้อนหลัง",
  "การบ้านทุกสัปดาห์ + ตรวจงานในกลุ่ม",
  "Prompt Pack + Starter Template",
  "Website Checklist ก่อน Deploy",
  "Community ถามตอบตลอดคอร์ส",
];

const privateFeatures = [
  "เรียนแบบส่วนตัว 1:1",
  "โฟกัสเว็บไซต์ที่คุณต้องการทำ",
  "ช่วยวางโครง + ทำ Design Preview",
  "ช่วยขึ้น Next.js + เชื่อม Supabase",
  "สอนจับมือทำทีละขั้นตอน",
  "นัดเรียนนอกสถานที่ได้ (สอบถามทาง LINE)",
];

export function Pricing() {
  return (
    <section className="section" id="pricing">
      <div className="container">
        <div className="section-head js-reveal">
          <span className="eyebrow">Pricing</span>
          <h2>
            เลือกรูปแบบการเรียน<span className="g-text">ที่เหมาะกับคุณ</span>
          </h2>
          <p>เริ่มแบบกลุ่มในราคา Early Bird หรือเลือกคอร์สเดี่ยวจับมือทำเฉพาะตัว</p>
        </div>
        <div className="grid grid-2 pricing-grid js-reveal">
          <article className="pricing-card featured">
            <span className="pc-badge">แนะนำ</span>
            <span className="eyebrow">Group Class</span>
            <h3 className="pc-title">เรียนสดแบบกลุ่ม</h3>
            <div className="pc-price">
              <span className="pc-now g-text">1,990.-</span>
              <span className="pc-was">2,590.-</span>
            </div>
            <p className="pc-for">
              เหมาะกับคนที่อยากเริ่มทำเว็บด้วย AI มีเว็บเป็นผลงาน และอยากมี Community
            </p>
            <ul className="check-list pc-list">
              {groupFeatures.map((f, i) => (
                <li key={i}>
                  <span className="ck">✓</span> {f}
                </li>
              ))}
            </ul>
            <a className="btn btn-primary" href="#" data-cta="line">
              สมัครเรียนกลุ่ม Early Bird
            </a>
          </article>

          <article className="pricing-card">
            <span className="eyebrow">Private Class</span>
            <h3 className="pc-title">เรียนเดี่ยว 1:1</h3>
            <div className="pc-price">
              <span className="pc-now">เริ่มต้น 6,990.-</span>
            </div>
            <p className="pc-for">
              เหมาะกับคนที่มีโปรเจกต์เว็บจริง อยากให้สอนจับมือทำเฉพาะตามโจทย์ของตัวเอง
            </p>
            <ul className="check-list pc-list">
              {privateFeatures.map((f, i) => (
                <li key={i}>
                  <span className="ck">✓</span> {f}
                </li>
              ))}
            </ul>
            <a className="btn btn-outline" href="#" data-cta="line">
              สอบถามคอร์สเดี่ยวทาง LINE
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
