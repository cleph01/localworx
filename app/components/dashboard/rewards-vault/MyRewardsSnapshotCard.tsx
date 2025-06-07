// components/promoter-hub/earnings-summary/InKindPaymentCard.tsx
import { useFetchRewardsOwnedByUserId } from "@/app/hooks/rewards/useFetchRewardsOwnedByUserId";
import Card from "../../ui/Card";
import MyRewardsSnapshotContent from "./MyRewardsSnapshotContent";
import MyRewardsSnapshotHeader from "./MyRewardsSnapshotHeader";

type MyRewardsSnapshotCardProps = {
  userId: number | string; // The user ID to fetch the rewards snapshot for
};

const MyRewardsSnapshotCard = ({ userId }: MyRewardsSnapshotCardProps) => {
  const { rewards, loading, error } = useFetchRewardsOwnedByUserId(userId);
  if (loading) {
    return <div className="text-gray-500">Loading rewards details...</div>;
  }
  if (error) {
    return (
      <div className="p-6 text-red-600">
        Error loading rewards details: {error.message}
      </div>
    );
  }
  if (!rewards || rewards.length === 0) {
    return (
      <div className="p-6 text-gray-600">No rewards found for this user.</div>
    );
  }

  return (
    <Card
      Header={<MyRewardsSnapshotHeader count={rewards.length} />}
      Content={<MyRewardsSnapshotContent />}
      css="w-full max-w-sm"
    />
  );
};
export default MyRewardsSnapshotCard;
