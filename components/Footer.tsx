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
              <span>รับทำเว็บไซต์ &amp; การตลาดออนไลน์ · ประสบการณ์ Agency 8+ ปี</span>
            </div>
          </div>
          <nav className="footer-links" aria-label="เมนูส่วนท้าย">
            <a href="#workflow">Workflow</a>
            <a href="#curriculum">หลักสูตร</a>
            <a href="#pricing">ราคา</a>
            <a href="#faq">FAQ</a>
            <a className="btn btn-primary" href="#" data-cta="line">
              ทัก LINE
            </a>
          </nav>
        </div>
        <div className="footer-bottom">© 2026 Best Solutions Skill. All rights reserved.</div>
      </div>
    </footer>
  );
}
