export type BusinessReview = {
  rating: number;
  review: string;
  business_id: number;
  reviewer_id: number;
};
export type BusinessReviewResponse = {
  id: number;
  created_at: string;
  updated_at: string;
} & BusinessReview;
