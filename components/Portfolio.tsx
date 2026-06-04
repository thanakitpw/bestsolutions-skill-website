type Work = {
  img: string;
  name: string;
  tag: string;
};

const works: Work[] = [
  { img: "/portfolio/work-1.png", name: "เว็บไซต์องค์กรอุตสาหกรรม", tag: "เว็บองค์กร" },
  { img: "/portfolio/work-2.png", name: "เว็บเอเจนซีการตลาดดิจิทัล", tag: "เว็บธุรกิจ" },
  { img: "/portfolio/work-3.png", name: "เว็บออกแบบพื้นที่ / สถาปัตยกรรม", tag: "เว็บบริการ" },
];

export function Portfolio() {
  return (
    <section className="section" id="portfolio">
      <div className="container">
        <div className="section-head js-reveal">
          <span className="eyebrow">Portfolio</span>
          <h2>
            ตัวอย่าง<span className="g-text">ผลงานเว็บไซต์</span>
          </h2>
          <p>
            แนวเว็บไซต์ที่คุณทำได้หลังเรียน — สวย โหลดไว ใช้งานจริง
            พร้อมต่อยอดเป็น Portfolio รับงาน หรือเว็บธุรกิจของตัวเอง
          </p>
        </div>
        <div className="grid grid-3 portfolio-grid js-reveal">
          {works.map((w, i) => (
            <figure className="work-card" key={i}>
              <div className="work-shot">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={w.img} alt={w.name} width={1200} height={867} loading="lazy" />
              </div>
              <figcaption className="work-meta">
                <span className="work-tag">{w.tag}</span>
                <span className="work-name">{w.name}</span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
