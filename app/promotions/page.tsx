import PromotionListingsGridSection from "../components/promotions/PromotionListingsGridSection";
import PageHeader from "../components/ui/PageHeader";
import CallToActionSection from "../components/CallToActionSection";
import Footer from "../components/Footer";
import GuestBanner from "../components/ui/GuestBanner";

const PromotionsPage = () => {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Page Header */}
      <PageHeader />

      {/* Promotion Listings Section */}
      <PromotionListingsGridSection />

      {/* Call to Action Section */}
      <CallToActionSection />

      {/* Footer */}
      <Footer />
      <GuestBanner />
    </main>
  );
};

export default PromotionsPage;
