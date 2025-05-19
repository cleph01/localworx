// BusinessModelSection.tsx

import { FaBullhorn, FaBriefcase, FaDollarSign } from "react-icons/fa";

const BusinessModelSection = () => {
  return (
    <section className="px-4 mt-12">
      <h2 className="text-4xl font-bold text-center mb-6">
        A Transparent, Incentive-Driven Model
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg text-gray-700">
        <div className="border p-6 rounded shadow">
          <FaBriefcase className="w-8 h-8 text-blue-600 mb-2" />
          <h3 className="font-bold mb-2">Business Subscription</h3>
          <p>
            $100–250/month (sliding scale based on promoter engagement).
            Businesses fund grassroots marketing, build reputation, and reward
            genuine attention.
          </p>
        </div>
        <div className="border p-6 rounded shadow">
          <FaBullhorn className="w-8 h-8 text-blue-600 mb-2" />
          <h3 className="font-bold mb-2">Community Promoter Posts</h3>
          <p>
            Non-business users can publish for a flat $5/post—enabling them to
            receive Bitcoin zaps and earn more than they spend.
          </p>
        </div>
        <div className="border p-6 rounded shadow">
          <FaDollarSign className="w-8 h-8 text-blue-600 mb-2" />
          <h3 className="font-bold mb-2">Cost-Benefit by Design</h3>
          <p>
            If you believe your content can deliver value—LocalWorx makes sure
            it pays. All while preventing spam and preserving post quality.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BusinessModelSection;
