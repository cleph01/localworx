// app/marketplace/marketplaceTypes.ts

export interface MarketplaceItem {
  id: string; // Unique identifier for the item
  user_id: string; // ID of the user who posted the item
  title: string; // Title of the item
  description?: string; // Description of the item (optional)
  price: number; // Price of the item
  category: string; // Category of the item (e.g., 'service', 'product')
  media_url?: string; // URL of media (image/video) associated with the item (optional)
  created_at: Date; // Creation timestamp
  updated_at: Date; // Last updated timestamp
}

export interface MarketplaceItemInput {
  user_id: string; // User posting the item
  title: string; // Title of the item
  description?: string; // Description of the item
  price: number; // Price of the item
  category: string; // Category of the item
  media_url?: string; // URL of media (optional)
}

export interface MarketplaceItemUpdateInput {
  title?: string; // Title of the item
  description?: string; // Description of the item
  price?: number; // Price of the item
  category?: string; // Category of the item
  media_url?: string; // URL of media (optional)
}
