import PageHeader from "../components/ui/PageHeader";
import CallToActionSection from "../components/CallToActionSection";
import Footer from "../components/Footer";
import BusinessListingsGridSection from "../components/services-directory/BusinessListingsGridSection";
import GuestBanner from "../components/ui/GuestBanner";

const ServicesDirectoryPage = () => {
  return (
    <main className="min-h-screen flex flex-col">
      <PageHeader />
      <BusinessListingsGridSection />
      <CallToActionSection />
      <Footer />
      <GuestBanner />
    </main>
  );
};

export default ServicesDirectoryPage;
