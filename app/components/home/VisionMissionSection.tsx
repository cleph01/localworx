import Link from "next/link";
import HomeCheckListItem from "./CheckListItem";
import { FaInfoCircle } from "react-icons/fa";

const checklistItems = [
  { number: "150+", text: "Cities represented across the platform" },
  { number: "3k+", text: "Verified members and growing" },
  { number: "2.5k+", text: "Services listed by local professionals" },
];

const VisionMissionSection = () => {
  return (
    <section className="w-full flex flex-col items-center px-4 sm:px-6 py-16 sm:py-24">
      <div className="w-full max-w-4xl">
        <h2 className="text-5xl sm:text-6xl font-bold mb-8 leading-tight">
          A platform built to{" "}
          <span className="font-serif italic">strengthen</span> local
          connections, economies, and opportunities.
        </h2>

        <p className="font-semibold text-base sm:text-lg mb-6">
          Built for immediate local benefit.
        </p>

        <p className="text-gray-600 mb-6 text-lg">
          To revitalize local economies and defend digital sovereignty through
          trust-based, peer-to-peer promotion networks.
        </p>

        <p className="text-gray-600 mb-6 text-lg">
          LocalWorx.io is an innovative platform designed to drive community
          collaboration, economic empowerment, and professional growth.
        </p>

        <p className="text-gray-600 mb-6 text-lg">
          As an extension of{" "}
          <a
            className="text-brand-orange underline decoration-solid hover:opacity-80 transition"
            href="http://johnconnorproject.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            The John Connor Project
          </a>
          , LocalWorx encourages digital sovereignty by providing a
          decentralized, peer-to-peer platform for individuals to connect, do
          business, and thrive.
        </p>

        <p className="text-gray-600 font-semibold text-base mb-10">
          Amazon, Walmart, Facebook and Co. Can Go Kick Rocks.
        </p>

        <Link
          href="/about"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-orange text-white font-semibold rounded-xl hover:bg-orange-600 transition duration-300 shadow-md"
        >
          <FaInfoCircle className="h-4 w-4" />
          Learn more about us
        </Link>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-16">
          {checklistItems.map((item, index) => (
            <HomeCheckListItem key={index} number={item.number} text={item.text} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default VisionMissionSection;
