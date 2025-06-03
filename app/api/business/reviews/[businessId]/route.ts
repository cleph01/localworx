import { NextRequest } from "next/server";
import { getBusinessReviewsHandler } from "./businessReviewsController";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params;
  return getBusinessReviewsHandler(businessId);
}
