import { ARTICLES_ENABLED } from "@/lib/features";

export function HomeHero() {
  return (
    <section className="hero">
      <div className="container home-hero js-reveal">
        <span className="pill">
          <span className="dot" /> แหล่งเรียนรู้สร้างเว็บด้วย AI
        </span>
        <h1>
          เรียนสร้างเว็บและทักษะดิจิทัล
          <br />
          ด้วย <span className="g-text">AI</span> แบบลงมือทำจริง
        </h1>
        <p className="hero-sub home-hero-sub">
          Best Solutions Skill รวมคอร์สเรียนสดและบทความ ที่สอนตั้งแต่พื้นฐานจนนำไปใช้ได้จริง
          เปลี่ยนไอเดียให้เป็นเว็บไซต์และผลงานดิจิทัลของคุณเอง
        </p>
        <div className="cta-row cta-center">
          <a className="btn btn-primary btn-block-sm" href="/courses">
            ดูคอร์สเรียน →
          </a>
          {ARTICLES_ENABLED ? (
            <a className="btn btn-outline btn-block-sm" href="/articles">
              อ่านบทความ
            </a>
          ) : null}
        </div>
      </div>
    </section>
  );
}
