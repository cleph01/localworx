export type Business = {
  id: number;
  description: string | null;
  pairing_uri_encrypted: string | null;
  wallet_created: boolean;
  wallet_id: string | null;
  business_name: string;
  address: string;
  city: string;
  state: string; // e.g., 'SC'
  phone: string | null;
  email: string | null;
  email_verified: boolean;
  website: string | null;
  logo_url: string | null;
  hiring_promoters: boolean;
  latitude: number;
  longitude: number;
  owner_id: number;
  category_id: number | null;
  created_at: string;
  updated_at: string;
};
