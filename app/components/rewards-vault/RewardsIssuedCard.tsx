import { RewardIssued } from "@/types/reward/rewardIssuedType";
import Card from "../ui/Card";
import RewardsIssuedCardHeader from "./RewardsIssuedCardHeader";
import RewardsIssuedCardFooter from "./RewardsIssuedCardFooter";
import RewardsIssuedCardContent from "./RewardsIssuedCardContent";

const RewardsIssuedCard = ({
  reward_id,
  business_id,
  redeemed,
  resold,
  granted_at,
}: RewardIssued) => {
  return (
    <Card
      Header={<RewardsIssuedCardHeader rewardId={reward_id} />}
      Content={<RewardsIssuedCardContent businessId={business_id} />}
      Footer={
        <RewardsIssuedCardFooter
          redeemed={redeemed}
          resold={resold}
          grantedAt={granted_at}
        />
      }
      css="w-full max-w-sm border border-gray-200 transition-shadow hover:shadow-xl"
    />
  );
};

export default RewardsIssuedCard;
