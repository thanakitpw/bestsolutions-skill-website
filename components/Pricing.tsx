const LINE_URL = "https://lin.ee/Q22m30X";

const privateFeatures = [
  "เรียนตัวต่อตัว 1:1 รวม 5 ชั่วโมง",
  "เลือกวันเวลาเรียนเองได้",
  "โฟกัสเว็บไซต์หรือเป้าหมายอาชีพของคุณ",
  "ช่วยวาง Brief, Design Preview และ Next.js",
  "ช่วยดู Tracking และ Deploy ตามโจทย์",
  "Consult หลังเรียนจบ + ถามต่อได้",
];

const groupFeatures = [
  "มาเรียนเป็นกลุ่มเล็ก / กับเพื่อน",
  "ราคาพิเศษต่อคนเมื่อมาเป็นกลุ่ม",
  "จัดวันเวลาเรียนตามสะดวก",
  "เนื้อหาเดียวกับคลาสตัวต่อตัว",
  "เหมาะกับเพื่อน ทีมเล็ก หรือครอบครัว",
  "ทักไลน์เพื่อประเมินรอบและราคา",
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
          <p>เริ่มจากคลาสตัวต่อตัวที่จัดเวลาเองได้ มาเรียนเป็นกลุ่มเล็กในราคาพิเศษ หรือจัดสอนนอกสถานที่สำหรับทีม</p>
        </div>
        <div className="grid grid-3 pricing-grid js-reveal">
          <article className="pricing-card featured">
            <span className="pc-badge">แนะนำ</span>
            <span className="eyebrow">Private Class</span>
            <h3 className="pc-title">เรียนตัวต่อตัว 1:1</h3>
            <div className="pc-price">
              <span className="pc-now g-text">6,900.-</span>
            </div>
            <p className="pc-save">5 ชั่วโมง · เลือกวันเวลาเรียนเองได้</p>
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
            <a
              className="btn btn-primary"
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="line"
            >
              ทักไลน์เพื่อสมัคร
            </a>
          </article>

          <article className="pricing-card">
            <span className="eyebrow">Group Class</span>
            <h3 className="pc-title">เรียนเป็นกลุ่มเล็ก</h3>
            <div className="pc-price">
              <span className="pc-now">ทักไลน์</span>
            </div>
            <p className="pc-save">ราคาพิเศษต่อคนเมื่อมาเป็นกลุ่ม</p>
            <p className="pc-for">
              เหมาะกับเพื่อน ทีมเล็ก หรือครอบครัว ที่อยากเรียนทำเว็บด้วย AI ไปพร้อมกัน
            </p>
            <ul className="check-list pc-list">
              {groupFeatures.map((f, i) => (
                <li key={i}>
                  <span className="ck">✓</span> {f}
                </li>
              ))}
            </ul>
            <a
              className="btn btn-outline"
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="line"
            >
              ทักไลน์สอบถามกลุ่ม
            </a>
          </article>

          <article className="pricing-card">
            <span className="eyebrow">On-site Training</span>
            <h3 className="pc-title">สอนนอกสถานที่ / องค์กร</h3>
            <div className="pc-price">
              <span className="pc-now">ทักไลน์</span>
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
            <a
              className="btn btn-outline"
              href={LINE_URL}
              target="_blank"
              rel="noopener noreferrer"
              data-cta="line"
            >
              คุยรายละเอียด On-site
            </a>
          </article>
        </div>
      </div>
    </section>
  );
}
