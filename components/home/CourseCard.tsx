import type { Course } from "./courses";

export function CourseCard({ course }: { course: Course }) {
  return (
    <a className="card card-hover course-card" href={course.href}>
      <span className="pill">
        <span className="dot" /> {course.tag}
      </span>
      <h3 className="course-card-title">{course.title}</h3>
      <p className="text-dim">{course.subtitle}</p>
      <ul className="check-list course-card-list">
        {course.bullets.map((b, i) => (
          <li key={i}>
            <span className="ck">✓</span> {b}
          </li>
        ))}
      </ul>
      <div className="course-card-foot">
        <span className="course-card-price">
          <b className="g-text">{course.priceNow}</b>{" "}
          <s className="text-dim">{course.priceWas}</s>
        </span>
        <span className="course-card-cta">ดูรายละเอียด →</span>
      </div>
      <span className="course-card-date text-dim">📅 {course.schedule}</span>
    </a>
  );
}
