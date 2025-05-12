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
  context: { params: { businessId: string; productId: string } }
) {
  const { productId } = context.params;
  return getBusinessProductByIdHandler(req, { id: productId });
}

// PATCH /api/business/[businessId]/products/[productId]
export async function PATCH(
  req: NextRequest,
  context: { params: { businessId: string; productId: string } }
) {
  const { productId } = context.params;
  return updateBusinessProductByIdHandler(req, {
    id: productId,
  });
}

// DELETE /api/business/[businessId]/products/[productId]
export async function DELETE(
  req: NextRequest,
  context: { params: { businessId: string; productId: string } }
) {
  const { productId } = context.params;
  return deleteBusinessProductByIdHandler(req, {
    id: productId,
  });
}
