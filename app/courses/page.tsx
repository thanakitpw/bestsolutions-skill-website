import type { Metadata } from "next";
import { SiteNavbar } from "@/components/SiteNavbar";
import { Footer } from "@/components/Footer";
import { courses } from "@/components/home/courses";
import { CourseCard } from "@/components/home/CourseCard";

export const metadata: Metadata = {
  title: "คอร์สเรียน | Best Solutions Skill",
  description: "คอร์สเรียนสดสร้างเว็บไซต์และทักษะดิจิทัลด้วย AI แบบจับมือทำ",
};

export default function CoursesPage() {
  return (
    <>
      <SiteNavbar />
      <main id="top">
        <section className="section">
          <div className="container">
            <div className="section-head js-reveal">
              <span className="eyebrow">Courses</span>
              <h2>
                คอร์สเรียน<span className="g-text">ทั้งหมด</span>
              </h2>
              <p>เลือกคอร์สที่ใช่สำหรับคุณ เรียนสดแบบจับมือทำ พร้อมต่อยอดเป็นอาชีพ</p>
            </div>
            <div className="grid grid-3 js-reveal">
              {courses.map((c) => (
                <CourseCard key={c.slug} course={c} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
