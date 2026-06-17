import { ARTICLES_ENABLED } from "@/lib/features";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-inner">
          <div className="footer-brand">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="" width={44} height={44} />
            <div>
              <b>Best Solutions Skill</b>
              <span>Vibe Code Website Bootcamp · Agency Workflow · Tracking · Deploy</span>
            </div>
          </div>
          <nav className="footer-links" aria-label="เมนูส่วนท้าย">
            <a href="/courses">คอร์สเรียน</a>
            {ARTICLES_ENABLED ? <a href="/articles">บทความ</a> : null}
            <a href="/#about">เกี่ยวกับเรา</a>
            <a className="btn btn-primary" href="https://lin.ee/Q22m30X" target="_blank" rel="noopener noreferrer" data-cta="line">
              ติดต่อสอบถาม
            </a>
          </nav>
        </div>
        <div className="footer-bottom">© 2026 Best Solutions Skill. All rights reserved.</div>
      </div>
    </footer>
  );
}
