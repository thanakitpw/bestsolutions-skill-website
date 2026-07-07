import type { Ebook } from "./ebooks";
import { EbookCover } from "./EbookCover";

export function EbookCard({ ebook }: { ebook: Ebook }) {
  return (
    <a className="card card-hover ebook-card" href={ebook.href}>
      <EbookCover ebook={ebook} />
      <div className="ebook-card-body">
        <div className="ebook-card-head">
          <h3 className="ebook-card-title">{ebook.title}</h3>
          <p className="text-dim ebook-card-sub">{ebook.subtitle}</p>
        </div>
        <div className="ebook-card-foot">
          <span className="ebook-card-pages">{ebook.pages} หน้า · PDF</span>
          <div className="ebook-card-buy">
            <span className="ebook-card-price">
              <b className="g-text">{ebook.priceNow}</b>
              {ebook.priceWas ? <s className="text-dim">{ebook.priceWas}</s> : null}
            </span>
            <span className="ebook-card-cta">ดูรายละเอียด →</span>
          </div>
        </div>
      </div>
    </a>
  );
}
