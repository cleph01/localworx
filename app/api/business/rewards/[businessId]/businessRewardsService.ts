import { listBusinessRewards } from "./businessRewardsDAO";

export async function fetchBusinessRewards(businessId?: number) {
  return listBusinessRewards(businessId);
}
