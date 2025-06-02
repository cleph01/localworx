// api/business/create/businessService.ts

import {
  createBusiness,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
  findOrCreateCategory,
} from "./businessDAO";
import { Business } from "./businessTypes";

export async function addBusiness(data: Business & { category_name?: string }) {
  let categoryId = data.category_id;

  if (!categoryId && data.category_name) {
    const normalizedName = data.category_name
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "_");
    categoryId = await findOrCreateCategory(normalizedName);
  }

  const business: Business = {
    ...data,
    category_id: categoryId,
  };

  return createBusiness(business);
}

export async function fetchBusiness(id: number) {
  return getBusinessById(id);
}

export async function modifyBusiness(id: number, updates: Partial<Business>) {
  return updateBusiness(id, updates);
}

export async function removeBusiness(id: number) {
  return deleteBusiness(id);
}
