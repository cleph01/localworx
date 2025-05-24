import PromotionsShowAll from "../components/promotions/PromotionsShowAll";
import SearchBarSection from "../components/ui/SearchBarSection";
import PageHeader from "../components/ui/PageHeader";
import CallToActionSection from "../components/CallToActionSection";
import Footer from "../components/Footer";

const PromotionsPage = () => {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Page Header */}
      <PageHeader />

      {/* Search Section */}
      <SearchBarSection />

      {/* Show All Promotions Section */}
      <PromotionsShowAll />

      {/* Call to Action Section */}
      <CallToActionSection />

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default PromotionsPage;
