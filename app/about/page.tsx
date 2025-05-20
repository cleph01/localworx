import PageHeader from "../components/ui/PageHeader";
import AboutHeroSection from "../components/about/AboutHeroSection";
import DecentralizedEconomySection from "../components/about/DecentralizedEconomySection";
import BusinessModelSection from "../components/about/BusinessModelSection";
import PlatformBenefitsSection from "../components/about/PlatformBenefitsSection";
import ForeverVisibleSection from "../components/about/ForeverVisibleSection";
import CallToActionSection from "../components/about/CallToActionSection";
import Footer from "../components/Footer";

export default function AboutPage() {
  return (
    <main className="min-h-screen flex flex-col justify-center pb-12">
      <PageHeader />

      <AboutHeroSection />
      <DecentralizedEconomySection />
      <BusinessModelSection />
      <PlatformBenefitsSection />
      <ForeverVisibleSection />
      <CallToActionSection />
      <Footer />
    </main>
  );
}
