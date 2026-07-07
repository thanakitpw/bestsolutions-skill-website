import type { Course } from "./courses";

export function CourseCard({ course }: { course: Course }) {
  return (
    <a className="card card-hover course-card" href={course.href}>
      <div className="course-card-shot">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={course.image} alt={course.title} loading="lazy" />
        <span className="pill course-card-tag">
          <span className="dot" /> {course.tag}
        </span>
      </div>
      <div className="course-card-body">
        <div className="course-card-head">
          <h3 className="course-card-title">{course.title}</h3>
          <p className="text-dim course-card-sub">{course.subtitle}</p>
        </div>
        <ul className="check-list course-card-list">
          {course.bullets.map((b, i) => (
            <li key={i}>
              <span className="ck">✓</span> {b}
            </li>
          ))}
        </ul>
        <div className="course-card-foot">
          <span className="course-card-date">
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7v5l3 2" />
            </svg>
            {course.schedule}
          </span>
          <div className="course-card-buy">
            <span className="course-card-price">
              <b className="g-text">{course.priceNow}</b>
              {course.priceWas ? <s className="text-dim">{course.priceWas}</s> : null}
            </span>
            <span className="course-card-cta">ดูรายละเอียด →</span>
          </div>
        </div>
      </div>
    </a>
  );
}
