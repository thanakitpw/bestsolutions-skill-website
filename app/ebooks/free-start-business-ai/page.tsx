import type { Metadata } from "next";
import { SiteNavbar } from "@/components/SiteNavbar";
import { Footer } from "@/components/Footer";
import { EbookFreePage } from "@/components/home/EbookFreePage";
import { getEbookBySlug } from "@/components/home/ebooks";

const title = "ดาวน์โหลดฟรี · คู่มือเริ่มต้นทำธุรกิจด้วย AI | Best Solutions Skill";
const description =
  "ดาวน์โหลดฟรี คู่มือเริ่มต้นทำธุรกิจด้วย AI สำหรับคนเริ่มจากศูนย์ — เห็นภาพรวมทั้งเส้นทางตั้งแต่หาไอเดียจนถึงหาลูกค้ากลุ่มแรก ไฟล์ PDF อ่านได้ทุกอุปกรณ์ ไม่มีค่าใช้จ่าย";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/ebooks/free-start-business-ai" },
  openGraph: {
    title: "ดาวน์โหลดฟรี · คู่มือเริ่มต้นทำธุรกิจด้วย AI",
    description,
    type: "website",
    locale: "th_TH",
  },
};

export default function FreeEbookPage() {
  // ใช้ข้อมูลปก/ราคาเล่มเต็มจากเล่ม flagship (สำหรับปกและ cross-sell)
  const ebook = getEbookBySlug("start-business-ai-30-days")!;
  return (
    <>
      <SiteNavbar />
      <main id="top">
        <EbookFreePage ebook={ebook} />
      </main>
      <Footer />
    </>
  );
}
