import {
  createBusiness,
  getBusinessById,
  updateBusiness,
  deleteBusiness,
} from "./businessDAO";
import { Business } from "./businessTypes";

export async function addBusiness(business: Business) {
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
