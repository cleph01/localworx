import MyRewardsSnapshotCard from "../rewards-vault/MyRewardsSnapshotCard";

type MyRewardsVaultSectionProps = {
  userId: number | string; // The ID of the user to fetch rewards for
};

const MyRewardsVaultSection = ({ userId }: MyRewardsVaultSectionProps) => {
  return (
    <section className="max-w-4xl bg-white border border-gray-400 rounded-lg shadow-sm p-6 mb-6">
      <h2 className="text-2xl font-bold mb-4">💰 Your Rewards Vault</h2>
      <p className="text-sm text-gray-500 mb-4">
        View and manage your rewards earned from your promotions, referrals, and
        checkins.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MyRewardsSnapshotCard userId={userId} />
      </div>
    </section>
  );
};

export default MyRewardsVaultSection;
