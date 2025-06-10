// MarketplaceItemHeroSection.tsx

import LazyLoadWrapper from "../ui/LazyLoadWrapper";
import { renderMediaPreview } from "@/app/lib/media/renderMediaPreview";
import db from "@/db/db";

type MarketplaceItemHeroSectionProps = {
  rewardId: number | string;
};

const MarketplaceItemHeroSection = async ({
  rewardId,
}: MarketplaceItemHeroSectionProps) => {
  // Fetch the reward details using the rewardId
  const reward = await db("rewards").where({ id: rewardId }).first();

  if (!reward) {
    return <div className="text-red-500">Reward not found</div>;
  }

  const { image_url, name, description } = reward;

  return (
    <section className="w-full max-w-4xl px-4">
      <LazyLoadWrapper>
        {/* Media preview (image or embed) */}
        {image_url && renderMediaPreview(image_url, "image")}
      </LazyLoadWrapper>
      <div className="flex flex-col gap-2 py-4">
        <h1 className="text-3xl font-bold">{name}</h1>
        <h2 className="text-xl font-bold my-4">📄 Description</h2>
        <p className="text-base text-gray-600">{description}</p>
      </div>
    </section>
  );
};

export default MarketplaceItemHeroSection;
