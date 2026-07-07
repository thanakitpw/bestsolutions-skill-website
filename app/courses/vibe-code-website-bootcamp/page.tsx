import type { Metadata } from "next";
import { SiteNavbar } from "@/components/SiteNavbar";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Problem } from "@/components/Problem";
import { Workflow } from "@/components/Workflow";
import { Build } from "@/components/Build";
import { Portfolio } from "@/components/Portfolio";
import { Curriculum } from "@/components/Curriculum";
import { Bonus } from "@/components/Bonus";
import { Instructor } from "@/components/Instructor";
import { Pricing } from "@/components/Pricing";
import { Tools } from "@/components/Tools";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  title: "Vibe Code Website Bootcamp | Best Solutions Skill",
  description:
    "คอร์สสอนตัวต่อตัว 1:1 สร้างเว็บไซต์ด้วย Vibe Code และ AI 5 ชั่วโมง ตั้งแต่ Design, Next.js, Tracking จน Deploy ออนไลน์ พร้อมต่อยอดเป็น Portfolio สมัครงาน รับงาน หรือสร้างรายได้",
};

export default function VibeCodeBootcampPage() {
  return (
    <>
      <SiteNavbar />
      <main id="top">
        <Hero />
        <TrustBar />
        <Problem />
        <Workflow />
        <Build />
        <Portfolio />
        <Curriculum />
        <Bonus />
        <Instructor />
        <Pricing />
        <Tools />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
    </>
  );
}
