import { getRewardById } from "./rewardDAO";

export async function fetchRewardById(id: string) {
  return getRewardById(id);
}
