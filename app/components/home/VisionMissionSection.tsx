// components/home/VisionMissionSection.tsx
import Image from "next/image";
import ButtonLink from "../ButtonLink";
import HomeCheckListItem from "./CheckListItem";
import { FaInfoCircle } from "react-icons/fa";

// Checklist Items Test Data
const checklistItems = [
  {
    number: "150+",
    text: "Cities represented accross the platform",
  },
  {
    number: "3k+",
    text: "Verified members and growing",
  },
  {
    number: "2.5k+",
    text: "Services listed by local professionals",
  },
];

const VisionMissionSection = () => {
  return (
    <section className="flex flex-col items-center justify-between text-lg px-4">
      <img
        src="https://images.unsplash.com/photo-1533574508174-2921ef150b1c"
        alt="Main Street"
        className="rounded my-12"
        width={1200} // Adjust as needed
        height={800} // Adjust as needed
      />

      <h2 className="max-w-4xl text-5xl sm:text-4xl md:text-5xl font-bold mb-8">
        A platform built to{" "}
        <span className="font-serif italic">strengthen</span> local connections,
        economies, and opportunities.
      </h2>
      <p className="mb-6 font-bold text-base sm:text-lg">
        🟦 Built for immediate local benefit.
      </p>

      <p className="max-w-4xl text-gray-600 mb-6 text-lg">
        To revitalize local economies and defend digital sovereignty through
        trust-based, peer-to-peer promotion networks.
      </p>

      <p className="max-w-4xl text-gray-600 mb-6 text-lg">
        LocalWorx.io is an innovative platform designed to drive community
        collaboration, economic empowerment, and professional growth.
      </p>
      <p className="max-w-4xl text-gray-600 mb-6 text-lg">
        As an extension of{" "}
        <a
          className="underline decoration-solid"
          href="http://johnconnorproject.org"
          target="_blank"
        >
          The John Connor Project
        </a>
        , LocalWorx encourages digital sovereignty by providing a decentralized,
        peer-to-peer platform for individuals to connect, do business, and
        thrive.
      </p>
      <p className="max-w-4xl text-gray-600 mb-6 text-lg">
        By leveraging the power of Bitcoin and community-driven initiatives,
        LocalWorx aims to create a sustainable ecosystem that benefits both
        individuals and local businesses.
      </p>
      <p className="text-gray-600 font-semibold text-base mb-6">
        Amazon, Walmart, Facebook and Co. Can Go Kick Rocks
      </p>

      <ButtonLink
        text="Learn more about us"
        icon={<FaInfoCircle className="h-5 w-5 text-white" />}
        link="/about"
        color="bg-green-600"
      />

      <img
        src="https://images.unsplash.com/photo-1627896067004-38a36f39e506"
        alt="Family Shopping"
        className="rounded mb-4 mt-6"
        width={1200} // Adjust as needed
        height={800} // Adjust as needed
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {checklistItems.map((item, index) => (
          <HomeCheckListItem
            key={index}
            number={item.number}
            text={item.text}
          />
        ))}
      </div>
    </section>
  );
};

export default VisionMissionSection;
