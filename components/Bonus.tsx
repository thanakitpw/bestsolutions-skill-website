import {
  Doc,
  Play,
  Bolt,
  Layers,
  Database,
  Layout,
  Clipboard,
  CheckSquare,
  Users,
} from "@/components/icons";

const bonus = [
  { Icon: Doc, t: "Slide ทุกคลาส", d: "สไลด์ประกอบการสอนครบทุกคลาส" },
  { Icon: Play, t: "Replay ย้อนหลัง", d: "ทบทวนซ้ำได้หลังคลาสสด" },
  { Icon: Bolt, t: "Vibe Code Prompt Pack", d: "ชุด Prompt สำหรับวาง Brief, Design และแก้โค้ด" },
  { Icon: Layers, t: "Starter Template", d: "โครงหน้าเว็บและ Next.js เริ่มต้นพร้อมใช้" },
  { Icon: Database, t: "Tracking Checklist", d: "รายการติดตั้ง GA4, Google Tag และ Search Console" },
  { Icon: Layout, t: "HTML Preview Template", d: "เทมเพลตหน้าเว็บสำหรับ Preview" },
  { Icon: Clipboard, t: "Website Checklist", d: "เช็คลิสต์ก่อน Deploy ใช้งานจริง" },
  { Icon: CheckSquare, t: "Consult หลังเรียนจบ", d: "ช่วยดูทิศทางโปรเจกต์และการต่อยอดหลังเรียน" },
  { Icon: Users, t: "Community ถามต่อได้", d: "กลุ่มถามตอบและแลกเปลี่ยนหลังจบคอร์ส" },
];

export function Bonus() {
  return (
    <section className="section section--alt" id="bonus">
      <div className="container">
        <div className="section-head js-reveal">
          <span className="eyebrow">Bonus</span>
          <h2>
            นอกจากเรียนสด ยังได้รับ<span className="g-text">เครื่องมือช่วยต่อยอดครบชุด</span>
          </h2>
        </div>
        <div className="grid grid-3 js-reveal">
          {bonus.map(({ Icon, t, d }, i) => (
            <div className="card card-hover bonus-card" key={i}>
              <span className="icon-tile">
                <Icon />
              </span>
              <h3>{t}</h3>
              <p>{d}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
