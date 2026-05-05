import AvailableForWithdrawalCard from "../earnings/AvailableForWithdrawalCard";
import LifetimeEarningsCard from "../earnings/LifetimeEarningsCard";
import PendingPayoutCard from "../earnings/PendingPayoutCard";

const MyEarningsSnapshotSection = () => {
  return (
    <section className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-4">💰 Your Earnings Snapshot</h2>
      <div className="grid grid-cols-1 gap-4">
        <AvailableForWithdrawalCard />
        <LifetimeEarningsCard />
        <PendingPayoutCard />
      </div>
    </section>
  );
};

export default MyEarningsSnapshotSection;
