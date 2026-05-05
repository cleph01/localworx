import FaqCard from "./FaqCard";
import { FaRegEnvelope } from "react-icons/fa";

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
    <section className="w-full px-4 sm:px-6 py-16 sm:py-24">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl sm:text-5xl font-semibold mb-10">
          General inquiries
        </h2>
        <div className="divide-y divide-gray-100">
          {faqs.map((faq, index) => (
            <FaqCard key={index} title={faq.title} description={faq.description} />
          ))}
        </div>
        <div className="mt-12 flex items-center gap-3 text-gray-500">
          <FaRegEnvelope className="text-brand-orange shrink-0" />
          <span>
            Got more questions?{" "}
            <a
              href="mailto:support@localworx.io"
              className="text-brand-orange font-medium hover:opacity-80 transition"
            >
              support@LocalWorx.io
            </a>
          </span>
        </div>
      </div>
    </section>
  );
};

export default GeneralInquiriesSection;
