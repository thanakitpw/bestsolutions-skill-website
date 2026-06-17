import { redirect } from "next/navigation";
import { getPlan, type PlanId } from "@/lib/plans";
import { CheckoutForm } from "@/components/CheckoutForm";
import { SiteNavbar } from "@/components/SiteNavbar";
import { Footer } from "@/components/Footer";

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ plan?: string }>;
}) {
  const { plan } = await searchParams;
  if (!plan || !getPlan(plan)) redirect("/courses");
  return (
    <>
      <SiteNavbar />
      <main className="container checkout-page">
        <CheckoutForm plan={plan as PlanId} />
      </main>
      <Footer />
    </>
  );
}
