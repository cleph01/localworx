export type RewardIssued = {
  id: number;
  user_id: number;
  business_id: number;
  reward_id: number;
  redeemed: boolean;
  resold: boolean;
  granted_at: string; // ISO string
  created_at: string;
  updated_at: string;
};
export type RewardIssuedExtended = RewardIssued & {
  business_name?: string;
  reward_name?: string;
  reward_description?: string;
  reward_media_url?: string;
};
