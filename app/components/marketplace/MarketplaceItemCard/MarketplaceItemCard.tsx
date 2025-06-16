// MarketplaceItemCard.tsx

import { MarketplaceItem } from "@/types/marketplaceItem/marketplaceItemType";
import Card from "../../ui/Card";
import MarketplaceItemCardHeader from "./MarketplaceItemCardHeader";
import MarketplaceItemCardContent from "./MarketplaceItemCardContent";
import MarketPlaceItemCardFooter from "./MarketPlaceItemCardFooter";

import useSWR from "swr";

type MarketplaceItemCardProps = {
  item: MarketplaceItem;
};

const MarketplaceItemCard = ({ item }: MarketplaceItemCardProps) => {
  // Client-side fetching of category
  // Generic fetcher function
  const fetcher = (url: string) =>
    fetch(url, { credentials: "same-origin" }).then((res) => {
      if (!res.ok)
        throw new Error("Marketplace item fetch response was not ok");
      return res.json();
    });

  const searchUrl = `/api/reward/${item.reward_id}`;

  const { data: reward, error, isLoading } = useSWR(searchUrl, fetcher);

  if (isLoading) {
    return <div className="text-gray-500">Loading category...</div>;
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
