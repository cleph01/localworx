// app/api/marketplace/route.ts
import { NextRequest } from "next/server";
import {
  createMarketplaceItemHandler,
  getMarketplaceItemsHandler,
  getMarketplaceItemByIdHandler,
  updateMarketplaceItemHandler,
  deleteMarketplaceItemHandler,
} from "./marketplaceController";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  return getMarketplaceItemsHandler(req, context);
}

export async function POST(req: NextRequest) {
  return createMarketplaceItemHandler(req);
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  return updateMarketplaceItemHandler(req, context);
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  return deleteMarketplaceItemHandler(req, context);
}
