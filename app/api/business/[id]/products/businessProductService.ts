// ✅ app/api/business/products/businessProductService.ts
import {
  getBusinessProducts,
  getBusinessProductById,
  createBusinessProduct,
  updateBusinessProduct,
  deleteBusinessProduct,
} from "./businessProductDAO";

import {
  CreateBusinessProductRequest,
  UpdateBusinessProductRequest,
} from "./businessProductTypes";

// Service to get all products for a business
export async function getBusinessProductsService(businessId: string) {
  if (!businessId) throw new Error("Business ID is required to fetch products");
  return await getBusinessProducts(businessId);
}

// Service to get a single product by ID
export async function getBusinessProductByIdService(id: string) {
  if (!id) throw new Error("Product ID is required to fetch product");
  return await getBusinessProductById(id);
}

// Service to create a new product
export async function createBusinessProductService(
  data: CreateBusinessProductRequest
) {
  if (!data.name || !data.businessId)
    throw new Error("Missing required fields: name and businessId");
  return await createBusinessProduct(data);
}

// Service to update an existing product
export async function updateBusinessProductService(
  data: UpdateBusinessProductRequest
) {
  if (!data.id) throw new Error("Product ID is required for update");
  return await updateBusinessProduct(data);
}

// Service to delete a product by ID
export async function deleteBusinessProductService(id: string) {
  if (!id) throw new Error("Product ID is required for deletion");
  return await deleteBusinessProduct(id);
}
