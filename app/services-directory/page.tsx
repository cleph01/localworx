import PageHeader from "../components/ui/PageHeader";
import CallToActionSection from "../components/CallToActionSection";
import Footer from "../components/Footer";
import BusinessListingsGridSection from "../components/services-directory/BusinessListingsGridSection";

const ServicesDirectoryPage = () => {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Page Header */}
      <PageHeader />

      {/* Business Listings Section */}
      <BusinessListingsGridSection />

      {/* Call to Action Section */}
      <CallToActionSection />

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default ServicesDirectoryPage;
