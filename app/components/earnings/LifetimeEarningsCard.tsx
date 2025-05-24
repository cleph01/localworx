// LifetimeEarningsCard.tsx
import { FaBtc } from "react-icons/fa";
import Card from "../ui/Card";
import {
  LifetimeEarningsContentType,
  LifetimeEarningsHeaderType,
} from "./earningSummaryTypes";

// Sample data for the Available For Withdrawal Card
const lifetimeEarningsData = {
  amount: "4601.00",
  description: "Lifetime earnings",
};

const LifetimeEarningsCard = () => {
  /* Available For Withdrawal Card */
  const { amount, description } = lifetimeEarningsData;

  return (
    <Card
      Header={<LifetimeEarningsHeader {...lifetimeEarningsData} />}
      Content={<LifetimeEarningsContent {...lifetimeEarningsData} />}
      css="w-full max-w-sm"
    />
  );
};
export default LifetimeEarningsCard;

const LifetimeEarningsHeader = ({ amount }: LifetimeEarningsHeaderType) => (
  // Withdrawal Amount
  <div className="font-bold inline-flex items-center text-2xl">
    <span className="">
      <FaBtc className="text-orange-500" />
    </span>
    {amount}
  </div>
);

const LifetimeEarningsContent = ({
  description,
}: LifetimeEarningsContentType) => (
  // Withdrawal Description
  <div className="inline-flex text-gray-400 font-semibold">{description}</div>
);
