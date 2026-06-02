import { Star, Video, Play, Chat } from "@/components/icons";

const stats = [
  { Icon: Star, big: "สอนแบบจับมือทำ", sub: "ทำตามได้ทีละขั้น" },
  { Icon: Video, big: "2 วัน · 10 ชั่วโมง", sub: "เรียนสดแบบเข้มข้น" },
  { Icon: Play, big: "Deploy + Tracking", sub: "ทำเว็บให้วัดผลได้" },
  { Icon: Chat, big: "Consult + Community", sub: "ถามต่อหลังเรียนจบ" },
];

export function TrustBar() {
  return (
    <section className="trustbar">
      <div className="container trustbar-inner">
        {stats.map(({ Icon, big, sub }, i) => (
          <div className="stat-chip" key={i}>
            <span className="icon-tile sm">
              <Icon />
            </span>
            <div>
              <b>{big}</b>
              <span>{sub}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
