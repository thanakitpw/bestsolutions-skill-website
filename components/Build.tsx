const examples = [
  "เว็บไซต์ธุรกิจ",
  "Landing Page ขายบริการ",
  "Portfolio Website",
  "เว็บรับ Lead + ฟอร์มติดต่อ",
  "เว็บสมัครงาน / Personal Brand",
  "เว็บที่ติด Tracking วัดผลได้",
];

const outcomes = [
  "โครงสร้างเว็บไซต์ของตัวเอง",
  "Design Preview ก่อนขึ้นงานจริง",
  "โปรเจกต์ Next.js ที่เป็นเว็บจริง",
  "โค้ดบน GitHub ที่จัดการด้วย Git เป็น (commit / push)",
  "ฟอร์ม / ระบบรับ Lead เบื้องต้น",
  "เว็บไซต์ที่ Deploy ขึ้นออนไลน์ได้",
  "Tracking พื้นฐานเพื่อดู Traffic และ Conversion",
  "แนวทางต่อยอดเป็น Portfolio สมัครงาน รับงาน หรือสร้างรายได้",
];

export function Build() {
  return (
    <section className="section section--alt" id="build">
      <div className="container">
        <div className="section-head js-reveal">
          <span className="eyebrow">What you&apos;ll build</span>
          <h2>
            เรียนจบแล้วคุณจะมี<span className="g-text">เว็บไซต์จริง 1 โปรเจกต์</span>
          </h2>
          <p>
            เลือกโปรเจกต์ของตัวเอง แล้วทำตามทีละขั้นจนจบ โดยใช้ AI ช่วยวางโครง ออกแบบ เขียนโค้ด
            แก้ Error ติดตั้ง Tracking และปรับให้พร้อมใช้งานจริง
          </p>
        </div>
        <div className="grid grid-2 build-grid js-reveal">
          <div className="card">
            <h3 className="build-h">ตัวอย่างเว็บที่ทำได้</h3>
            <div className="tag-cloud">
              {examples.map((e, i) => (
                <span className="tag" key={i}>
                  {e}
                </span>
              ))}
            </div>
          </div>
          <div className="card">
            <h3 className="build-h">ผลลัพธ์ที่คุณจะได้</h3>
            <ul className="check-list">
              {outcomes.map((o, i) => (
                <li key={i}>
                  <span className="ck">✓</span> {o}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
