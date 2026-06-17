const points = [
  { t: "เรียนแล้วใช้ได้จริง", d: "ทุกคอร์สเน้นลงมือทำตามได้ทีละขั้น จบแล้วได้ผลงานจริงติดมือ" },
  { t: "ใช้ AI เป็นเครื่องมือ", d: "สอนวิธีใช้ AI ช่วยคิด ออกแบบ และเขียนโค้ด ให้ทำงานได้เร็วขึ้น" },
  { t: "มีพี่เลี้ยงหลังเรียน", d: "ถามต่อได้ผ่าน Community และ Consult ไม่ทิ้งกันหลังเรียนจบ" },
];

export function About() {
  return (
    <section className="section section--alt" id="about">
      <div className="container">
        <div className="section-head js-reveal">
          <span className="eyebrow">About</span>
          <h2>
            เกี่ยวกับ <span className="g-text">Best Solutions Skill</span>
          </h2>
          <p>
            เราเชื่อว่าทุกคนสร้างเว็บและผลงานดิจิทัลได้ ถ้ามีเครื่องมือ AI ที่ใช่
            และคนสอนที่จับมือทำไปด้วยกัน
          </p>
        </div>
        <div className="grid grid-3 js-reveal">
          {points.map((p, i) => (
            <div className="card" key={i}>
              <h3>{p.t}</h3>
              <p className="text-dim">{p.d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
