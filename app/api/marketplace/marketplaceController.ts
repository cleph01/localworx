// app/api/marketplace/marketplaceController.ts

import { NextRequest, NextResponse } from "next/server";
import {
  createMarketplaceItemService,
  getMarketplaceItemsService,
  getMarketplaceItemByIdService,
  updateMarketplaceItemService,
  deleteMarketplaceItemService,
} from "./marketplaceService";
import {
  MarketplaceItemInput,
  MarketplaceItemUpdateInput,
} from "./marketplaceTypes";

// Handler to create a new marketplace item
export async function createMarketplaceItemHandler(req: NextRequest) {
  try {
    const body: MarketplaceItemInput = await req.json();
    const newItem = await createMarketplaceItemService(body);
    return NextResponse.json(newItem, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handler to get all marketplace items
export async function getMarketplaceItemsHandler(req: NextRequest) {
  try {
    const items = await getMarketplaceItemsService();
    return NextResponse.json(items);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handler to get a specific marketplace item by ID
export async function getMarketplaceItemByIdHandler(
  req: NextRequest,
  id: string
) {
  try {
    const item = await getMarketplaceItemByIdService(id);
    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    return NextResponse.json(item);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handler to update an existing marketplace item
export async function updateMarketplaceItemHandler(
  req: NextRequest,
  id: string
) {
  try {
    const updates: MarketplaceItemUpdateInput = await req.json();
    const updatedItem = await updateMarketplaceItemService(id, updates);
    return NextResponse.json(updatedItem);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Handler to delete a marketplace item
export async function deleteMarketplaceItemHandler(
  req: NextRequest,
  id: string
) {
  try {
    await deleteMarketplaceItemService(id);
    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
