// MarketplaceItemCard.tsx

import { MarketplaceItem } from "@/types/marketplaceItem/marketplaceItemType";
import Card from "../../ui/Card";
import MarketplaceItemCardHeader from "./MarketplaceItemCardHeader";
import MarketplaceItemCardContent from "./MarketplaceItemCardContent";
import MarketPlaceItemCardFooter from "./MarketPlaceItemCardFooter";
import db from "@/db/db";
import { Reward } from "@/types/reward/rewardType";

type MarketplaceItemCardProps = {
  item: MarketplaceItem;
};

const MarketplaceItemCard = async ({ item }: MarketplaceItemCardProps) => {
  const reward = await db("rewards").where({ id: item.reward_id }).first();

  if (!reward) {
    return <div className="text-red-500">Reward not found</div>;
  }
  const { image_url, name, description } = reward;

  return (
    <Card
      Header={
        <MarketplaceItemCardHeader imageUrl={image_url} rewardName={name} />
      }
      Content={
        <MarketplaceItemCardContent
          businessId={item.business_id}
          sellerId={item.user_id}
          description={description}
        />
      }
      Footer={
        <MarketPlaceItemCardFooter
          id={item.id}
          name={name}
          price={item.price}
        />
      }
      css="w-full max-w-sm"
    />
  );
};

export default MarketplaceItemCard;
