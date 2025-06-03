// api/business/create/businessService.ts

import { getBusinessCategory } from "./businessCategoryDAO";

export async function fetchBusinessCategory(id: number) {
  return getBusinessCategory(id);
}
