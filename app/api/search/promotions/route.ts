import { NextRequest } from "next/server";
import { handleSearchPromotionsRequest } from "./searchController";

export async function GET(req: NextRequest) {
  return handleSearchPromotionsRequest(req);
}
