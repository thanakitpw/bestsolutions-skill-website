import { XCircle } from "@/components/icons";

const pains = [
  "ใช้ AI แล้วได้โค้ดมา แต่ไม่รู้ว่าแต่ละส่วนทำงานอย่างไร",
  "เว็บที่ AI สร้างให้ดูไม่เป็นมืออาชีพ",
  "ไม่รู้ว่าควรวางโครงหน้าเว็บอย่างไรก่อนเริ่มเขียนโค้ด",
  "ไม่เข้าใจพื้นฐาน Design — Layout, Spacing, Typography และ Responsive",
  "อยากทำเว็บด้วย Next.js แต่ไม่รู้จะเริ่มจากตรงไหน",
  "อยากเชื่อมฐานข้อมูลด้วย Supabase แต่ไม่เข้าใจ Workflow",
  "Deploy เว็บแล้ว Error แต่ไม่รู้จะแก้อย่างไร",
  "ไม่มีคนตรวจงานหรือช่วยตอบเวลาติดปัญหา",
];

export function Problem() {
  return (
    <section className="section section--alt" id="problem">
      <div className="container">
        <div className="section-head js-reveal">
          <span className="eyebrow">Problem</span>
          <h2>อยากใช้ AI ทำเว็บไซต์ แต่ไม่รู้จะเริ่มจากตรงไหน?</h2>
          <p>
            หลายคนเริ่มจากการสั่ง AI ให้เขียนโค้ดทันที แต่กลับเจอปัญหาเดิม ๆ — เว็บดูไม่สวย
            โครงสร้างไม่ชัด โค้ดแก้ต่อยาก เชื่อมฐานข้อมูลไม่เป็น หรือ Deploy แล้ว Error
            เพราะยังไม่มี Workflow ที่ชัดเจนในการสั่งงาน AI และไม่เข้าใจพื้นฐานที่จำเป็น
          </p>
        </div>
        <div className="pain-grid js-reveal">
          {pains.map((p, i) => (
            <div className="card pain" key={i}>
              <span className="icon-tile sm pain-ic">
                <XCircle />
              </span>
              <p>{p}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
