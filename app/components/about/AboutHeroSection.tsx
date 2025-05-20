import BrandIconButtonSection from "./BrandIconButtonSection";

// AboutHeroSection.tsx
const AboutHeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center text-lg mt-6 px-4">
      <p className="text-gray-500 text-xl mb-4 max-w-3xl text-center">
        LocalWorx.io is built on a simple idea:{" "}
        <span className="font-bold capitalize">
          power belongs with the people who create value
        </span>{" "}
        — not the platforms who harvest it.
      </p>
      <p className="text-gray-500 max-w-3xl text-center text-lg">
        We’re not another gig app. We’re a decentralized movement giving
        individuals and businesses the tools to promote, earn, and build lasting
        relationships on their own terms.
      </p>
      {/* Brand Icon Section */}
      <BrandIconButtonSection />
    </section>
  );
};

export default AboutHeroSection;
