// components/home/SignupStepsSection.tsx
import StepsCard from "./StepsCard";
import {
  CreateAccount,
  CommunityConnect,
  EarningSnapshot,
} from "./StepsCardHeaders";

// Steps Cards Test Data
const stepCards = [
  {
    header: <CreateAccount />,
    step: "01",
    title: "Create your profile",
    description:
      "Sign up and you'll automatically become a user, promoter, and business owner with a personalized profile.",
  },
  {
    header: <CommunityConnect />,
    step: "02",
    title: "Connect with your community",
    description:
      "Access discounts, rewards, and income by creating content that promotes your favorite local spots.",
  },
  {
    header: <EarningSnapshot />,
    step: "03",
    title: "Start earning and growing",
    description:
      "Get paid ₿itcoin directly from business owners for creating content and driving traffic to them - or by reselling rewards and discounts earned from Checking In while supporting your local shops.",
  },
];

const SignupStepsSection = () => {
  return (
    <section className=" min-w-screen mt-10 bg-slate-gray-background flex-col items-center justify-center text-lg px-4 py-8">
      <h2 className="text-5xl sm:text-6xl font-semibold text-white mb-6">
        Turn your skills into local{" "}
        <span className="font-serif italic">impact</span> in three simple steps
      </h2>
      <p className="text-base sm:text-lg font-semibold text-white mb-4">
        ◻️ Join, Share, Thrive
      </p>
      <p className="text-gray-200">
        Discover how quickly you can connect with your community, promote your
        and others' services, and start earning money—all in just a few clicks.
      </p>

      {/* Sign up and Earn Steps */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
        {stepCards.map((step, index) => (
          <div key={index} className="mb-4">
            <StepsCard
              header={step.header}
              step={step.step}
              title={step.title}
              description={step.description}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default SignupStepsSection;
