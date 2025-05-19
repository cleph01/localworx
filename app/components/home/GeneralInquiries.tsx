// components/home/GeneralInquiriesSection.tsx
import FaqCard from "./FaqCard";
import { FaRegEnvelope } from "react-icons/fa";

// Faq Cards to test data
const faqs = [
  {
    title: "What is LocalWorx.io and who is it for?",
    description:
      "LocalWorx.io is a platfom that connects local professionals, freelancers, creators, and residents to exchange services, promote work, and earn within their community.",
  },
  {
    title: "How do I get started on the platform?",
    description:
      "LocalWorx.io is a platfom that connects local professionals, freelancers, creators, and residents to exchange services, promote work, and earn within their community.",
  },
  {
    title: "Is it free to use LocalWorx.io?",
    description:
      "LocalWorx.io is a platfom that connects local professionals, freelancers, creators, and residents to exchange services, promote work, and earn within their community.",
  },
  {
    title: "Can I earn money promoting outher people's work?",
    description:
      "LocalWorx.io is a platfom that connects local professionals, freelancers, creators, and residents to exchange services, promote work, and earn within their community.",
  },
  {
    title: "How is LocalWorx different from other gig platforms?",
    description:
      "LocalWorx.io is a platfom that connects local professionals, freelancers, creators, and residents to exchange services, promote work, and earn within their community.",
  },
];

const GeneralInquiriesSection = () => {
  return (
    <section className="min-w-screen px-4 py-8 mt-10 bg-gray-200 flex-col justify-center text-lg">
      <h2 className="text-2xl sm:text-6xl font-semibold mb-6">
        General inquiries
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
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
