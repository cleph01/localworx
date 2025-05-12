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
  { params }: { params: { businessId: string; productId: string } }
) {
  return getBusinessProductByIdHandler(req, { id: params.productId });
}

// PATCH /api/business/[businessId]/products/[productId]
export async function PATCH(
  req: NextRequest,
  { params }: { params: { businessId: string; productId: string } }
) {
  return updateBusinessProductByIdHandler(req, { id: params.productId });
}

// DELETE /api/business/[businessId]/products/[productId]
export async function DELETE(
  req: NextRequest,
  { params }: { params: { businessId: string; productId: string } }
) {
  return deleteBusinessProductByIdHandler(req, { id: params.productId });
}
