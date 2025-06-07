import { renderMediaPreview } from "@/app/lib/media/renderMediaPreview";
import LazyLoadWrapper from "../ui/LazyLoadWrapper";
import { useFetchRewardById } from "@/app/hooks/reward/useFetchRewardById";

type RewardsIssuedCardHeaderProps = {
  rewardId: number | string;
};

const RewardsIssuedCardHeader = ({
  rewardId,
}: RewardsIssuedCardHeaderProps) => {
  // Import the custom hook to fetch reward details
  const { reward, loading, error } = useFetchRewardById(rewardId);

  if (loading) {
    return (
      <div className="w-full h-64 mt-2 rounded-xl border border-gray-200 bg-gray-200 animate-pulse" />
    );
  }
  if (error) {
    console.error("Error fetching reward:", error);
    return <div className="text-red-500">Error loading reward</div>;
  }
  if (!reward) {
    return <div className="text-gray-500">No reward found</div>;
  }
  return (
    <div className="">
      {/* Media preview (image or embed) */}
      {reward.image_url && (
        <LazyLoadWrapper
          fallback={
            <div className="w-full h-64 mt-2 rounded-xl border border-gray-200 bg-gray-200 animate-pulse" />
          }
          delayMs={200}
          timeoutMs={5000}
        >
          {/* Render media preview based on type - imported from app/lib/media*/}
          {/* This function will determine if it's an image or video and render accordingly */}
          {renderMediaPreview(reward.image_url, "image")}
        </LazyLoadWrapper>
      )}
      {/* Offer Description */}
      {/* Business Name */}
      <h3 className="text-xl sm:text-2xl font-extrabold text-slate-800 mt-4">
        {reward.name}
      </h3>
    </div>
  );
};

export default RewardsIssuedCardHeader;
