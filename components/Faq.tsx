const faqs = [
  {
    id: "faq1",
    q: "ไม่มีพื้นฐานเขียนโค้ด เรียนได้ไหม?",
    a: "เรียนได้ ถ้าใช้คอมพิวเตอร์พื้นฐานได้และพร้อมทำตามทีละขั้นตอน คอร์สนี้ใช้แนวทาง Vibe Code คือใช้ AI ช่วยคิด ออกแบบ เขียนโค้ด และแก้ Error แต่ผู้เรียนจะได้เข้าใจ Workflow ที่จำเป็นต่อการทำเว็บจริง",
  },
  {
    id: "faq2",
    q: "เรียน 2 วันจะพอทำเว็บได้จริงไหม?",
    a: "คอร์สนี้ออกแบบเป็น Bootcamp 2 วัน รวม 10 ชั่วโมง เน้นทำเว็บไซต์ 1 โปรเจกต์ให้จบ Workflow ตั้งแต่วาง Brief, Design Preview, Next.js, Tracking และ Deploy โดยไม่ได้ลงลึกทุกทฤษฎีเหมือนคอร์สระยะยาว",
  },
  {
    id: "faq3",
    q: "ต้องใช้ AI แบบเสียเงินไหม?",
    a: "แนะนำให้มี AI Tool แบบเสียเงินอย่างน้อย 1 ตัว เพื่อให้เรียนได้ลื่นขึ้น โดยเฉพาะการเขียนโค้ด แก้ Error และปรับหน้าเว็บ ผู้สอนจะแนะนำตัวเลือกที่เหมาะสมก่อนเริ่มเรียน",
  },
  {
    id: "faq4",
    q: "คอร์สนี้รวมค่า AI Tool, Domain หรือ Hosting ไหม?",
    a: "ไม่รวมค่า AI Tool, Domain, Hosting หรือบริการเสริมภายนอก ผู้เรียนใช้ Account ของตัวเองได้ ส่วน GitHub, Supabase, Vercel และ Google Tools หลายส่วนเริ่มต้นด้วยแพ็กเกจฟรีได้",
  },
  {
    id: "faq5",
    q: "เรียนแล้วได้เว็บไซต์จริงไหม?",
    a: "ได้ ผู้เรียนจะได้ทำโปรเจกต์เว็บไซต์ของตัวเอง ตั้งแต่ Design Preview, Next.js, Tracking พื้นฐาน จน Deploy ขึ้นออนไลน์",
  },
  {
    id: "faq6",
    q: "Tracking Website สอนอะไรบ้าง?",
    a: "สอนภาพรวมและการติดตั้งพื้นฐาน เช่น Google Analytics 4, Google Tag / Google Tag Manager, Google Search Console, PageSpeed Insights และแนวคิด Key Event เช่น กดปุ่ม LINE ส่งฟอร์ม หรือคลิก CTA",
  },
  {
    id: "faq7",
    q: "มีดูย้อนหลังและถามต่อไหม?",
    a: "มี Replay สำหรับทบทวนย้อนหลัง และมี Community สำหรับถามตอบหลังเรียน รวมถึง Consult หลังเรียนจบเพื่อช่วยดูทิศทางโปรเจกต์และการต่อยอด",
  },
  {
    id: "faq8",
    q: "Group Class กับ Private Class ต่างกันอย่างไร?",
    a: "Group Class เรียนตามรอบ Bootcamp ราคา Early Bird 2,990.- จากปกติ 4,990.- รับจำกัด 10 ที่นั่ง และถ้ามา 2 คนเหลือคนละ 2,590.- ส่วน Private Class ราคา 6,990.- ต่อคน เลือกเวลาเรียนเองได้และโฟกัสโจทย์ของผู้เรียนมากกว่า",
  },
  {
    id: "faq9",
    q: "มีสอนนอกสถานที่ไหม?",
    a: "มีแบบ On-site Training สำหรับองค์กร ทีม หรือกลุ่มที่ต้องการให้ไปสอนนอกสถานที่ สามารถเลือกเวลาและปรับเนื้อหาให้เหมาะกับทีมได้ ติดต่อรายละเอียดทาง LINE",
  },
  {
    id: "faq10",
    q: "เรียนจบแล้วเอาไปสมัครงานหรือรับงานได้ไหม?",
    a: "คอร์สนี้วางให้ผู้เรียนมีเว็บจริงเป็น Portfolio และเข้าใจ Workflow ที่ต่อยอดได้ ทั้งสมัครงาน รับงานทำเว็บ Landing Page ทำเว็บธุรกิจ หรือสร้างรายได้เสริม แต่การรับงานจริงควรฝึกทำเพิ่มและเรียนรู้การคุย Scope งานกับลูกค้าต่อ",
  },
];

export function Faq() {
  return (
    <section className="section section--alt" id="faq">
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
  );
}
