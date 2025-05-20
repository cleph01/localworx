import BrandIconButtonSection from "./BrandIconButtonSection";

// AboutHeroSection.tsx
const AboutHeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center text-lg mt-6 px-4">
      <p className="text-gray-500 text-xl max-w-3xl text-center">
        LocalWorx.io is built on a simple idea:{" "}
      </p>
      <p className="font-bold capitalize text-lg my-4">
        power belongs with the people who create the value
      </p>

      <p className="text-gray-500 text-lg">
        — not the platforms who harvest it.
      </p>
      <p className="text-gray-500 max-w-3xl text-center text-lg capitalize mt-4">
        We’re not another gig app. We’re a movement. A decentralized platform
        giving individuals and businesses the tools to promote, earn, and build
        lasting relationships on their own terms.
      </p>
      {/* Brand Icon Section */}
      <BrandIconButtonSection />
    </section>
  );
};

export default AboutHeroSection;
