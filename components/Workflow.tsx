const flow = ["Brief", "Structure", "Design", "HTML Preview", "Next.js", "Supabase", "Deploy"];

const steps = [
  { n: "01", t: "Brief", d: "กำหนดว่าเว็บนี้ทำเพื่อใคร มีเป้าหมายอะไร และต้องมีฟีเจอร์อะไรบ้าง" },
  { n: "02", t: "Structure", d: "วางโครงหน้าเว็บ Sitemap, Section, User Flow และตำแหน่ง CTA" },
  { n: "03", t: "Design", d: "เข้าใจพื้นฐาน Design — Layout, สี, Font, Spacing และ Responsive" },
  { n: "04", t: "HTML Preview", d: "ใช้ AI สร้างหน้าเว็บเป็น HTML เพื่อดูดีไซน์ก่อนขึ้นระบบจริง" },
  { n: "05", t: "Next.js", d: "แปลง HTML เป็น Component และขึ้นโปรเจกต์ Next.js จริง" },
  { n: "06", t: "Supabase", d: "เชื่อม Database, Form และระบบจัดเก็บข้อมูลเบื้องต้น" },
  { n: "07", t: "Deploy", d: "Deploy เว็บขึ้นออนไลน์ พร้อมตรวจสอบก่อนใช้งานจริง" },
];

export function Workflow() {
  return (
    <section className="section" id="workflow">
      <div className="container">
        <div className="section-head js-reveal">
          <span className="eyebrow">Solution</span>
          <h2>
            คอร์สนี้จะสอนให้คุณทำเว็บด้วย AI <span className="g-text">แบบมีระบบ</span>
          </h2>
          <p>
            ไม่ได้สอนแค่ Prompt ให้ AI เขียนโค้ด แต่พาคุณทำเว็บด้วย Workflow ที่ใช้ได้จริง
            ตั้งแต่วาง Brief จนถึง Deploy ขึ้นออนไลน์
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
