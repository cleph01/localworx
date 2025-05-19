type MarketplaceItem = {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  price: string; // e.g. "0.0004"
  location?: string;
};

type CartItem = {
  id: string; // Unique identifier for the item
  name: string; // Name of the item
  price: number; // Price of the item
  quantity: number; // Quantity of the item in the cart
};
export type { MarketplaceItem, CartItem };
