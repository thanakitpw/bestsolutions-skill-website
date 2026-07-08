import { ARTICLES_ENABLED } from "@/lib/features";

export function SiteNavbar() {
  return (
    <header className="nav" id="nav">
      <div className="container nav-inner">
        <a className="nav-brand" href="/" aria-label="Best Solutions Skill หน้าแรก">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" width={40} height={40} />
          <span>
            Best Solutions<span className="g-text">.skill</span>
          </span>
        </a>
        <nav className="navmenu" id="navmenu" aria-label="เมนูหลัก">
          <a href="/">หน้าแรก</a>
          <a href="/ebooks">E-book</a>
          <a href="/courses">คอร์สเรียน</a>
          {ARTICLES_ENABLED ? <a href="/articles">บทความ</a> : null}
          <a href="/ebooks/free-start-business-ai">ความรู้ฟรี</a>
          <a href="/#about">เกี่ยวกับเรา</a>
          <a
            className="btn btn-primary navmenu-cta"
            href="https://lin.ee/Q22m30X"
            target="_blank"
            rel="noopener noreferrer"
            data-cta="line"
          >
            ติดต่อเรา
          </a>
        </nav>
        <button
          className="nav-toggle"
          id="navToggle"
          aria-label="เปิดเมนู"
          aria-expanded="false"
          aria-controls="navmenu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
