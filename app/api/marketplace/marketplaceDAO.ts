// app/api/marketplace/marketplaceDAO.ts

import db from "@/db/db"; // Assuming knex instance is set up in the lib folder
import {
  MarketplaceItemInput,
  MarketplaceItemUpdateInput,
} from "./marketplaceTypes";

// Create a new marketplace item
export async function createMarketplaceItem(input: MarketplaceItemInput) {
  const [item] = await db("marketplace_items").insert(input).returning("*");
  return item;
}

// Get all marketplace items
export async function getAllMarketplaceItems() {
  return db("marketplace_items").select("*").orderBy("created_at", "desc");
}

// Get a marketplace item by its ID
export async function getMarketplaceItemById(id: string) {
  const [item] = await db("marketplace_items").where({ id }).limit(1);
  return item || null;
}

// Update a marketplace item
export async function updateMarketplaceItem(
  id: string,
  updates: MarketplaceItemUpdateInput
) {
  const [item] = await db("marketplace_items")
    .where({ id })
    .update({ ...updates, updated_at: new Date() })
    .returning("*");
  return item || null;
}

// Delete a marketplace item
export async function deleteMarketplaceItem(id: string) {
  const rowsAffected = await db("marketplace_items").where({ id }).del();
  return rowsAffected > 0;
}
