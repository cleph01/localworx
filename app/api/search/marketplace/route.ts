import { NextRequest } from "next/server";
import { handleSearchMarketplaceRequest } from "./searchController";

export async function GET(req: NextRequest) {
  return handleSearchMarketplaceRequest(req);
}
