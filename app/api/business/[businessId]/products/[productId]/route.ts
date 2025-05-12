// // ✅ app/api/business/products/[id]/route.ts
// import { NextRequest, NextResponse } from "next/server";
// import {
//   getBusinessProductByIdHandler,
//   updateBusinessProductByIdHandler,
//   deleteBusinessProductByIdHandler,
// } from "../businessProductController";

// // GET /api/business/products/[id]
// export async function GET(
//   req: NextRequest,
//   { params }: { params: { productId: string } }
// ) {
//   return getBusinessProductByIdHandler(req, { id: params.productId });
// }

// // PATCH /api/business/products/[id]
// export async function PATCH(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   return updateBusinessProductByIdHandler(req, params);
// }

// // DELETE /api/business/products/[id]
// export async function DELETE(
//   req: NextRequest,
//   { params }: { params: { id: string } }
// ) {
//   return deleteBusinessProductByIdHandler(req, params);
// }
