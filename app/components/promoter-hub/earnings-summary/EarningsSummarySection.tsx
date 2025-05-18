import AvailableForWithdrawalCard from "./AvailableForWithdrawalCard";
import LifetimeEarningsCard from "./LifetimeEarningsCard";

const EarningsSummarySection = () => {
  return (
    <section className="flex flex-col mt-6 gap-4">
      <h2 className="text-2xl font-bold">Earnings Summary</h2>
      {/* Available for Withdrawal Section */}
      <AvailableForWithdrawalCard />

      {/* Lifetime Earnings Section */}
      <LifetimeEarningsCard />
    </section>
  );
};
export default EarningsSummarySection;
