export interface Business {
  // Basic info
  owner_id: string;
  business_name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  email: string;
  email_verified: boolean;
  website: string;
  description: string;
  // Latitude and longitude with 6 decimal places (standard for GPS precision)
  latitude: number;
  longitude: number;
  // Category identifier
  category_id: number;
}
