import AvailableForWithdrawalCard from "./earnings-summary/AvailableForWithdrawalCard";
import InKindPayoutCard from "./earnings-summary/InKindPayoutCard";
import LifetimeEarningsCard from "./earnings-summary/LifetimeEarningsCard";
import PendingPayoutCard from "./earnings-summary/PendingPayoutCard";

const EarningsSummarySection = () => {
  return (
    <section className="flex flex-col mt-6">
      <h2 className="text-2xl font-bold mb-4">Earnings Summary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Available for Withdrawal Section */}
        <AvailableForWithdrawalCard />

        {/* Lifetime Earnings Section */}
        <LifetimeEarningsCard />

        {/* Pending Payout Section */}
        <PendingPayoutCard />

        {/* In-Kind Payout Section */}
        <InKindPayoutCard />
      </div>
    </section>
  );
};
export default EarningsSummarySection;
