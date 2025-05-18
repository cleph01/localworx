import ListingsSection from "../components/services-directory/ServiceListingsSection";
import SearchBarSection from "../components/services-directory/SearchBarSection";
import PageHeader from "../components/ui/PageHeader";
import CallToActionSection from "../components/CallToActionSection";
import Footer from "../components/Footer";

const ServicesDirectoryPage = () => {
  return (
    <main className="min-h-screen flex flex-col items-center px-6 ">
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

      {/* Optional: Add any additional sections or components here */}
      {/* <CommunityConnect /> */}
      {/* <EarningSnapshot /> */}
    </main>
  );
};

export default ServicesDirectoryPage;
