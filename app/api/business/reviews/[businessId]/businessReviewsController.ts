import { NextRequest, NextResponse } from "next/server";
import { fetchBusinessReviews, createBusinessReview } from "./businessReviewsService";

export async function getBusinessReviewsHandler(businessId: string) {
  try {
    const businessReviews = await fetchBusinessReviews(Number(businessId));
    return NextResponse.json(businessReviews);
  } catch (err) {
    console.error("Error in getBusinessReviewsHandler:", err);
    return NextResponse.json({ error: "Failed to fetch reviews" }, { status: 500 });
  }
}

export async function postBusinessReviewHandler(
  req: NextRequest,
  businessId: string
) {
  try {
    const { reviewerId, rating, review } = await req.json();
    if (!reviewerId || !rating) {
      return NextResponse.json({ error: "reviewerId and rating are required" }, { status: 400 });
    }
    const created = await createBusinessReview({
      businessId: Number(businessId),
      reviewerId: Number(reviewerId),
      rating: Number(rating),
      review,
    });
    return NextResponse.json(created, { status: 201 });
  } catch (err: any) {
    console.error("Error in postBusinessReviewHandler:", err);
    return NextResponse.json({ error: err.message ?? "Failed to submit review" }, { status: 500 });
  }
}
