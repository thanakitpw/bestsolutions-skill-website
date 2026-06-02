import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { TrustBar } from "@/components/TrustBar";
import { Problem } from "@/components/Problem";
import { Workflow } from "@/components/Workflow";
import { Build } from "@/components/Build";
import { Curriculum } from "@/components/Curriculum";
import { Bonus } from "@/components/Bonus";
import { Instructor } from "@/components/Instructor";
import { Pricing } from "@/components/Pricing";
import { Tools } from "@/components/Tools";
import { Faq } from "@/components/Faq";
import { FinalCta } from "@/components/FinalCta";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main id="top">
        <Hero />
        <TrustBar />
        <Problem />
        <Workflow />
        <Build />
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
