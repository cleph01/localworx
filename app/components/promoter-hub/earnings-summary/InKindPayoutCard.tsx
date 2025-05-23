// components/promoter-hub/earnings-summary/InKindPaymentCard.tsx
import Card from "../../ui/Card";
import {
  InKindPayoutHeaderType,
  InKindPayoutContentType,
} from "./earningSummaryTypes";

// Sample data for the Available For Withdrawal Card
const inKindPayoutData = {
  amount: "36",
  description: "In-kind items",
};

const InKindPayoutCard = () => {
  /* Available For Withdrawal Card */
  const { amount, description } = inKindPayoutData;

  return (
    <Card
      Header={<InKindPayoutHeader {...inKindPayoutData} />}
      Content={<InKindPayoutContent {...inKindPayoutData} />}
      className="w-full max-w-sm"
    />
  );
};
export default InKindPayoutCard;

const InKindPayoutHeader = ({ amount }: InKindPayoutHeaderType) => (
  // Withdrawal Amount
  <div className="font-bold inline-flex items-center text-2xl">{amount}</div>
);

const InKindPayoutContent = ({ description }: InKindPayoutContentType) => (
  // Withdrawal Description
  <div className="inline-flex text-gray-400 font-semibold">{description}</div>
);
