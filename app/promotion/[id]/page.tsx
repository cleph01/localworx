// app/promotion/[id]/page.tsx

import PromotionHeroSection from "../../components/promotions/PromotionHeroSection";
import PromotionDetailsSection from "../../components/promotions/PromotionDetailsSection";
import BusinessPreviewSection from "../../components/promotions/BusinessPreviewSection";
import RewardCalloutSection from "../../components/promotions/RewardCalloutSection";
import Footer from "../../components/Footer";
import { mockFetch } from "@/app/utilities/mockDatabase/mockFetch";
import PromoterDetailsSection from "@/app/components/promotions/PromoterDetailsSection";

export default async function PromotionProfilePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // 🔧 Fetch promotion details (replace with your real API call)
  //   const res = await fetch(
  //     `${process.env.NEXT_PUBLIC_API_URL}/api/promotions/${id}`
  //   );
  //   const promotion = await res.json();

  // Simulate fetching from a mock database
  const promotion = await mockFetch(`/api/promotions/${id}`);

  if (!promotion) {
    return <div>Promotion not found</div>;
  }

  const promotionData = promotion.data;

  // Organize the data I want to pass as props
  const heroSectiondData = {
    title: promotionData.title,
    businessName: promotionData.businessName || "Business Name",
    mediaUrl: promotionData.mediaUrl || "/placeholder-image.jpg",
    mediaType: promotionData.mediaType || "image",
  };
  const detailsSectionData = {
    description: promotionData.description,
    termsAndConditions: promotionData.termsAndConditions,
    expiresAt: promotionData.expiresAt,
  };
  const rewardCalloutSectionData = {
    rewardId: promotionData.rewardId,
    businessId: promotionData.businessId,
  };

  const businessPreviewSectionData = {
    businessId: promotionData.businessId,
  };

  const promoterDetailsSectionData = {
    promoterId: promotionData.promoterId,
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
