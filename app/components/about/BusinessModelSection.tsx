// BusinessModelSection.tsx

import { FaBullhorn, FaBriefcase, FaDollarSign } from "react-icons/fa";

const BusinessModelSection = () => {
  return (
    <section className="px-4 mt-12">
      <h2 className="text-4xl font-bold text-center mb-6">
        A Transparent, Incentive-Driven Model
      </h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-lg text-gray-700">
        <div className="border border-gray-200 p-6 rounded shadow">
          <FaBriefcase className="w-8 h-8 text-blue-500 mb-2" />
          <h3 className="font-bold mb-2">Business Subscription</h3>
          <p className="text-gray-500 font-bold mb-2">$150/month</p>
          <ul className="list-disc space-y-2">
            <li>
              This montly subscription fee will be a sliding scale based on how
              much a business pays a local promoters for increased foot-traffic
              and visibility.
            </li>
            <li>
              The more businesses pay thier promoters, the less they pay
              LocalWorx.
            </li>
            <li>
              Genuine grassroots-marketing and reputation-building at its
              finest.
            </li>
          </ul>
        </div>
        <div className="border border-gray-200 p-6 rounded shadow">
          <FaBullhorn className="w-8 h-8 text-blue-500 mb-2" />
          <h3 className="font-bold mb-2">Community Promoter Posts</h3>
          <p className="text-gray-500 font-bold mb-2">$5/post</p>
          <ul className="list-disc mb-2 space-y-2">
            <li>Non-business users can post for a flat fee.</li>
            <li>
              Every post opens a universe of possibility to receive Bitcoin zaps
              from anyone in the world - outweighing the $5/post they spent.
            </li>
            <li>
              Promoters not only promote local businesses but they also promote
              themselves, their content, and their services as content creators.
            </li>
          </ul>
        </div>
        <div className="border border-gray-200 p-6 rounded shadow">
          <FaDollarSign className="w-8 h-8 text-blue-500 mb-2" />
          <h3 className="font-bold mb-2">Cost-Benefit by Design</h3>
          <p className="text-gray-500 font-bold mb-2">Win-WIn</p>
          <ul className="list-disc mb-2 space-y-2">
            <li>
              If you believe your content can deliver value—LocalWorx makes sure
              it pays. The $5/post helps prevent spam and preserves post
              quality.
            </li>
            <li>
              Earn Bitcoin by onboarding local businesses: 10% commission for
              the first 20, 25% for the next 30, and 50% for 50+ businesses you
              onboard via your presonalized referral link and QR code.
            </li>
            <li>
              Businesses can be promoters, too - ya' know - and earn way more
              than $150/month in Bitcoin Zaps to offset their their
              subscription.
            </li>

            {/* <li>
              ... And even if Bitcoin isn't your thing, be rewarded for your
              content in Bitcoin Zaps then immediately convert to USD. It's your
              choice.
            </li> */}
          </ul>
        </div>
      </div>
    </section>
  );
};

export default BusinessModelSection;
