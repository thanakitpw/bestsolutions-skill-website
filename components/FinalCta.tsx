const LINE_URL = "https://lin.ee/Q22m30X";

export function FinalCta() {
  return (
    <section className="final-cta">
      <div className="container final-cta-inner">
        <span className="eyebrow">เริ่มวันนี้</span>
        <h2>พร้อมเริ่มสร้างเว็บไซต์ด้วย Vibe Code แล้วหรือยัง?</h2>
        <p>
          เริ่มจากวางไอเดีย ดีไซน์ เขียนโค้ดด้วย AI ติดตั้ง Tracking และ Deploy เว็บจริงไปพร้อมกัน
          เรียนตัวต่อตัว 1:1 ปรับเนื้อหาตามเป้าหมายของคุณ พร้อม Consult หลังเรียนจบให้ต่อยอดได้ต่อ
        </p>
        <div className="cta-row cta-center">
          <a
            className="btn btn-primary"
            href={LINE_URL}
            target="_blank"
            rel="noopener noreferrer"
            data-cta="line"
          >
            ทักไลน์เพื่อสมัครเรียน
          </a>
          <a className="btn btn-outline" href="#pricing">
            ดูรูปแบบการเรียน
          </a>
        </div>
        <p className="final-note">
          เรียนตัวต่อตัว 1:1 · 5 ชั่วโมง · 6,900.- เลือกวันเวลาเรียนเองได้
          หรือมาเรียนเป็นกลุ่มเล็ก / จัดสอนนอกสถานที่ ทักไลน์เพื่อสอบถามรายละเอียดได้เลย
        </p>
      </div>
    </section>
  );
}
