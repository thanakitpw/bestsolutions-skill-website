import type { Metadata } from "next";
import { SiteNavbar } from "@/components/SiteNavbar";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "บทความ | Best Solutions Skill",
  description: "บทความความรู้เรื่องการสร้างเว็บด้วย AI และทักษะดิจิทัล — เร็วๆ นี้",
};

export default function ArticlesPage() {
  return (
    <>
      <SiteNavbar />
      <main id="top">
        <section className="section">
          <div className="container">
            <div className="section-head js-reveal">
              <span className="eyebrow">Articles</span>
              <h2>
                บทความ<span className="g-text">ความรู้</span>
              </h2>
              <p>เรากำลังเตรียมบทความดีๆ เรื่องการสร้างเว็บด้วย AI และทักษะดิจิทัล</p>
            </div>
            <div className="card coming-soon js-reveal">
              <span className="coming-soon-emoji">🚀</span>
              <b>เร็วๆ นี้</b>
              <p className="text-dim">ระหว่างนี้ดูคอร์สเรียนของเราได้เลย</p>
              <a className="btn btn-primary" href="/courses">
                ดูคอร์สเรียน →
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
