// MarketplaceItemCard.tsx

import { MarketplaceItem } from "@/types/marketplaceItem/marketplaceItemType";
import Card from "../../ui/Card";
import MarketplaceItemCardHeader from "./MarketplaceItemCardHeader";
import MarketplaceItemCardContent from "./MarketplaceItemCardContent";
import MarketPlaceItemCardFooter from "./MarketPlaceItemCardFooter";
import { useFetchRewardById } from "@/app/hooks/reward/useFetchRewardById";

type MarketplaceItemCardProps = {
  item: MarketplaceItem;
};

const MarketplaceItemCard = ({ item }: MarketplaceItemCardProps) => {
  console.log("item at card: ", item);
  const { reward, loading, error } = useFetchRewardById(item.reward_id ?? "");
  if (loading) {
    return <div className="text-gray-500">Loading...</div>;
  }
  if (error) {
    return (
      <div className="text-red-500">Error loading reward: {error.message}</div>
    );
  }
  if (!reward) {
    return <div className="text-red-500">Reward not found</div>;
  }

  const { image_url, name, description } = reward;

  console.log("item @ marketplace card: ", item, "Rewards: ", reward);
  return (
    <Card
      Header={
        <MarketplaceItemCardHeader
          imageUrl={image_url ?? ""}
          rewardName={name}
          description={description}
        />
      }
      Content={
        <MarketplaceItemCardContent
          businessId={item.business_id}
          sellerId={item.user_id}
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
