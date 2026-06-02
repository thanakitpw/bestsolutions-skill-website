type ClassItem = {
  id: string;
  n: string;
  name: string;
  items: string[];
  hwLabel: string;
  hw: string;
  open?: boolean;
};

const classes: ClassItem[] = [
  {
    id: "cls1",
    n: "Class 01",
    name: "พื้นฐานการทำเว็บไซต์ด้วย AI",
    open: true,
    items: [
      "เว็บ Custom Code คืออะไร และต่างจาก WordPress / No-code อย่างไร",
      "Next.js คืออะไร เหมาะกับงานแบบไหน",
      "Supabase คืออะไร ช่วยอะไรในเว็บไซต์",
      "AI Coding ใช้ทำอะไรได้บ้าง",
      "Workflow การทำเว็บจริงแบบ Agency",
      "เครื่องมือที่ต้องเตรียมก่อนเริ่มเรียน + วิธีวาง Project Brief",
    ],
    hwLabel: "การบ้าน:",
    hw: "เลือกโปรเจกต์เว็บไซต์ที่อยากทำ และเขียน Project Brief เบื้องต้น",
  },
  {
    id: "cls2",
    n: "Class 02",
    name: "วางโครงเว็บไซต์และพื้นฐาน Design",
    items: [
      "วาง Sitemap และ User Flow",
      "กำหนดหน้าและ Section ที่เว็บไซต์ควรมี",
      "พื้นฐาน Layout, Spacing, Typography, Color และ Visual Hierarchy",
      "Responsive Design เบื้องต้น",
      "การวาง CTA ให้คนกดติดต่อ + เลือก Reference และ Moodboard",
      "ใช้ AI ช่วยวิเคราะห์และวางโครงหน้าเว็บ",
    ],
    hwLabel: "การบ้าน:",
    hw: "ส่งโครงหน้าเว็บ พร้อม Section และ Reference Design ที่ต้องการ",
  },
  {
    id: "cls3",
    n: "Class 03",
    name: "ทำ HTML Design Preview ด้วย AI",
    items: [
      "วิธี Prompt ให้ AI สร้างหน้าเว็บ HTML",
      "ใช้ HTML / CSS / Tailwind เบื้องต้นสำหรับ Preview",
      "ทำ Hero Section ให้ดูน่าสนใจ + จัด Section ให้ดูมืออาชีพ",
      "ปรับสี Font และ Spacing",
      "ทำ Responsive เบื้องต้น + ใช้ AI ช่วยแก้และปรับ Design",
      "วิธีตรวจ Design ก่อนขึ้น Next.js จริง",
    ],
    hwLabel: "การบ้าน:",
    hw: "ส่ง HTML Preview หน้าแรกของเว็บไซต์",
  },
  {
    id: "cls4",
    n: "Class 04",
    name: "ขึ้นโปรเจกต์ Next.js จริง",
    items: [
      "สร้างโปรเจกต์ Next.js + เข้าใจโครงสร้าง Folder เบื้องต้น",
      "เข้าใจ App Router เบื้องต้น",
      "แปลง HTML Preview เป็น Component",
      "แยก Header, Hero, Section, Footer + จัด Layout ด้วย Component",
      "ใช้ AI ช่วย Refactor และแก้โค้ด",
      "วิธีอ่าน Error และให้ AI ช่วย Debug",
    ],
    hwLabel: "การบ้าน:",
    hw: "ส่งลิงก์ GitHub หรือ Screenshot เว็บไซต์ที่รันด้วย Next.js",
  },
  {
    id: "cls5",
    n: "Class 05",
    name: "เชื่อม Supabase และทำระบบรับข้อมูล",
    items: [
      "สร้าง Supabase Project + สร้าง Table สำหรับจัดเก็บข้อมูล",
      "เชื่อม Next.js กับ Supabase + ตั้งค่า Environment Variables",
      "ทำ Contact Form หรือ Lead Form",
      "บันทึกข้อมูลจากหน้าเว็บเข้า Supabase + อ่านข้อมูลจาก Database",
      "พื้นฐาน Auth / Storage ตามความเหมาะสมของโปรเจกต์",
      "ใช้ AI ช่วยเขียนและแก้โค้ดส่วน Database",
    ],
    hwLabel: "การบ้าน:",
    hw: "ทำฟอร์มที่สามารถส่งข้อมูลเข้า Supabase ได้จริง",
  },
  {
    id: "cls6",
    n: "Class 06",
    name: "Deploy, ตรวจงาน และปรับเว็บให้พร้อมใช้งานจริง",
    items: [
      "Deploy เว็บไซต์ขึ้น Vercel + ตั้งค่า Environment Variables บนระบบจริง",
      "ตรวจ Error หลัง Deploy + ตรวจ Responsive บนมือถือ",
      "Checklist ก่อนใช้งานจริง",
      "ใช้ AI ช่วยตรวจ UX / UI / Code",
      "Review งานผู้เรียน",
      "แนวทางต่อยอดเป็นผลงานหรือรับงานจริง",
    ],
    hwLabel: "การบ้านสุดท้าย:",
    hw: "ส่งเว็บไซต์ Final ที่ Deploy ขึ้นออนไลน์เรียบร้อย",
  },
];

export function Curriculum() {
  return (
    <section className="section" id="curriculum">
      <div className="container">
        <div className="section-head js-reveal">
          <span className="eyebrow">Curriculum</span>
          <h2>
            หลักสูตรเรียนสด <span className="g-text">6 คลาส</span> แบบจับมือทำ
          </h2>
          <p>
            แต่ละคลาสมีการบ้านและตรวจงาน เพื่อให้คุณได้ลงมือทำเว็บของตัวเองจริง ๆ
            คลิกแต่ละคลาสเพื่อดูรายละเอียด
          </p>
        </div>
        <div className="accordion curriculum js-reveal" data-accordion>
          {classes.map((c) => (
            <div className="acc-item" key={c.id}>
              <h3 className="acc-h">
                <button
                  className="acc-trigger"
                  aria-expanded={c.open ? "true" : "false"}
                  aria-controls={c.id}
                >
                  <span className="acc-title">
                    <span className="num">{c.n}</span>
                    <span className="acc-name">{c.name}</span>
                  </span>
                  <span className="sign" aria-hidden="true">
                    +
                  </span>
                </button>
              </h3>
              <div className="acc-panel" id={c.id} role="region">
                <div className="acc-panel-inner">
                  <ul className="acc-list">
                    {c.items.map((it, i) => (
                      <li key={i}>{it}</li>
                    ))}
                  </ul>
                  <p className="hw">
                    <b>{c.hwLabel}</b> {c.hw}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
