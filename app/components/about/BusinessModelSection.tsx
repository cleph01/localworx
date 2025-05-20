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
          <p className="text-gray-500 font-bold mb-2">$150/month</p>
          <ul className="list-disc space-y-2">
            <li>
              This montly subscription fee be a sliding scale based on how much
              pay local promoters for increased foot-traffic and visibility.
            </li>
            <li>
              The more businesses pay thier promoters, the less they pay the
              platform.
            </li>
            <li>
              Genuine grassroots marketing and reputation building at its
              finest.
            </li>
          </ul>
        </div>
        <div className="border p-6 rounded shadow">
          <FaBullhorn className="w-8 h-8 text-blue-600 mb-2" />
          <h3 className="font-bold mb-2">Community Promoter Posts</h3>
          <p className="text-gray-500 font-bold mb-2">$5/post</p>
          <ul className="list-disc mb-2 space-y-2">
            <li>Non-business users can publish for a flat fee.</li>
            <li>
              Every post opens a universe of possibility to receive Bitcoin zaps
              from everyone and anyone in the world - wholly outweighing what
              they spend.
            </li>
            <li>
              Promoters promote themselves, their content, and their services
              with each posts which entertains, informs, and encourages
              engagement with local businesses.
            </li>
          </ul>
        </div>
        <div className="border p-6 rounded shadow">
          <FaDollarSign className="w-8 h-8 text-blue-600 mb-2" />
          <h3 className="font-bold mb-2">Cost-Benefit by Design</h3>
          <p className="text-gray-500 font-bold mb-2">Win-WIn</p>
          <ul className="list-disc mb-2 space-y-2">
            <li>
              If you believe your content can deliver value—LocalWorx makes sure
              it pays. All while preventing spam and preserving post quality.
            </li>
            <li>
              Businesses can be promoters, too, and earn more than $150/month in
              Bitcoin zaps to offset their their subscription.
            </li>
            <li>
              Even if Bitcoin isn't your thing, earn frictionlessly via Bitcoin
              zaps then immediately convert to USD.
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BusinessModelSection;
