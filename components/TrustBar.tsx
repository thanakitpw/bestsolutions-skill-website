import { Star, Video, Play, Chat } from "@/components/icons";

const stats = [
  { Icon: Star, big: "8+ ปี", sub: "ประสบการณ์ Agency" },
  { Icon: Video, big: "เรียนสด 6 คลาส", sub: "จับมือทำทีละขั้น" },
  { Icon: Play, big: "สไลด์ + Replay", sub: "ทบทวนย้อนหลังได้" },
  { Icon: Chat, big: "Community", sub: "ถามตอบตลอดคอร์ส" },
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
