import { getPublishedArticles } from "@/lib/articles";
import { ArticleCard } from "@/components/articles/ArticleCard";

export async function LatestArticles() {
  const articles = await getPublishedArticles(3);
  return (
    <section className="section" id="articles-preview">
      <div className="container">
        <div className="section-head js-reveal">
          <span className="eyebrow">Articles</span>
          <h2>
            บทความ<span className="g-text">ล่าสุด</span>
          </h2>
          <p>บทความความรู้เรื่องการสร้างเว็บด้วย AI และทักษะดิจิทัล</p>
        </div>
        {articles.length === 0 ? (
          <div className="card coming-soon js-reveal">
            <span className="coming-soon-emoji">🚀</span>
            <b>บทความกำลังจะมาเร็วๆ นี้</b>
            <p className="text-dim">ติดตามเนื้อหาใหม่ได้ที่หน้านี้ หรือทักเราทาง LINE</p>
          </div>
        ) : (
          <>
            <div className="grid grid-3 js-reveal">
              {articles.map((a) => (
                <ArticleCard key={a.slug} article={a} />
              ))}
            </div>
            <div className="cta-row cta-center">
              <a className="btn btn-outline" href="/articles">
                อ่านบทความทั้งหมด →
              </a>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
