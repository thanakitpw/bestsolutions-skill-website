import { courses } from "./courses";
import { CourseCard } from "./CourseCard";

export function FeaturedCourses() {
  return (
    <section className="section section--alt" id="courses-preview">
      <div className="container">
        <div className="section-head js-reveal">
          <span className="eyebrow">Courses</span>
          <h2>
            คอร์ส<span className="g-text">แนะนำ</span>
          </h2>
          <p>คอร์สเรียนสดแบบจับมือทำ พร้อมแนวทางต่อยอดเป็นอาชีพหรือรายได้</p>
        </div>
        <div className="grid grid-3 js-reveal">
          {courses.map((c) => (
            <CourseCard key={c.slug} course={c} />
          ))}
        </div>
        <div className="cta-row cta-center">
          <a className="btn btn-outline" href="/courses">
            ดูคอร์สทั้งหมด →
          </a>
        </div>
      </div>
    </section>
  );
}
