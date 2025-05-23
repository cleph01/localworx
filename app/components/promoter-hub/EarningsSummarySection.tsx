import AvailableForWithdrawalCard from "./earnings-summary/AvailableForWithdrawalCard";
import InKindPayoutCard from "./earnings-summary/InKindPayoutCard";
import LifetimeEarningsCard from "./earnings-summary/LifetimeEarningsCard";
import PendingPayoutCard from "./earnings-summary/PendingPayoutCard";

const EarningsSummarySection = () => {
  return (
    <section className="flex flex-col mt-6 px-4">
      <h2 className="text-3xl font-bold text-slate-800 mb-2">
        Earnings Summary
      </h2>
      <p className="text-base text-gray-500 font-medium mb-4">
        Track your total payouts, pending balances, and in-kind commissions
      </p>
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
