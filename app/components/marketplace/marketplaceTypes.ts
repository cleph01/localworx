type MarketplaceItem = {
  id: string;
  title: string;
  mediaUrl: string;
  price: string; // e.g. "0.0004"
  mediaType: string; // e.g. "image", "video"
  businessName: string;
  businessRating: string; // e.g. "4.5"
  businessRatingCount: string; // e.g. "120"
  businessReviewCount: string; // e.g. "50"
  businessLocation: string; // e.g. "Greenville, SC"
  category: string;
  description: string;
};

type CartItem = {
  id: string; // Unique identifier for the item
  name: string; // Name of the item
  price: number; // Price of the item
  quantity: number; // Quantity of the item in the cart
};

type ListingHeaderType = {
  title: string;
  mediaUrl?: string;
  mediaType?: string;
};

type ListingContentType = {
  firstName?: string;
  rating?: string;
  reviewCount?: string;
  avatarUrl?: string;
  businessName?: string;
  businessRating?: string;
  businessRatingCount?: string;
  businessReviewCount?: string;
  businessLocation?: string;
  description?: string;
  price?: string;
  category?: string;
  zapCount?: string;
};

type ListingFooterType = {
  item: MarketplaceItem;

  // Interesting suggestions for future features:
  // handleAddToCart: (e: React.MouseEvent) => void;
  // handleRemoveFromCart: (e: React.MouseEvent) => void;
  // handleViewDetails: (e: React.MouseEvent) => void;
  // handleBuyNow: (e: React.MouseEvent) => void;
  // handleShare: (e: React.MouseEvent) => void;
  // handleZap: (e: React.MouseEvent) => void;
  // handleViewProfile: (e: React.MouseEvent) => void;
};

type MarketplaceListingCardProps = {
  listing: ListingHeaderType & ListingContentType & ListingFooterType;
};

export type {
  MarketplaceItem,
  CartItem,
  ListingHeaderType,
  ListingContentType,
  ListingFooterType,
  MarketplaceListingCardProps,
};
