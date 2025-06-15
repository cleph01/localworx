// components/promoter-hub/earnings-summary/InKindPaymentCard.tsx

import Card from "../../ui/Card";
import MyRewardsSnapshotContent from "./MyRewardsSnapshotContent";
import MyRewardsSnapshotHeader from "./MyRewardsSnapshotHeader";
import useSWR from "swr";

type MyRewardsSnapshotCardProps = {
  userId: number | string; // The user ID to fetch the rewards snapshot for
};

const MyRewardsSnapshotCard = ({ userId }: MyRewardsSnapshotCardProps) => {
  // Client-side fetching of rewards-vault wallet
  // Generic fetcher function
  const fetcher = (url: string) =>
    fetch(url, { credentials: "same-origin" }).then((res) => {
      if (!res.ok) throw new Error("Rewards vault wallet response was not ok");
      return res.json();
    });

  const searchUrl = `/api/rewards-issued/user/${userId}`;

  const { data, error, isLoading } = useSWR(searchUrl, fetcher);

  if (isLoading) {
    return <div className="text-gray-500">Loading rewards details...</div>;
  }
  if (error) {
    return (
      <div className="p-6 text-red-600">
        Error loading rewards details: {error.message}
      </div>
    );
  }
  if (!data || data.length === 0) {
    return (
      <div className="p-6 text-gray-600">No rewards found for this user.</div>
    );
  }

  return (
    <Card
      Header={<MyRewardsSnapshotHeader count={data.length} />}
      Content={<MyRewardsSnapshotContent />}
      css="w-full max-w-sm"
    />
  );
};
export default MyRewardsSnapshotCard;
