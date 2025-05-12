// app/api/marketplace/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import {
  getMarketplaceItemByIdHandler,
  updateMarketplaceItemHandler,
  deleteMarketplaceItemHandler,
} from "../marketplaceController";

// GET request to fetch a marketplace item by ID
export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  return getMarketplaceItemByIdHandler(req, context);
}

// PUT request to update a marketplace item by ID
export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  return updateMarketplaceItemHandler(req, context);
}

// DELETE request to delete a marketplace item by ID
export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  return deleteMarketplaceItemHandler(req, context);
}
