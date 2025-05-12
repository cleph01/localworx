// app/api/marketplace/marketplaceTypes.ts

export interface MarketplaceItem {
  id: string;
  user_id: string;
  title: string;
  description: string;
  price: number;
  category: string;
  created_at: Date;
  updated_at: Date;
}

export interface MarketplaceItemInput {
  user_id: string;
  title: string;
  description: string;
  price: number;
  category: string;
}

export interface MarketplaceItemUpdateInput {
  title?: string;
  description?: string;
  price?: number;
  category?: string;
}

/*
Explanation:
MarketplaceItem: Defines the structure of a marketplace item. It includes the necessary fields like id, user_id, title, price, category, and media_url, along with created_at and updated_at timestamps.

MarketplaceItemInput: Defines the structure of the data that will be provided when creating a new marketplace item. This is used on the POST request to create a new item.

MarketplaceItemUpdateInput: Defines the structure of the data that will be provided when updating an existing marketplace item. It allows partial updates to the item (i.e., not all fields are required to be updated).
*/
