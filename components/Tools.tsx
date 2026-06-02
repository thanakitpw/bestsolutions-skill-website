import { Info } from "@/components/icons";

const tools = [
  { m: "C", n: "Claude / Claude Code", c: "AI Coding" },
  { m: "AI", n: "Codex / ChatGPT", c: "AI Coding" },
  { m: "Cu", n: "Cursor", c: "AI Editor" },
  { m: "</>", n: "VS Code", c: "Code Editor" },
  { m: "N", n: "Node.js", c: "Runtime" },
  { m: "GH", n: "GitHub", c: "Version Control" },
  { m: "Nx", n: "Next.js", c: "Framework" },
  { m: "Sb", n: "Supabase", c: "Database" },
  { m: "▲", n: "Vercel", c: "Deploy / Hosting" },
];

export function Tools() {
  return (
    <section className="section section--alt" id="tools">
      <div className="container">
        <div className="section-head js-reveal">
          <span className="eyebrow">Tools</span>
          <h2>
            เครื่องมือ<span className="g-text">ที่ใช้ในคอร์ส</span>
          </h2>
          <p>ใช้เครื่องมือสาย AI Coding + Stack ทำเว็บจริงที่ Agency ใช้งาน</p>
        </div>
        <div className="grid grid-4 js-reveal">
          {tools.map((t, i) => (
            <div className="card tool-card" key={i}>
              <span className="icon-tile mono">{t.m}</span>
              <div>
                <b>{t.n}</b>
                <span>{t.c}</span>
              </div>
            </div>
          ))}
        </div>
        <div className="note-box js-reveal">
          <span className="icon-tile sm">
            <Info />
          </span>
          <p>
            <b style={{ color: "var(--text)" }}>หมายเหตุ:</b> คอร์สนี้ไม่รวมค่า AI Tool, Domain,
            Hosting หรือบริการเสริมภายนอก — ผู้เรียนใช้ Account ของตัวเองได้ เช่น Claude, Codex,
            ChatGPT, Cursor แนะนำให้มี AI Tool แบบเสียเงินอย่างน้อย 1 ตัว
            (ผู้สอนจะแนะนำก่อนเริ่มเรียน) ส่วน Supabase, Vercel และ GitHub
            เริ่มต้นด้วยแพ็กเกจฟรีได้
          </p>
        </div>
      </div>
    </section>
  );
}
