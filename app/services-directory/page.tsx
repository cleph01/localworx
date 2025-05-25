import SearchBarSection from "../components/ui/SearchBarSection";
import PageHeader from "../components/ui/PageHeader";
import CallToActionSection from "../components/CallToActionSection";
import Footer from "../components/Footer";
import BusinessListingsSection from "../components/services-directory/BusinessListingsSection";

const ServicesDirectoryPage = () => {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Page Header */}
      <PageHeader />

      {/* Search Section */}
      <SearchBarSection />

      {/* Listings Section */}
      <BusinessListingsSection />

      {/* Call to Action Section */}
      <CallToActionSection />

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default ServicesDirectoryPage;
