// marketplace/page.tsx
import PageHeader from "../components/ui/PageHeader";
import MarketplaceIntroSection from "../components/marketplace/MarketplaceIntroSection";
import HowItWorksSection from "../components/marketplace/HowItWorksSection";
import EarnedRewardsSection from "../components/marketplace/EarnedRewardsSection";
import MarketplaceItemListingsGridSection from "../components/marketplace/MarketplaceItemListingsGridSection";
import CallToActionSection from "../components/CallToActionSection";
import Footer from "../components/Footer";

export default function MarketplacePage() {
  return (
    <main className="min-h-screen flex flex-col items-center">
      {/* Page Header */}
      <PageHeader />

      {/* <MarketplaceIntroSection /> */}

      {/* Marketplace Intro Section */}
      <HowItWorksSection />

      {/* Earned Rewards Section */}
      <EarnedRewardsSection />

      {/* Marketplace Item Listings Section */}
      <MarketplaceItemListingsGridSection />

      {/* Call to Action Section */}
      <CallToActionSection />
      <Footer />
    </main>
  );
}
