import { renderMediaPreview } from "@/app/lib/media/renderMediaPreview";
import LazyLoadWrapper from "../ui/LazyLoadWrapper";

import useSWR from "swr";

type RewardsIssuedCardHeaderProps = {
  rewardId: number | string;
};

const RewardsIssuedCardHeader = ({
  rewardId,
}: RewardsIssuedCardHeaderProps) => {
  // Client-side fetching of reward by reward ID
  // Generic fetcher function
  const fetcher = (url: string) =>
    fetch(url, { credentials: "same-origin" }).then((res) => {
      if (!res.ok)
        throw new Error("Promtion card business response was not ok");
      return res.json();
    });

  const searchUrl = `/api/reward/${rewardId}`;

  const { data: reward, error, isLoading } = useSWR(searchUrl, fetcher);

  if (isLoading) {
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
