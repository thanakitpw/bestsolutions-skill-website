import { SiteNavbar } from "@/components/SiteNavbar";
import { HomeHero } from "@/components/home/HomeHero";
import { FeaturedCourses } from "@/components/home/FeaturedCourses";
import { LatestArticles } from "@/components/home/LatestArticles";
import { About } from "@/components/home/About";
import { HomeCta } from "@/components/home/HomeCta";
import { Footer } from "@/components/Footer";

export const revalidate = 60;

export default function Home() {
  return (
    <>
      <SiteNavbar />
      <main id="top">
        <HomeHero />
        <FeaturedCourses />
        <LatestArticles />
        <About />
        <HomeCta />
      </main>
      <Footer />
    </>
  );
}
