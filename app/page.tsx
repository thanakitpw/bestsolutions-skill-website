import { SiteNavbar } from "@/components/SiteNavbar";
import { HomeHero } from "@/components/home/HomeHero";
import { CourseFeature } from "@/components/home/CourseFeature";
import { EbookFeature } from "@/components/home/EbookFeature";
import { LatestArticles } from "@/components/home/LatestArticles";
import { About } from "@/components/home/About";
import { HomeCta } from "@/components/home/HomeCta";
import { Footer } from "@/components/Footer";
import { ARTICLES_ENABLED } from "@/lib/features";

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <SiteNavbar />
      <main id="top">
        <HomeHero />
        <CourseFeature />
        <EbookFeature />
        {ARTICLES_ENABLED ? <LatestArticles /> : null}
        <About />
        <HomeCta />
      </main>
      <Footer />
    </>
  );
}
