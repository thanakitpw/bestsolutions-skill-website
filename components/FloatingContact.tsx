// Fixed bottom-right contact buttons: LINE + phone (real brand icons)
export function FloatingContact() {
  return (
    <div className="fab" aria-label="ช่องทางติดต่อ">
      <a
        className="fab-btn fab-line"
        href="https://lin.ee/Q22m30X"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="ทักไลน์ Best Solutions Skill"
      >
        <span className="fab-label">ติดต่อสอบถาม</span>
        <svg viewBox="0 0 40 40" aria-hidden="true">
          <rect x="6" y="7" width="28" height="20" rx="7" fill="#fff" />
          <path d="M16 26.5h8l-4.5 5z" fill="#fff" />
          <text
            x="20"
            y="20.8"
            textAnchor="middle"
            fontSize="9.2"
            fontWeight="800"
            fill="#06C755"
            fontFamily="Arial, Helvetica, sans-serif"
            letterSpacing="0.2"
          >
            LINE
          </text>
        </svg>
      </a>

      <a
        className="fab-btn fab-fb"
        href="https://www.facebook.com/BestSolutionSkill/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Facebook Best Solutions Skill"
      >
        <span className="fab-label">Facebook</span>
        <svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
          <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
        </svg>
      </a>

      <a className="fab-btn fab-tel" href="tel:0953854906" aria-label="โทร 095-385-4906">
        <span className="fab-label">095-385-4906</span>
        <svg viewBox="0 0 24 24" fill="#fff" aria-hidden="true">
          <path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.3 0 .7-.2 1l-2.3 2.2z" />
        </svg>
      </a>
    </div>
  );
}
