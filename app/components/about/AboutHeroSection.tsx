// AboutHeroSection.tsx
const AboutHeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center text-lg px-4">
      <p className="text-gray-500 text-xl mb-4 max-w-3xl text-center">
        LocalWorx.io is built on a simple idea:{" "}
        <strong>power belongs with the people who create value</strong> — not
        the platforms who harvest it.
      </p>
      <p className="text-gray-500 mb-4 max-w-3xl text-center">
        We’re not another gig app. We’re a decentralized movement giving
        individuals and businesses the tools to promote, earn, and build lasting
        relationships on their own terms.
      </p>
      <p className="text-xl font-bold italic text-blue-600 mb-4 text-center">
        Powered by Nostr. Monetized by Bitcoin. Inspired by Local Resilience.
      </p>
    </section>
  );
};

export default AboutHeroSection;
