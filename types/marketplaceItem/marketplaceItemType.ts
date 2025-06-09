export type MarketplaceItem = {
  id: number;
  // The user who created the item
  user_id: number;
  // The business associated with the item,
  business_id: number;

  // Optional foreign keys for rewards issued and rewards
  reward_issued_id?: number | null;
  reward_id?: number | null;

  // Status lifecycle
  status: "live" | "sold" | "deleted" | "expired" | "reserved";

  // Core item details
  name: string;
  description?: string | null;
  image_url?: string | null;
  price: number; // Ensure your decimal gets parsed properly in app logic
  category: string;

  // Timestamps
  created_at: string; // ISO string
  updated_at: string; // ISO string
};
