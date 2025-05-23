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
  const res = await mockFetch(`/api/promotions/${id}`);
  const promotion = res.data;

  if (!promotion) {
    return <div>Promotion not found</div>;
  }

  const heroSectiondData = {
    title: promotion.title,
    businessName: promotion.businessName || "Business Name",
    mediaUrl: promotion.mediaUrl || "/placeholder-image.jpg",
    mediaType: promotion.mediaType || "image",
  };
  const detailsSectionData = {
    description: promotion.description,
    termsAndConditions: promotion.termsAndConditions,
    expiresAt: promotion.expiresAt,
  };
  const rewardCalloutSectionData = {
    rewardId: promotion.rewardId,
    businessId: promotion.businessId,
  };

  const businessPreviewSectionData = {
    businessId: promotion.businessId,
  };

  const promoterDetailsSectionData = {
    promoterId: promotion.promoterId,
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
