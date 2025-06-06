// api/business/create/businessService.ts
import { getBusinessCategory } from "./businessCategoryDAO";

export async function fetchBusinessCategory(categoryId?: number) {
  return getBusinessCategory(categoryId);
}
