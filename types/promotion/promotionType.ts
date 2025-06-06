export type Promotion = {
  id: number | string; // Use number if ID is numeric, string if it can be alphanumeric
  business_id: number | string; // Use number if ID is numeric, string if it can be alphanumeric
  promoter_id: number | string | null; // Use number if ID is numeric, string if it can be alphanumeric, null if no promoter
  title: string;
  description: string;
  media_url: string;
  media_type: "image" | "video";
  expires_at: string; // ISO 8601 string, use Date if parsed
  is_active: boolean;
  terms_and_conditions?: string | null;
  created_at: string; // ISO string from DB (can use Date if parsed)
  updated_at: string; // same here
};
