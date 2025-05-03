// Coordinates used in geolocation
export type Coordinates = {
  latitude: number;
  longitude: number;
};

// Payload received when a user attempts to check in
export type CheckInRequest = Coordinates & {
  businessId: string;
  userId: string;
};

// Payload returned in API response
export type CheckInResponse = {
  success: boolean;
  message: string;
};

// Represents a reward offered by a business
export type Reward = {
  id: string;
  businessId: string;
  name: string;
  description?: string;
  threshold: number;
};

// Tracks when a user earns a reward
export type RewardGrant = {
  id: string;
  rewardId: string;
  userId: string;
  grantedAt: Date;
};
