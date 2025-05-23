// /components/promoter-hub/earnings-summary/PendingPayoutCard.tsx
import { FaBtc } from "react-icons/fa";
import Button from "../../ui/Button";
import Card from "../../ui/Card";
import {
  PendingPayoutHeaderType,
  PendingPayoutContentType,
} from "./earningSummaryTypes";

// Sample data for the Available For Withdrawal Card
const pendingPayoutData = {
  amount: "400.00",
  description: "Pending payout",
};

const PendingPayoutCard = () => {
  /* Available For Withdrawal Card */
  const { amount, description } = pendingPayoutData;

  return (
    <Card
      Header={<PendingPayoutHeader {...pendingPayoutData} />}
      Content={<PendingPayoutContent {...pendingPayoutData} />}
      className="w-full max-w-sm"
    />
  );
};
export default PendingPayoutCard;

const PendingPayoutHeader = ({ amount }: PendingPayoutHeaderType) => (
  // Withdrawal Amount
  <div className="font-bold inline-flex items-center text-2xl">
    <span className="">
      <FaBtc className="text-orange-500" />
    </span>
    {amount}
  </div>
);

const PendingPayoutContent = ({ description }: PendingPayoutContentType) => (
  // Withdrawal Description
  <div className="inline-flex text-gray-400 font-semibold">{description}</div>
);
