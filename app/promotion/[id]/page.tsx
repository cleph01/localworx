// app/promotion/[id]/page.tsx

import PromotionHeroSection from "../../components/promotions/PromotionHeroSection";
import PromotionDetailsSection from "../../components/promotions/PromotionDetailsSection";
import BusinessPreviewSection from "../../components/promotions/BusinessPreviewSection";
import RewardCalloutSection from "../../components/promotions/RewardCalloutSection";
import Footer from "../../components/Footer";
import { mockFetch } from "@/app/utilities/mockDatabase/mockFetch";
import PromoterDetailsSection from "@/app/components/promotions/PromotionCard/PromoterDetailsSection";
import db from "@/db/db";

import NotFound from "@/app/not-found";

export default async function PromotionProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // Simulate fetching from a mock database
  // const promotion = await mockFetch(`/api/promotions/${id}`);

  // SSR: Fetch the business details from the database
  // Fetch the business details from the database
  const promotion = await db("promotions").where("id", id).first();

  if (!promotion) return NotFound();

  // Organize the data I want to pass as props
  const heroSectiondData = {
    title: promotion.title,
    business_id: promotion.business_id,
    media_url: promotion.media_url || "/placeholder-image.jpg",
    media_type: promotion.media_type || "image",
  };
  const detailsSectionData = {
    description: promotion.description,
    terms_and_conditions: promotion.terms_and_conditions,
    expires_at: promotion.expires_at,
  };
  const rewardCalloutSectionData = {
    business_id: promotion.business_id,
  };

  const businessPreviewSectionData = {
    business_id: promotion.business_id,
  };

  const promoterDetailsSectionData = {
    promoter_id: promotion.promoter_id,
  };

  // Render the promotion details page
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <PromotionHeroSection data={heroSectiondData} />
      <PromotionDetailsSection data={detailsSectionData} />
      <RewardCalloutSection data={rewardCalloutSectionData} />
      <BusinessPreviewSection data={businessPreviewSectionData} />
      <PromoterDetailsSection data={promoterDetailsSectionData} />
      <Footer />
    </main>
  );
}
