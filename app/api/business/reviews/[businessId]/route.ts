import { NextRequest } from "next/server";
import { getBusinessReviewsHandler, postBusinessReviewHandler } from "./businessReviewsController";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params;
  return getBusinessReviewsHandler(businessId);
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ businessId: string }> }
) {
  const { businessId } = await params;
  return postBusinessReviewHandler(req, businessId);
}
