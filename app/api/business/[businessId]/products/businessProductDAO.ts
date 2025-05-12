// ✅ app/api/business/products/businessProductDAO.ts
import knex from "../../../../../db/db";
import {
  CreateBusinessProductRequest,
  UpdateBusinessProductRequest,
} from "./businessProductTypes";

// Fetch all products for a given business
export async function getBusinessProducts(businessId: string) {
  return await knex("products")
    .select("id", "name", "description", "price", "business_id")
    .where({ business_id: businessId });
}

// Fetch a single product by its ID
export async function getBusinessProductById(id: string) {
  return await knex("products")
    .select("id", "name", "description", "price", "business_id")
    .where({ id })
    .first();
}

// Create a new product for a business
export async function createBusinessProduct(
  data: CreateBusinessProductRequest
) {
  const [product] = await knex("products")
    .insert({
      name: data.name,
      description: data.description,
      price: data.price,
      business_id: data.businessId,
    })
    .returning(["id", "name", "description", "price", "business_id"]);

  return product;
}

// Update an existing product
export async function updateBusinessProduct(
  data: UpdateBusinessProductRequest
) {
  const [product] = await knex("products")
    .where({ id: data.id })
    .update({
      ...(data.name && { name: data.name }),
      ...(data.description && { description: data.description }),
      ...(data.price && { price: data.price }),
    })
    .returning(["id", "name", "description", "price", "business_id"]);

  return product;
}

// Delete a product by its ID
export async function deleteBusinessProduct(id: string) {
  return await knex("products").where({ id }).del();
}
