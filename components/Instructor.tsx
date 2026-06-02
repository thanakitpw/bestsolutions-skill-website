import { Users } from "@/components/icons";

const points = [
  "มีประสบการณ์ทำเว็บไซต์และการตลาดออนไลน์ให้ธุรกิจจริง",
  "เข้าใจทั้งมุม Design, Development และ Marketing",
  "เคยทำงานแบบ Agency รับโจทย์จากลูกค้าจริง",
  "สอนจาก Workflow การทำงานจริง ไม่ใช่แค่ทฤษฎี",
  "เน้นให้ผู้เรียนเข้าใจและทำตามได้ทีละขั้นตอน",
];

export function Instructor() {
  return (
    <section className="section" id="instructor">
      <div className="container">
        <div className="section-head js-reveal">
          <span className="eyebrow">Instructor</span>
          <h2>
            สอนโดยคนทำ Agency จริง <span className="g-text">ประสบการณ์กว่า 8 ปี</span>
          </h2>
        </div>
        <div className="grid grid-2 instructor-grid js-reveal">
          <div className="instructor-photo">
            <div className="instructor-ph-inner">
              <Users />
              <span className="instructor-name">ทีม Best Solutions</span>
              <span className="img-note-inline">ใส่รูปผู้สอน/ทีมจริงภายหลัง</span>
            </div>
          </div>
          <div>
            <ul className="check-list instructor-points">
              {points.map((p, i) => (
                <li key={i}>
                  <span className="ck">✓</span> {p}
                </li>
              ))}
            </ul>
            <blockquote className="instructor-quote">
              “แอดมินทำ Agency รับทำเว็บไซต์และการตลาดออนไลน์มากว่า 8 ปี
              คอร์สนี้เลยไม่ได้สอนแบบทฤษฎี แต่จะพาทำเว็บจากศูนย์แบบที่ใช้ทำงานจริง
              ตั้งแต่วางโครง ดีไซน์ ใช้ AI ช่วยเขียนโค้ด จน Deploy เว็บขึ้นออนไลน์”
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
