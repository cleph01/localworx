import { NextRequest } from "next/server";
import { getPromoterReviewsByIdHandler } from "./promoterReviewsController";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return getPromoterReviewsByIdHandler(id);
}
