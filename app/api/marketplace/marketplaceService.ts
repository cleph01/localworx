// app/api/marketplace/marketplaceService.ts

import {
  createMarketplaceItem,
  getAllMarketplaceItems,
  getMarketplaceItemById,
  updateMarketplaceItem,
  deleteMarketplaceItem,
} from "./marketplaceDAO";
import {
  MarketplaceItemInput,
  MarketplaceItemUpdateInput,
} from "./marketplaceTypes";

/**
 * Create a new marketplace item
 */
export async function createMarketplaceItemService(data: MarketplaceItemInput) {
  return await createMarketplaceItem(data);
}

/**
 * Get all marketplace items
 */
export async function getMarketplaceItemsService() {
  return await getAllMarketplaceItems();
}

/**
 * Get a single marketplace item by ID
 */
export async function getMarketplaceItemByIdService(id: string) {
  return await getMarketplaceItemById(id);
}

/**
 * Update an existing marketplace item
 */
export async function updateMarketplaceItemService(
  id: string,
  updates: MarketplaceItemUpdateInput
) {
  return await updateMarketplaceItem(id, updates);
}

/**
 * Delete a marketplace item
 */
export async function deleteMarketplaceItemService(id: string) {
  return await deleteMarketplaceItem(id);
}
