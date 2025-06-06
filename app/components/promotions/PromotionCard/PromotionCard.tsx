import Card from "../../ui/Card";

import PromotionCardHeader from "./PromotionCardHeader";
import PromotionCardContent from "./PromotionCardContent";
import PromotionCardFooter from "./PromotionCardFooter";
// Importing the Promotion type for type safety
import { Promotion } from "@/types/promotion/promotionType";

type PromotionCardProps = {
  promotion: Promotion;
  clientSideFetch?: boolean; // Optional prop for client-side fetching
};

const PromotionCard = ({ promotion, clientSideFetch }: PromotionCardProps) => {
  return (
    <Card
      Header={<PromotionCardHeader {...promotion} />}
      Content={
        <PromotionCardContent
          {...promotion}
          clientSideFetch={clientSideFetch}
        />
      }
      Footer={
        <PromotionCardFooter
          promoterId={promotion.promoter_id ?? ""}
          clientSideFetch={clientSideFetch ?? false}
        />
      }
      css="w-full max-w-sm p-0 px-4"
    />
  );
};
export default PromotionCard;
