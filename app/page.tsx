import PageHeader from "./components/ui/PageHeader";
import HeroSection from "./components/home/HeroSection";
import VisitorTypeSection from "./components/home/VisitorTypeSection";
import ProfilesCarouselSection from "./components/home/ProfileCarouselSection";
import FeaturesSection from "./components/home/FeaturesSection";
import VisionMissionSection from "./components/home/VisionMissionSection";
import SignupStepsSection from "./components/home/SignupStepsSection";
import ReviewsSection from "./components/home/ReviewsSection";
import GeneralInquiriesSection from "./components/home/GeneralInquiries";
import CallToActionSection from "./components/CallToActionSection";
import Footer from "./components/Footer";
import GithubSection from "./components/GithubSection";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col justify-center pb-12 ">
      {/* Header */}
      <PageHeader />

      {/* Hero Sectoin */}
      <HeroSection />

      {/* Visitor Type Buttons */}
      <VisitorTypeSection />

      {/* Carousel */}
      <ProfilesCarouselSection />

      {/* Features Header*/}
      <FeaturesSection />

      {/* Vision / Mission */}
      <VisionMissionSection />

      {/* Signup Steps */}
      <SignupStepsSection />

      {/* Reviews Section */}
      <ReviewsSection />

      {/* General Inquiries */}
      <GeneralInquiriesSection />

      {/* CTA */}
      <CallToActionSection />

      {/* Footer */}
      <Footer />

      {/* GitHub CTA */}
      {/* <GithubSection /> */}

      {/* Under Construction Note */}
      <section className="mt-4 flex flex-col items-center justify-center space-y-2 text-sm text-red-500 italic">
        <p>This site is under active construction</p>
        <p>Enjoy the journey ✨</p>
      </section>
    </main>
  );
}
