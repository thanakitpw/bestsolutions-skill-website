import type { Ebook } from "./ebooks";

// ปกของ E-book — ถ้ามี coverImage จะใช้รูปจริง ไม่งั้น fallback เป็น gradient mockup
export function EbookCover({
  ebook,
  className = "",
}: {
  ebook: Ebook;
  className?: string;
}) {
  if (ebook.coverImage) {
    return (
      <div className={`ebook-cover ebook-cover--image ${className}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className="ebook-cover-img"
          src={ebook.coverImage}
          alt={`ปก ${ebook.title}`}
          loading="lazy"
        />
      </div>
    );
  }

  return (
    <div
      className={`ebook-cover ${className}`}
      style={{
        background: `linear-gradient(150deg, ${ebook.cover.from}, ${ebook.cover.to})`,
      }}
    >
      <span className="ebook-cover-brand">
        Best Solutions<b>.skill</b>
      </span>
      <span className="ebook-cover-kicker">E-BOOK</span>
      <span className="ebook-cover-title">{ebook.title}</span>
      <span className="pill ebook-cover-tag">
        <span className="dot" /> {ebook.tag}
      </span>
    </div>
  );
}
