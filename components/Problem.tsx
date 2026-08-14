import {
  Bot,
  Briefcase,
  Bug,
  Chart,
  Code,
  Palette,
  Sitemap,
  Wand,
} from "@/components/icons";

const pains = [
  {
    Icon: Bot,
    title: "AI สร้างเว็บให้แล้ว แต่ยังใช้งานจริงไม่ได้",
    text: "ไม่รู้ว่าควรแก้ส่วนไหนก่อน เพื่อให้หน้าเว็บพร้อมใช้จริง",
  },
  {
    Icon: Wand,
    title: "หน้าตาเว็บยังไม่เป็นมืออาชีพ",
    text: "เว็บดูเหมือน demo มากกว่างานที่ใช้ขายหรือส่งลูกค้าได้",
  },
  {
    Icon: Sitemap,
    title: "โครงหน้าเว็บและ CTA ยังไม่ชัด",
    text: "ไม่แน่ใจว่าควรเรียง section, กลุ่มเป้าหมาย และปุ่มหลักอย่างไร",
  },
  {
    Icon: Palette,
    title: "พื้นฐาน Design ยังไม่แน่น",
    text: "Layout, Spacing, Typography และ Responsive ยังแก้แบบเดาสุ่ม",
  },
  {
    Icon: Code,
    title: "เริ่ม Next.js แล้วจัดโปรเจกต์ไม่ถูก",
    text: "ไม่รู้ว่าจะสั่ง AI แยก component และวางโครงไฟล์อย่างไร",
  },
  {
    Icon: Chart,
    title: "ทำเว็บเสร็จแล้วแต่วัดผลไม่ได้",
    text: "ไม่รู้ว่าคนเข้าเว็บไหม กดปุ่มอะไร หรือควร track event ไหน",
  },
  {
    Icon: Bug,
    title: "Deploy แล้ว Error แต่แก้ไม่ออก",
    text: "ไม่เข้าใจสาเหตุจาก log และไม่รู้จะให้ AI ช่วย debug ยังไง",
  },
  {
    Icon: Briefcase,
    title: "ยังต่อยอดเป็น Portfolio ไม่ชัด",
    text: "อยากใช้สมัครงาน รับงาน หรือขายบริการ แต่ไม่รู้จะเล่างานอย่างไร",
  },
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
          {pains.map(({ Icon, title, text }, i) => (
            <div className="pain" key={i}>
              <span className="pain-ic">
                <Icon />
              </span>
              <div>
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
