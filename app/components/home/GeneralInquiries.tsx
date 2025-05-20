// components/home/GeneralInquiriesSection.tsx
import FaqCard from "./FaqCard";
import { FaRegEnvelope } from "react-icons/fa";

// Faq Cards to test data
const faqs = [
  {
    title: "What is LocalWorx.io and who is it for?",
    description:
      "LocalWorx.io is a platform designed for local professionals, freelancers, creators, and residents to connect, exchange services, promote their work, and earn within their community.",
  },
  {
    title: "How do I get started on the platform?",
    description:
      "To get started, simply sign up for a free account on LocalWorx.io, create your profile, and begin browsing or posting services and opportunities in your local area.",
  },
  {
    title: "Is it free to use LocalWorx.io?",
    description:
      "Yes, creating an account and browsing opportunities on LocalWorx.io is free. Some premium features or promotional tools may have associated costs.",
  },
  {
    title: "Can I earn money promoting other people's work?",
    description:
      "Yes, LocalWorx.io allows users to earn by promoting services or work posted by others in the community, helping to boost local talent and businesses.",
  },
  {
    title: "How is LocalWorx different from other gig platforms?",
    description:
      "LocalWorx.io focuses on building local connections and supporting community-driven growth, making it easier to find trusted professionals and opportunities nearby.",
  },
];

const GeneralInquiriesSection = () => {
  return (
    <section className="min-w-screen px-4 py-8 mt-10 bg-gray-200 flex-col justify-center text-lg">
      <h2 className="text-2xl sm:text-6xl font-semibold mb-6">
        General inquiries
      </h2>
      <div className="grid place-items-center grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {faqs.map((faq, index) => (
          <FaqCard
            key={index}
            title={faq.title}
            description={faq.description}
          />
        ))}
      </div>
      <div className="mt-12 space-y-4">
        <p className="font-bold text-lg">Got more questions?</p>
        <p className="text-gray-500 text-base">Send us an email at</p>
        <p className="font-bold text-lg">
          <span>
            <FaRegEnvelope className="inline-flex" />
          </span>{" "}
          support@LocalWorx.io
        </p>
      </div>
    </section>
  );
};

export default GeneralInquiriesSection;
