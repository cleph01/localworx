// components/home/HeroSection.tsx
import Image from "next/image";
import ButtonLink from "../ButtonLink";
import { FaUser, FaBriefcase, FaBullhorn } from "react-icons/fa";

const HeroSection = () => {
  return (
    <section className="flex flex-col items-center justify-center text-lg p-4">
      {/* Hero Image */}
      <Image
        src="/localworx-logo.png"
        alt="LocalWorx Logo"
        className="w-48 h-auto my-6 "
        width={192}
        height={192}
      />
      <p className="max-w-4xl sm:text-2xl text-gray-500 mb-4">
        We are the <span className="font-bold">Main Street First</span> platform
        that is putting <span className="font-bold">LOCAL</span> businesses
        ahead of global ones.
      </p>
      <p className="max-w-4xl font-bold capitalize text-gray-500 mb-4">
        LocalWorx.io is a decentralized platform powered by{" "}
        <span className="font-bold">Lightning</span> and{" "}
        <span className="font-bold">Nostr</span>.
      </p>
      <p className="max-w-4xl text-gray-500 mb-4">
        Our focus is to fire up local economies through word-of-mouth marketing,
        decentralize social media, and Bitcoin micro-payments.
      </p>

      <p className="font-bold capitalize text-gray-500 mb-4">
        Empowerment not enslavement.
      </p>

      <p className="max-w-4xl text-gray-500 mb-8">
        We are all influencers. Our friends and families want to know what we
        think about this restaurants or that mechanic. We tell the world what we
        think all the time. But the gatekeepers keep the lion's share of the
        advertiser money. LocalWorx.io is here to flip that paradigm on its
        head.
      </p>

      <p className="text-2xl font-bold font-italic mb-8">
        It's OUR data, OUR content, OUR livlihood, OUR money
      </p>
    </section>
  );
};

export default HeroSection;
