import { ebooks } from "./ebooks";
import { EbookCover } from "./EbookCover";

// หน้าแรก: section E-book — สลับข้าง (รูปซ้าย / คำอธิบาย+ปุ่มขวา)
export function EbookFeature() {
  const ebook = ebooks[0];
  if (!ebook) return null;

  return (
    <section className="section" id="ebook-feature">
      <div className="container">
        <div className="feature-row feature-row--reverse">
          <div className="feature-copy js-reveal">
            <span className="eyebrow">E-book</span>
            <h2>{ebook.title}</h2>
            <p className="feature-desc">{ebook.subtitle}</p>
            <ul className="check-list feature-bullets">
              {ebook.bullets.map((b, i) => (
                <li key={i}>
                  <span className="ck">✓</span> {b}
                </li>
              ))}
            </ul>
            <p className="feature-price">
              <b className="g-text">{ebook.priceNow}</b>
              <span className="text-dim"> · {ebook.pages} หน้า · PDF</span>
            </p>
            <div className="feature-actions">
              <a className="btn btn-primary" href={ebook.href}>
                ดูรายละเอียด →
              </a>
              <a className="btn btn-outline" href="/ebooks">
                ดู E-book ทั้งหมด
              </a>
            </div>
          </div>
          <div className="feature-media js-reveal">
            <EbookCover ebook={ebook} className="feature-ebook-cover" />
          </div>
        </div>
      </div>
    </section>
  );
}
