// HowItWorksSection.tsx
import { FaHandshake, FaTags, FaBtc } from "react-icons/fa";

const HowItWorksSection = () => {
  const steps = [
    {
      icon: <FaHandshake className="text-blue-500 w-8 h-8" />,
      title: "Businesses Offer In-Kind Rewards",
      description:
        "To stay cash-flow friendly, businesses can reward promoters with discounts, services, or exclusive bundles.",
    },
    {
      icon: <FaTags className="text-blue-500 w-8 h-8" />,
      title: "Promoters Flip for Value",
      description:
        "Promoters post their earned perks on the Marketplace—available for purchase by other users or the public.",
    },
    {
      icon: <FaBtc className="text-blue-500 w-8 h-8" />,
      title: "Bitcoin for Rewards",
      description:
        "Buyers use Bitcoin to purchase listed rewards, allowing promoters to turn sweat equity into real earnings.",
    },
  ];

  return (
    <section className="px-4 mt-12">
      <h2 className="text-3xl sm:text-4xl font-bold text-center mb-6">
        How the Marketplace Works
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg text-gray-700">
        {steps.map((step, idx) => (
          <div key={idx} className="border p-6 rounded shadow text-center">
            {step.icon}
            <h3 className="font-bold mt-2 mb-2">{step.title}</h3>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorksSection;
