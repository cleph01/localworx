// app/api/marketplace/route.ts
import { NextRequest } from "next/server";
import {
  createMarketplaceItemHandler,
  getMarketplaceItemsHandler,
  getMarketplaceItemByIdHandler,
  updateMarketplaceItemHandler,
  deleteMarketplaceItemHandler,
} from "./marketplaceController";

export async function GET(req: NextRequest) {
  return getMarketplaceItemsHandler(req);
}

export async function POST(req: NextRequest) {
  return createMarketplaceItemHandler(req);
}
