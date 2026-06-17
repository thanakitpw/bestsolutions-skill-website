export function LatestArticles() {
  return (
    <section className="section" id="articles-preview">
      <div className="container">
        <div className="section-head js-reveal">
          <span className="eyebrow">Articles</span>
          <h2>
            บทความ<span className="g-text">ล่าสุด</span>
          </h2>
          <p>เรากำลังเตรียมบทความความรู้เรื่องการสร้างเว็บด้วย AI และทักษะดิจิทัล</p>
        </div>
        <div className="card coming-soon js-reveal">
          <span className="coming-soon-emoji">🚀</span>
          <b>บทความกำลังจะมาเร็วๆ นี้</b>
          <p className="text-dim">ติดตามเนื้อหาใหม่ได้ที่หน้านี้ หรือทักเราทาง LINE</p>
        </div>
      </div>
    </section>
  );
}
