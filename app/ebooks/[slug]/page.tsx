import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SiteNavbar } from "@/components/SiteNavbar";
import { Footer } from "@/components/Footer";
import { EbookCover } from "@/components/home/EbookCover";
import { EbookSalesPage } from "@/components/home/EbookSalesPage";
import { ebooks, getEbookBySlug } from "@/components/home/ebooks";

const LINE_URL = "https://lin.ee/Q22m30X";

// เล่ม flagship ที่มีหน้าขายเต็ม 12 ส่วน (เล่มอื่นใช้ template ทั่วไป)
const SALES_PAGE_SLUGS = new Set(["start-business-ai-30-days"]);

export function generateStaticParams() {
  return ebooks.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ebook = getEbookBySlug(slug);
  if (!ebook) return {};
  return {
    title: `${ebook.title} | E-book | Best Solutions Skill`,
    description: ebook.subtitle,
    alternates: { canonical: `/ebooks/${slug}` },
  };
}

export default async function EbookDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ebook = getEbookBySlug(slug);
  if (!ebook) notFound();

  if (SALES_PAGE_SLUGS.has(ebook.slug)) {
    return (
      <>
        <SiteNavbar />
        <main id="top">
          <EbookSalesPage ebook={ebook} />
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <SiteNavbar />
      <main id="top">
        <section className="section">
          <div className="container">
            <a className="ebook-back" href="/ebooks">
              ← กลับไปหน้ารวม E-book
            </a>

            <div className="ebook-detail js-reveal">
              <EbookCover ebook={ebook} className="ebook-detail-cover" />

              <div className="ebook-detail-info">
                <h1>{ebook.title}</h1>
                <p className="text-dim ebook-detail-sub">{ebook.subtitle}</p>

                <ul className="check-list ebook-detail-highlights">
                  {ebook.bullets.map((b, i) => (
                    <li key={i}>
                      <span className="ck">✓</span> {b}
                    </li>
                  ))}
                </ul>

                <p className="ebook-detail-meta">
                  {ebook.pages} หน้า · ไฟล์ PDF · อ่านได้ทุกอุปกรณ์ · อัปเดตฟรีตลอดชีพ
                </p>

                <div className="ebook-detail-buy">
                  <span className="ebook-detail-price">
                    <b className="g-text">{ebook.priceNow}</b>
                    {ebook.priceWas ? (
                      <s className="text-dim">{ebook.priceWas}</s>
                    ) : null}
                  </span>
                  <a
                    className="btn btn-primary"
                    href={LINE_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cta="line"
                  >
                    สั่งซื้อผ่าน LINE
                  </a>
                </div>

                <p className="ebook-note">
                  * หน้านี้เป็นตัวอย่าง (mockup) — ระบบสั่งซื้อและดาวน์โหลดอัตโนมัติกำลังพัฒนา
                </p>
              </div>
            </div>

            <div className="ebook-detail-body js-reveal">
              <div className="card ebook-about">
                <h2>เกี่ยวกับ E-book เล่มนี้</h2>
                <p>{ebook.description}</p>
                <h3>เหมาะกับใคร</h3>
                <ul className="check-list">
                  {ebook.forWho.map((w, i) => (
                    <li key={i}>
                      <span className="ck">✓</span> {w}
                    </li>
                  ))}
                </ul>
                <p className="ebook-author text-dim">เขียนโดย {ebook.author}</p>
              </div>

              <aside className="card ebook-toc">
                <h3>สารบัญ</h3>
                <ol className="ebook-toc-list">
                  {ebook.toc.map((t, i) => (
                    <li key={i}>{t}</li>
                  ))}
                </ol>
              </aside>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
