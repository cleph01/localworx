import AvailableForWithdrawalCard from "../earnings/AvailableForWithdrawalCard";
import LifetimeEarningsCard from "../earnings/LifetimeEarningsCard";
import PendingPayoutCard from "../earnings/PendingPayoutCard";

const MyEarningsSnapshotSection = () => {
  return (
    <section className="max-w-4xl bg-white border border-gray-400 rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">💰 Your Earnings Snapshot</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <AvailableForWithdrawalCard />
        <LifetimeEarningsCard />
        <PendingPayoutCard />
      </div>
    </section>
  );
};

export default MyEarningsSnapshotSection;
