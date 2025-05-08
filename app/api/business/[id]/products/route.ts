// ✅ app/api/business/products/route.ts
import { NextRequest } from "next/server";
import {
  getBusinessProductsHandler,
  createBusinessProductHandler,
} from "./businessProductController";

// GET: Fetch all products for a given business
export async function GET(req: NextRequest) {
  return getBusinessProductsHandler(req);
}

// POST: Create a new product
export async function POST(req: NextRequest) {
  return createBusinessProductHandler(req);
}
