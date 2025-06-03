import { NextRequest } from "next/server";
import { getBusinessCategoryHandler } from "./businessCategoryController";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Extract the businessId from the context
  const { id } = await params;
  return getBusinessCategoryHandler(req, id);
}
