import { NextRequest } from "next/server";
import { getPromotionByIdHandler } from "./promotionController";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Extract the id from the context
  const { id } = await params;
  return getPromotionByIdHandler(req, id);
}
