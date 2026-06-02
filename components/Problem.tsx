import { XCircle } from "@/components/icons";

const pains = [
  "ใช้ AI แล้วได้หน้าเว็บมา แต่ไม่รู้ว่าควรแก้ตรงไหนให้ใช้งานจริง",
  "เว็บที่ AI สร้างให้ดูไม่เป็นมืออาชีพ",
  "ไม่รู้ว่าควรวางโครงหน้าเว็บ กลุ่มเป้าหมาย และ CTA อย่างไร",
  "ไม่เข้าใจพื้นฐาน Design — Layout, Spacing, Typography และ Responsive",
  "อยากทำเว็บด้วย Next.js แต่ไม่รู้จะสั่ง AI และจัดโครงโปรเจกต์อย่างไร",
  "ทำเว็บเสร็จแล้วแต่ไม่รู้ว่าคนเข้าเว็บไหม หรือกดปุ่มอะไรบ้าง",
  "Deploy เว็บแล้ว Error แต่ไม่รู้จะแก้อย่างไร",
  "อยากใช้เว็บเป็น Portfolio รับงาน หรือสมัครงาน แต่ไม่รู้จะต่อยอดอย่างไร",
];

export function Problem() {
  return (
    <section className="section section--alt" id="problem">
      <div className="container">
        <div className="section-head js-reveal">
          <span className="eyebrow">Problem</span>
          <h2>อยากใช้ AI ทำเว็บไซต์ แต่ยังต่อยอดเป็นงานจริงไม่ได้?</h2>
          <p>
            หลายคนเริ่มจากการสั่ง AI ให้ทำเว็บทันที แต่กลับเจอปัญหาเดิม ๆ — เว็บดูไม่สวย
            โครงสร้างไม่ชัด แก้ต่อยาก Deploy แล้ว Error หรือทำเสร็จแล้ววัดผลไม่ได้
            เพราะยังไม่มี Workflow ที่ชัดเจนในการ Vibe Code และไม่เข้าใจพื้นฐานที่จำเป็น
            สำหรับการทำเว็บให้พร้อมใช้งานจริง
          </p>
        </div>
        <div className="pain-grid js-reveal">
          {pains.map((p, i) => (
            <div className="pain" key={i}>
              <span className="pain-ic">
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
