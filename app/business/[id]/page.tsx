import PageHeader from "../../components/ui/PageHeader";
import BusinessOverviewSection from "../../components/business/BusinessOverviewSection";
import BusinessPromotionsSection from "../../components/business/BusinessPromotionsSection";
import LoyaltyProgramSection from "../../components/business/LoyaltyProgramSection";
import IntroOfferSection from "../../components/business/BusinessCard/IntroOfferSection";
import CallToActionSection from "../../components/CallToActionSection";
import Footer from "../../components/Footer";

export default async function BusinessProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // Extract the id from the context
  // Note: params is a Promise, so we need to await it
  const { id } = await params; // Get the item id from the URL

  // 🔧 Fetch business details (replace with your real API call)

  if (!id) {
    return <div>Item not found</div>;
  }

  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      {/* Business Core Info (logo, hours, contact, map, etc.) */}
      <BusinessOverviewSection businessId={id} />

      {/* Introductory Offer Section (if applicable) */}
      <IntroOfferSection businessId={id} clientSideFetch={false} />

      {/* Promotions tied to this business */}
      <BusinessPromotionsSection businessId={id} />

      {/* CTA + Footer */}
      <CallToActionSection />
      <Footer />
    </main>
  );
}
