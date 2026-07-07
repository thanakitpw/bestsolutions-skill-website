import { courses } from "./courses";

const LINE_URL = "https://lin.ee/Q22m30X";

// หน้าแรก: section คอร์ส — คำอธิบาย + ปุ่ม ด้านซ้าย, รูปด้านขวา
export function CourseFeature() {
  const course = courses[0];
  if (!course) return null;

  return (
    <section className="section section--alt" id="course-feature">
      <div className="container">
        <div className="feature-row">
          <div className="feature-copy js-reveal">
            <span className="eyebrow">Courses</span>
            <h2>{course.title}</h2>
            <p className="feature-desc">{course.subtitle}</p>
            <ul className="check-list feature-bullets">
              {course.bullets.map((b, i) => (
                <li key={i}>
                  <span className="ck">✓</span> {b}
                </li>
              ))}
            </ul>
            <p className="feature-price">
              <b className="g-text">{course.priceNow}</b>
              <span className="text-dim"> · {course.schedule}</span>
            </p>
            <div className="feature-actions">
              <a className="btn btn-primary" href={course.href}>
                ดูรายละเอียดคอร์ส →
              </a>
              <a
                className="btn btn-outline"
                href={LINE_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-cta="line"
              >
                ทักไลน์
              </a>
            </div>
          </div>
          <div className="feature-media js-reveal">
            <div className="feature-shot feature-shot--wide">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={course.image} alt={course.title} loading="lazy" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
