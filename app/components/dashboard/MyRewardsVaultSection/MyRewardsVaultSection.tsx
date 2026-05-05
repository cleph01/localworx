import MyRewardsSnapshotCard from "../rewards-vault/MyRewardsSnapshotCard";

type MyRewardsVaultSectionProps = {
  userId: number | string; // The ID of the user to fetch rewards for
};

const MyRewardsVaultSection = ({ userId }: MyRewardsVaultSectionProps) => {
  return (
    <section className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-6">
      <h2 className="text-2xl font-bold mb-4">💰 Your Rewards Vault</h2>
      <p className="text-sm text-gray-500 mb-4">
        View and manage your rewards earned from your promotions, referrals, and
        checkins.
      </p>
      <div className="grid grid-cols-1 gap-4">
        <MyRewardsSnapshotCard userId={userId} />
      </div>
    </section>
  );
};

export default MyRewardsVaultSection;
