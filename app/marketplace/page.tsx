// marketplace/page.tsx
import PageHeader from "../components/ui/PageHeader";
import MarketplaceIntroSection from "../components/marketplace/MarketplaceIntroSection";
import HowItWorksSection from "../components/marketplace/HowItWorksSection";
import EarnedRewardsSection from "../components/marketplace/EarnedRewardsSection";
import ListingsGridSection from "../components/marketplace/ListingsGridSection";
import CallToActionSection from "../components/CallToActionSection";
import Footer from "../components/Footer";

export default function MarketplacePage() {
  return (
    <main className="min-h-screen flex flex-col justify-center">
      <PageHeader />

      <MarketplaceIntroSection />
      <HowItWorksSection />
      <EarnedRewardsSection />
      <ListingsGridSection />
      <CallToActionSection />
      <Footer />
    </main>
  );
}
