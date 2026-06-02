const points = [
  "มีประสบการณ์ทำเว็บไซต์และการตลาดออนไลน์ให้ธุรกิจจริง",
  "เข้าใจทั้งมุม Design, Development และ Marketing",
  "เคยทำงานแบบ Agency รับโจทย์จากลูกค้าจริง",
  "สอนจาก Workflow การทำงานจริง ตั้งแต่วาง Brief จนวัดผลหลังเว็บออนไลน์",
  "เน้นให้ผู้เรียนนำไปทำ Portfolio สมัครงาน รับงาน หรือต่อยอดธุรกิจได้",
];

export function Instructor() {
  return (
    <section className="section" id="instructor">
      <div className="container">
        <div className="section-head js-reveal">
          <span className="eyebrow">Instructor</span>
          <h2>
            สอนโดยทีมทำ Agency จริง <span className="g-text">ประสบการณ์กว่า 8 ปี</span>
          </h2>
        </div>
        <div className="grid grid-2 instructor-grid js-reveal">
          <div>
            <div className="instructor-photo">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/instructor.png" alt="Thanakit Chaithong (Bank)" width={1200} height={1200} />
            </div>
            <div className="instructor-caption">
              <span className="instructor-name">Thanakit Chaithong (Bank)</span>
              <span className="instructor-role">CEO &amp; Founder of Best Solution Skill</span>
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
              คอร์สนี้เลยไม่ได้สอนแค่ให้ AI สร้างหน้าเว็บ แต่จะพาทำ Workflow ที่ใช้ทำงานจริง
              ตั้งแต่วางโครง ดีไซน์ Vibe Code ติด Tracking จน Deploy และต่อยอดเป็นผลงาน”
            </blockquote>
          </div>
        </div>
      </div>
    </section>
  );
}
