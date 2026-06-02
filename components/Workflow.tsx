const flow = ["Brief", "Design", "HTML Preview", "Next.js", "Tracking", "Deploy", "Career"];

const steps = [
  { n: "01", t: "Brief", d: "กำหนดเป้าหมายเว็บ กลุ่มเป้าหมาย จุดขาย และ CTA ให้ AI เข้าใจโจทย์" },
  { n: "02", t: "Design", d: "วาง Section, User Flow, Visual Direction และพื้นฐาน UX/UI ที่จำเป็น" },
  { n: "03", t: "HTML Preview", d: "ใช้ AI สร้างหน้าเว็บต้นแบบเพื่อดูหน้าตาและปรับงานก่อนขึ้นระบบจริง" },
  { n: "04", t: "Next.js", d: "แปลงหน้าเว็บเป็น Component และขึ้นโปรเจกต์ Next.js เบื้องต้น" },
  { n: "05", t: "Tracking", d: "ติดตั้ง GA4, Google Tag, Search Console และเข้าใจ Key Event สำคัญ" },
  { n: "06", t: "Deploy", d: "Deploy เว็บไซต์ขึ้น Vercel พร้อมตรวจ Responsive และ Performance เบื้องต้น" },
  { n: "07", t: "Career", d: "วางแนวทางใช้เว็บเป็น Portfolio สมัครงาน รับงาน หรือสร้างรายได้" },
];

export function Workflow() {
  return (
    <section className="section" id="workflow">
      <div className="container">
        <div className="section-head js-reveal">
          <span className="eyebrow">Solution</span>
          <h2>
            คอร์สนี้จะสอนให้คุณ Vibe Code <span className="g-text">แบบมีระบบ</span>
          </h2>
          <p>
            ไม่ได้สอนแค่ Prompt ให้ AI สร้างหน้าเว็บ แต่พาคุณทำเว็บด้วย Workflow ที่ใช้ได้จริง
            ตั้งแต่วาง Brief ออกแบบ ทำเว็บ ติด Tracking จน Deploy และรู้วิธีต่อยอดเป็นอาชีพ
          </p>
        </div>
        <ol className="flow js-reveal">
          {flow.map((f, i) => (
            <li key={i}>
              <span>{f}</span>
            </li>
          ))}
        </ol>
        <div className="grid step-grid js-reveal">
          {steps.map((s) => (
            <article className="card card-hover step-card" key={s.n}>
              <span className="num">{s.n}</span>
              <h3>{s.t}</h3>
              <p>{s.d}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
