// app/api/business/[businessId]/products/[productId]/route.ts
import { NextRequest } from "next/server";
import {
  getBusinessProductByIdHandler,
  updateBusinessProductByIdHandler,
  deleteBusinessProductByIdHandler,
} from "../businessProductController"; // adjust path as needed

// GET /api/business/[businessId]/products/[productId]
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ businessId: string; productId: string }> }
) {
  const { productId } = await params;

  return await getBusinessProductByIdHandler(req, productId);
}

// PATCH /api/business/[businessId]/products/[productId]
export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ businessId: string; productId: string }> }
) {
  const { productId } = await params;
  return updateBusinessProductByIdHandler(req, productId);
}

// DELETE /api/business/[businessId]/products/[productId]
export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ businessId: string; productId: string }> }
) {
  const { productId } = await params;
  return deleteBusinessProductByIdHandler(req, productId);
}
