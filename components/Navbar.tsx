export function Navbar() {
  return (
    <header className="nav" id="nav">
      <div className="container nav-inner">
        <a className="nav-brand" href="#top" aria-label="Best Solutions Skill หน้าแรก">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/logo.png" alt="" width={40} height={40} />
          <span>
            Best Solutions<span className="g-text">.skill</span>
          </span>
        </a>
        <nav className="navmenu" id="navmenu" aria-label="เมนูหลัก">
          <a href="#workflow">Workflow</a>
          <a href="#curriculum">หลักสูตร</a>
          <a href="#pricing">ราคา</a>
          <a href="#faq">FAQ</a>
          <a className="btn btn-primary navmenu-cta" href="#pricing">สมัครเรียน</a>
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
