import { NextRequest } from "next/server";
import { getBusinessCategoryHandler } from "./businessCategoryController";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ categoryId: string }> }
) {
  const { categoryId } = await params;
  return getBusinessCategoryHandler(categoryId);
}
