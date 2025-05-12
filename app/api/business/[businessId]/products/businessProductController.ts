// ✅ app/api/business/products/businessProductController.ts
import { NextRequest, NextResponse } from "next/server";
import {
  getBusinessProductsService,
  getBusinessProductByIdService,
  createBusinessProductService,
  updateBusinessProductService,
  deleteBusinessProductService,
} from "./businessProductService";

// GET: Fetch all products for a specific business
export async function getBusinessProductsHandler(req: NextRequest) {
  try {
    const business_id = req.nextUrl.searchParams.get("businessId");
    if (!business_id) {
      throw new Error("businessId is required");
    }
    const products = await getBusinessProductsService(business_id);
    return NextResponse.json(products);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}

// GET: Fetch a single product by its ID
export async function getBusinessProductByIdHandler(
  _req: NextRequest,
  id: string
) {
  try {
    const product = await getBusinessProductByIdService(id);
    if (!product) {
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}

// POST: Create a new product
export async function createBusinessProductHandler(req: NextRequest) {
  try {
    const data = await req.json();
    const newProduct = await createBusinessProductService(data);
    return NextResponse.json(newProduct, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 400 }
    );
  }
}

// PATCH: Update a product by ID
export async function updateBusinessProductByIdHandler(
  req: NextRequest,
  id: string
) {
  try {
    const data = await req.json();
    const updated = await updateBusinessProductService({
      id: id,
      ...data,
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}

// DELETE: Remove a product by ID
export async function deleteBusinessProductByIdHandler(
  _req: NextRequest,
  id: string
) {
  try {
    await deleteBusinessProductService(id);
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json(
      { success: false, message: (error as Error).message },
      { status: 500 }
    );
  }
}
