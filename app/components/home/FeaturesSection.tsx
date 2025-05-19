// components/home/FeaturesSection.tsx
import HomeFeaturesCard from "./FeaturesCard";
import {
  FaAddressCard,
  FaBtc,
  FaBullhorn,
  FaColumns,
  FaQrcode,
  FaUsers,
  FaVolumeUp,
} from "react-icons/fa";

// Features Test Data
const features = [
  {
    title: "Bitcoin Zap Integration",
    description:
      "Send and receive instant payments for community engagement and service promotion.",
    icon: <FaBtc className="h-12 w-12 text-blue-400" />,
  },
  {
    title: "Promoter Hub",
    description:
      "Earn by promoting local businesses and services or sharing community-powered deals with your friends.",
    icon: <FaVolumeUp className="h-10 w-10 text-blue-400" />,
  },
  {
    title: "Service Directory",
    description:
      "Quickly find local offerings that match your needs using intuitive filters and categories.",
    icon: <FaAddressCard className="h-10 w-10 text-blue-400" />,
  },
  {
    title: "Role Based User Profiles",
    description:
      "Easily showcase your skills or service with profiles tailored to freelancers, promoters, and business owners.",
    icon: <FaUsers className="h-10 w-10 text-blue-400" />,
  },
  {
    title: "Reward Dashboard",
    description:
      "Stay motivated with real-time insights into your earnings, milestones, and progress through gamified tracking.",
    icon: <FaColumns className="h-10 w-10 text-blue-400" />,
  },
  {
    title: "Community Check-Ins",
    description:
      "Share your wins, track impact, and stay connected with the local businesses that matter most to you.",
    icon: <FaQrcode className="h-10 w-10 text-blue-400" />,
  },
];

const FeaturesSection = () => {
  return (
    <section className="flex flex-col items-center justify-center text-lg">
      <p className="my-4 font-bold text-base">
        🟦 Tools to grow within your local network.
      </p>
      <p className="text-gray-500">
        From listing your services to getting paid for promoting your community,
        LocalWorx.io gives you the infrastructure to grow your impct locally and
        sustainably.
      </p>
      {/* Features Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {/* Feature Cards */}
        {features.map((feature, index) => (
          <HomeFeaturesCard
            key={index}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
          />
        ))}
      </div>
    </section>
  );
};

export default FeaturesSection;
