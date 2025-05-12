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
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return getMarketplaceItemByIdHandler(req, id);
}

// PUT request to update a marketplace item by ID
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return updateMarketplaceItemHandler(req, id);
}

// DELETE request to delete a marketplace item by ID
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return deleteMarketplaceItemHandler(req, id);
}
