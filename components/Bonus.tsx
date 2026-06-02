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
  { Icon: Bolt, t: "Prompt Pack", d: "ชุด Prompt สำหรับทำเว็บด้วย AI" },
  { Icon: Layers, t: "Starter Template", d: "โครง Next.js เริ่มต้นพร้อมใช้" },
  { Icon: Database, t: "Supabase Schema", d: "ตัวอย่าง Schema ฐานข้อมูล" },
  { Icon: Layout, t: "HTML Preview Template", d: "เทมเพลตหน้าเว็บสำหรับ Preview" },
  { Icon: Clipboard, t: "Website Checklist", d: "เช็คลิสต์ก่อน Deploy ใช้งานจริง" },
  { Icon: CheckSquare, t: "การบ้าน + ตรวจงาน", d: "มอบหมายงานและตรวจตามรอบที่กำหนด" },
  { Icon: Users, t: "Community", d: "กลุ่มถามตอบและแลกเปลี่ยน" },
];

export function Bonus() {
  return (
    <section className="section section--alt" id="bonus">
      <div className="container">
        <div className="section-head js-reveal">
          <span className="eyebrow">Bonus</span>
          <h2>
            นอกจากเรียนสด ยังได้รับ<span className="g-text">เครื่องมือช่วยเรียนครบชุด</span>
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
