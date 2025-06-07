export type Reward = {
  id: number;
  business_id: number;
  name: string;
  description: string;
  image_url: string | null;
  reward_type: "loyalty" | "in-kind";
  threshold: number | null;
  created_at: string;
  updated_at: string;
};

export type RewardWithDetails = Reward & {
  business_name: string; // Name of the business offering the reward
  is_owned_by_current_user?: boolean; // Optional, indicates if the reward is owned by the current user
};
