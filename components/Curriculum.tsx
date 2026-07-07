type ClassItem = {
  id: string;
  n: string;
  name: string;
  time: string;
  items: string[];
  hwLabel: string;
  hw: string;
  open?: boolean;
};

const classes: ClassItem[] = [
  {
    id: "day1m1",
    n: "โมดูล 1",
    name: "Vibe Code Foundation",
    time: "",
    open: true,
    items: [
      "Vibe Code คืออะไร และใช้ AI ช่วยทำเว็บได้อย่างไร",
      "Workflow การทำเว็บไซต์ยุค AI ตั้งแต่ Brief จน Deploy",
      "เลือกประเภทเว็บที่จะทำ: Landing Page, Portfolio, เว็บธุรกิจ หรือเว็บรับ Lead",
      "วางเป้าหมายเว็บ กลุ่มเป้าหมาย จุดขาย และ CTA",
      "เขียน Project Brief ให้ AI เข้าใจโจทย์และบริบทของเว็บ",
    ],
    hwLabel: "Workshop:",
    hw: "เลือกโปรเจกต์เว็บไซต์ของตัวเอง และเขียน Project Brief พร้อมเป้าหมายเว็บ",
  },
  {
    id: "day1m2",
    n: "โมดูล 2",
    name: "Website Design & HTML Preview",
    time: "",
    items: [
      "วาง Sitemap, Section, User Flow และตำแหน่ง CTA",
      "พื้นฐาน UX/UI ที่จำเป็น: Layout, Typography, Color, Spacing และ Responsive",
      "ใช้ AI ช่วยสร้าง Wireframe และแนวทางหน้าตาเว็บไซต์",
      "Prompt ให้ AI สร้าง HTML Preview",
      "ปรับหน้าเว็บให้ดูน่าเชื่อถือและพร้อมขึ้นงานจริง",
    ],
    hwLabel: "Workshop:",
    hw: "สร้าง HTML Preview หรือหน้าเว็บต้นแบบของโปรเจกต์ตัวเอง",
  },
  {
    id: "day2m1",
    n: "โมดูล 3",
    name: "Build Website with Next.js",
    time: "",
    items: [
      "เข้าใจโครงสร้างโปรเจกต์ Next.js เบื้องต้น",
      "แปลง HTML Preview เป็น Component",
      "แก้ข้อความ รูป สี และ Section ด้วย AI",
      "พื้นฐาน Git: commit, push และเก็บโค้ดขึ้น GitHub Repository",
      "วิธีอ่าน Error และให้ AI ช่วย Debug",
      "เตรียมเว็บไซต์ให้พร้อม Deploy",
    ],
    hwLabel: "Workshop:",
    hw: "ขึ้นโปรเจกต์ Next.js เบื้องต้นจากหน้าเว็บที่ออกแบบไว้",
  },
  {
    id: "day2m2",
    n: "โมดูล 4",
    name: "Tracking, Deploy & Career Roadmap",
    time: "",
    items: [
      "ทำ Contact Form / Lead Form เบื้องต้น และแนวคิดการเชื่อม Supabase",
      "เชื่อม GitHub กับ Vercel เพื่อ Deploy อัตโนมัติทุกครั้งที่ push โค้ด",
      "Deploy เว็บไซต์ขึ้น Vercel",
      "ติดตั้ง Google Analytics 4, Google Tag และ Google Search Console พื้นฐาน",
      "รู้จัก PageSpeed Insights และการตรวจ Performance เบื้องต้น",
      "เข้าใจ Conversion / Key Event เช่น กดปุ่ม LINE, ส่งฟอร์ม หรือคลิก CTA",
      "ใช้เว็บเป็น Portfolio และวางแนวทางสมัครงาน รับงาน หรือต่อยอดธุรกิจ",
    ],
    hwLabel: "Final outcome:",
    hw: "ส่งเว็บที่ Deploy ออนไลน์ พร้อม Checklist การวัดผลและ Roadmap การต่อยอดหลังเรียน",
  },
];

export function Curriculum() {
  return (
    <section className="section" id="curriculum">
      <div className="container">
        <div className="section-head js-reveal">
          <span className="eyebrow">Curriculum</span>
          <h2>
            หลักสูตร <span className="g-text">4 โมดูล</span> เรียนตัวต่อตัว
          </h2>
          <p>
            เรียนตัวต่อตัว 1:1 รวม 5 ชั่วโมง ปรับจังหวะและเนื้อหาให้เหมาะกับผู้เรียน
            ครอบคลุมตั้งแต่วางไอเดีย ทำเว็บ ติด Tracking จน Deploy และต่อยอดอาชีพ
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
                    <span className="num">{c.time ? `${c.n} · ${c.time}` : c.n}</span>
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
