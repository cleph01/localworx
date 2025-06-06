export type PromoterReview = {
  id: number;
  business_id: number;
  promoter_id: number;
  rating: number; // Expected range: 1–5
  review: string | null;
  is_public: boolean;
  created_at: string;
  updated_at: string;
};
