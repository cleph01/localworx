import { getRewardsIssuedByUserId } from "./rewardsIssuedDAO";

export async function fetchRewardIssuedByUserId(id: string) {
  return getRewardsIssuedByUserId(id);
}
