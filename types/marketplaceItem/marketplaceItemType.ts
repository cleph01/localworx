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

  price: number; // Ensure your decimal gets parsed properly in app logic
  notes?: string; // Optional notes about the item

  // Timestamps
  created_at: string; // ISO string
  updated_at: string; // ISO string
};
