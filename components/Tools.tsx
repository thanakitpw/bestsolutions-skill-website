import { Info } from "@/components/icons";

const aiTools = [
  { logo: "/logos/claude.svg", n: "Claude", c: "วางแผนและช่วยเขียนโค้ด" },
  { logo: "/logos/openai.svg", n: "ChatGPT / Codex", c: "คิด Prompt, Refactor, Debug" },
  { logo: "/logos/googlegemini.svg", n: "Gemini", c: "ช่วยคิดและตรวจงาน" },
  { logo: "/logos/google.svg", n: "Google Stitch", c: "ช่วยสำรวจไอเดีย UI" },
  { logo: "/logos/figma.svg", n: "Figma Make", c: "ต่อยอดงาน Design" },
  { logo: "/logos/figma.svg", n: "Figma MCP", c: "เชื่อม Design กับ Workflow" },
  { logo: "/logos/markdown.svg", n: "design.md", c: "บันทึก Design System" },
  { logo: "/logos/markdown.svg", n: "skill.md", c: "สร้าง Skill / Prompt Workflow" },
];

const buildTools = [
  { logo: "/logos/visualstudiocode.svg", n: "VS Code", c: "Code Editor" },
  { logo: "/logos/nodedotjs.svg", n: "Node.js", c: "Runtime" },
  { logo: "/logos/github.svg", n: "GitHub", c: "Version Control" },
  { logo: "/logos/nextdotjs.svg", n: "Next.js", c: "Framework" },
  { logo: "/logos/supabase.svg", n: "Supabase", c: "Lead Form / Database" },
  { logo: "/logos/vercel.svg", n: "Vercel", c: "Deploy / Hosting" },
];

const trackingTools = [
  { logo: "/logos/googleanalytics.svg", n: "Google Analytics 4", c: "ดู Traffic, Users และ Events" },
  { logo: "/logos/googletagmanager.svg", n: "Google Tag / GTM", c: "ติดตั้งและจัดการ Tracking" },
  { logo: "/logos/googlesearchconsole.svg", n: "Search Console", c: "ดู SEO, Indexing และ Query" },
  { logo: "/logos/pagespeedinsights.svg", n: "PageSpeed Insights", c: "ตรวจ Performance และ Core Web Vitals" },
];

function ToolGrid({ tools }: { tools: typeof aiTools }) {
  return (
    <div className="grid grid-4 js-reveal">
      {tools.map((t, i) => (
        <div className="card tool-card tool-card--stack" key={i}>
          <span className="tool-logo">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={t.logo} alt={`${t.n} logo`} width={28} height={28} />
          </span>
          <div>
            <b>{t.n}</b>
            <span>{t.c}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export function Tools() {
  return (
    <section className="section section--alt" id="tools">
      <div className="container">
        <div className="section-head js-reveal">
          <span className="eyebrow">Tools Update</span>
          <h2>
            เครื่องมือ<span className="g-text">ที่ใช้ในคอร์ส</span>
          </h2>
          <p>
            ไม่ได้สอนแยกเป็นเครื่องมือทีละตัว แต่แทรกเครื่องมือเหล่านี้ใน Workflow จริง
            ตั้งแต่ Research, Design, Vibe Code, Tracking จน Deploy
          </p>
        </div>

        <div className="tool-group">
          <div className="tool-group-head js-reveal">
            <span className="eyebrow">AI Tools</span>
            <h3>เครื่องมือช่วย Vibe Code และออกแบบ Workflow</h3>
          </div>
          <ToolGrid tools={aiTools} />
        </div>

        <div className="tool-group">
          <div className="tool-group-head js-reveal">
            <span className="eyebrow">Build Stack</span>
            <h3>เครื่องมือสำหรับขึ้นเว็บจริงและ Deploy</h3>
          </div>
          <ToolGrid tools={buildTools} />
        </div>

        <div className="tool-group">
          <div className="tool-group-head js-reveal">
            <span className="eyebrow">Website Tracking</span>
            <h3>เครื่องมือ Google สำหรับวัดผลเว็บไซต์</h3>
          </div>
          <ToolGrid tools={trackingTools} />
        </div>

        <div className="note-box js-reveal">
          <span className="icon-tile sm">
            <Info />
          </span>
          <p>
            <b style={{ color: "var(--text)" }}>หมายเหตุ:</b> AI Tools ไม่ได้ถูกสอนแบบแยกเป็นเครื่องมือ
            แต่จะแทรกอยู่ในแต่ละขั้นตอนตามความเหมาะสมของงาน เช่น UX Research, User Flow,
            Design System, HTML Preview, Vibe Code, Debug, Tracking และ Portfolio
            ผู้เรียนควรมี AI Tool แบบเสียเงินอย่างน้อย 1 ตัวเพื่อให้เรียนได้ลื่นขึ้น
          </p>
        </div>
      </div>
    </section>
  );
}
