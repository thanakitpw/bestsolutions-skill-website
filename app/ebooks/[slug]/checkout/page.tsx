import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { SiteNavbar } from "@/components/SiteNavbar";
import { Footer } from "@/components/Footer";
import { EbookCheckoutClient } from "@/components/EbookCheckoutClient";
import { getEbookBySlug } from "@/components/home/ebooks";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ebook = getEbookBySlug(slug);
  if (!ebook) return {};
  return {
    title: `ชำระเงิน · ${ebook.title} | Best Solutions Skill`,
    robots: { index: false, follow: false },
  };
}

export default async function EbookCheckoutPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const ebook = getEbookBySlug(slug);
  if (!ebook) notFound();

  const amountStr = ebook.priceNow.replace(/[^\d]/g, "");
  // ฟรี/ไม่มีราคา → ไม่ต้องมีหน้าชำระเงิน
  if (!amountStr) redirect(`/ebooks/${slug}`);
  const amount = parseInt(amountStr, 10);
  const was = ebook.priceWas ? parseInt(ebook.priceWas.replace(/[^\d]/g, ""), 10) : null;

  return (
    <>
      <SiteNavbar />
      <main className="container checkout-page">
        <EbookCheckoutClient ebook={ebook} slug={slug} amount={amount} was={was} />
      </main>
      <Footer />
    </>
  );
}
