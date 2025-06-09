// MarketplaceItemCard.tsx

import { MarketplaceItem } from "@/types/marketplaceItem/marketplaceItemType";
import Card from "../../ui/Card";
import MarketplaceItemCardHeader from "./MarketplaceItemCardHeader";
import MarketplaceItemCardContent from "./MarketplaceItemCardContent";
import MarketPlaceItemCardFooter from "./MarketPlaceItemCardFooter";

type MarketplaceItemCardProps = {
  item: MarketplaceItem;
};

const MarketplaceItemCard = ({ item }: MarketplaceItemCardProps) => {
  const {
    id,
    user_id,
    business_id,
    reward_issued_id,
    reward_id,
    status,
    name,
    description,
    image_url,
    price,
    category,
    created_at,
    updated_at,
  } = item;

  return (
    <Card
      Header={
        <MarketplaceItemCardHeader title={name} mediaUrl={image_url ?? ""} />
      }
      Content={
        <MarketplaceItemCardContent
          businessId={business_id}
          sellerId={user_id}
        />
      }
      Footer={<MarketPlaceItemCardFooter id={id} name={name} price={price} />}
      css="w-full max-w-sm"
    />
  );
};

export default MarketplaceItemCard;
