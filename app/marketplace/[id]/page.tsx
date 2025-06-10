import MarketplaceItemHeroSection from "../../components/marketplace/MarketplaceItemHeroSection";
import MarketplaceItemDetailsSection from "../../components/marketplace/MarketplaceZapCountSection";
import SellerPreviewSection from "../../components/marketplace/SellerPreviewSection";
import AddToCartCTASection from "../../components/marketplace/AddToCartCTASection";
import Footer from "../../components/Footer";
import db from "@/db/db";
import MarketplaceItemBusinessDetailsSection from "@/app/components/marketplace/MarketplaceItemBusinessDetailsSection";

export default async function MarketplaceItemPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const item = await db("marketplace_items").where("id", id).first();

  if (!item) {
    return <div> Item Not Found </div>;
  }

  return (
    <main className="min-h-screen flex flex-col items-center">
      <MarketplaceItemHeroSection rewardId={item.reward_id} />
      <MarketplaceItemBusinessDetailsSection businessId={item.business_id} />

      <AddToCartCTASection
        id={item.id}
        rewardId={item.reward_id}
        price={item.price}
      />
      <SellerPreviewSection sellerId={item.user_id} />

      <Footer />
    </main>
  );
}
