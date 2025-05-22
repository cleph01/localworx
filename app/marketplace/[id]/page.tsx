import MarketplaceItemHeroSection from "../../components/marketplace/MarketplaceItemHeroSection";
import MarketplaceItemDetailsSection from "../../components/marketplace/MarketplaceItemDetailsSection";
import SellerPreviewSection from "../../components/marketplace/SellerPreviewSection";
import BusinessContextSection from "../../components/marketplace/BusinessContextSection";
import AddToCartCTASection from "../../components/marketplace/AddToCartCTASection";
import Footer from "../../components/Footer";
import { mockFetch } from "@/app/utilities/mockDatabase/mockFetch";

export default async function MarketplaceItemPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  const res = await mockFetch(`/api/marketplace/${id}`);
  const item = await res.data;

  if (!item) {
    return <div> Item Not Found </div>;
  }

  return (
    <main className="min-h-screen flex flex-col items-center">
      <MarketplaceItemHeroSection item={item} />
      <MarketplaceItemDetailsSection item={item} />
      <AddToCartCTASection item={item} />
      <SellerPreviewSection
        seller={item.firstName}
        avatarUrl={item.avatarUrl}
        zapCount={item.zapCount}
      />
      <BusinessContextSection item={item} />
      <Footer />
    </main>
  );
}
