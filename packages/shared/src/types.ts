// Row types mirroring supabase/migrations. Keep in sync when the schema changes.
export type Uuid = string;

export interface Profile {
  id: Uuid;
  pubkey: string;
  display_name: string;
  about: string | null;
  picture_url: string | null;
  lightning_address: string | null;
  created_at: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
}

export interface Business {
  id: Uuid;
  slug: string;
  name: string;
  description: string;
  category_id: number;
  address: string;
  city: string;
  state: string;
  lat: number;
  lng: number;
  phone: string | null;
  website: string | null;
  logo_url: string | null;
  lightning_address: string | null;
  hiring_promoters: boolean;
  is_active: boolean;
  /** When the owner signed the honor pledge (required before offering any reward or promotion). */
  honor_pledge_at: string | null;
  created_at: string;
}

export type StaffRole = "owner" | "staff";

export interface RewardProgram {
  id: Uuid;
  business_id: Uuid;
  name: string;
  description: string;
  visits_required: number;
  is_active: boolean;
}

export type RewardStatus = "earned" | "listed" | "redeemed";

export type RewardKind = "punch_card" | "promoter_payout";

// Every reward is an IOU from the shop: a filled punch card, or a promoter's in-kind payout.
export interface Reward {
  id: Uuid;
  kind: RewardKind;
  program_id: Uuid | null;
  promotion_id: Uuid | null;
  title: string;
  details: string | null;
  business_id: Uuid;
  owner_id: Uuid;
  status: RewardStatus;
  issued_at: string;
  redeemed_at: string | null;
}

export interface Checkin {
  id: Uuid;
  profile_id: Uuid;
  business_id: Uuid;
  created_at: string;
  referral_code: string | null;
}

export interface Promotion {
  id: Uuid;
  business_id: Uuid;
  title: string;
  body: string;
  media_url: string | null;
  terms: string | null;
  sats_per_visit: number;
  inkind_item: string | null;
  inkind_details: string | null;
  inkind_visits: number;
  starts_at: string;
  ends_at: string | null;
  is_active: boolean;
}

export type ClaimStatus = "pending" | "approved" | "rejected";

export interface PromotionClaim {
  id: Uuid;
  promotion_id: Uuid;
  promoter_id: Uuid;
  status: ClaimStatus;
  referral_code: string;
  created_at: string;
}

export type ListingStatus = "open" | "sold" | "cancelled";

export interface Listing {
  id: Uuid;
  reward_id: Uuid;
  seller_id: Uuid;
  price_sats: number;
  status: ListingStatus;
  created_at: string;
}

export interface Post {
  id: Uuid;
  author_id: Uuid;
  title: string;
  body: string;
  media_url: string | null;
  category_id: number | null;
  nostr_event_id: string | null;
  is_paid_promotion: boolean;
  created_at: string;
}

export interface HonorReport {
  id: Uuid;
  reward_id: Uuid;
  business_id: Uuid;
  reporter_id: Uuid;
  note: string;
  created_at: string;
  resolved_at: string | null;
  resolution: "made_right" | "dismissed" | null;
}
