import ListingsSection from "../components/services-directory/ServiceListingsSection";
import SearchBarSection from "../components/services-directory/SearchBarSection";
import PageHeader from "../components/ui/PageHeader";
import CallToActionSection from "../components/CallToActionSection";
import Footer from "../components/Footer";

const ServicesDirectoryPage = () => {
  return (
    <main className="min-h-screen flex flex-col">
      {/* Page Header */}
      <PageHeader />

      {/* Search Section */}
      <SearchBarSection />

      {/* Listings Section */}
      <ListingsSection />

      {/* Call to Action Section */}
      <CallToActionSection />

      {/* Footer */}
      <Footer />
    </main>
  );
};

export default ServicesDirectoryPage;
