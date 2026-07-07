import type { Metadata } from "next";
import { SiteNavbar } from "@/components/SiteNavbar";
import { Footer } from "@/components/Footer";
import { ebooks } from "@/components/home/ebooks";
import { EbookCard } from "@/components/home/EbookCard";

export const metadata: Metadata = {
  title: "E-book | Best Solutions Skill",
  description:
    "รวม E-book สอนสร้างเว็บด้วย AI, รับงานฟรีแลนซ์, SEO, Tracking และจัดระบบงาน — อ่านจบใช้ได้จริง",
  alternates: { canonical: "/ebooks" },
};

export default function EbooksPage() {
  return (
    <>
      <SiteNavbar />
      <main id="top">
        <section className="section">
          <div className="container">
            <div className="section-head js-reveal">
              <span className="eyebrow">E-book</span>
              <h2>
                E-book<span className="g-text">ทั้งหมด</span>
              </h2>
              <p>คู่มือฉบับอ่านจบใช้ได้จริง เลือกเล่มที่ตรงกับสิ่งที่คุณกำลังทำ</p>
            </div>
            <div className="ebook-grid js-reveal">
              {ebooks.map((e) => (
                <EbookCard key={e.slug} ebook={e} />
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
