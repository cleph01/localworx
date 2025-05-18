type ListingHeaderType = {
  businessName?: string;
  firstName?: string;
  rating?: number;
  reviewCount?: number;
  avatarUrl?: string;
};

type ListingContentType = {
  businessHours?: string;
  address?: string;
  hiringPromoters?: boolean;
  hasSpecialOffers?: boolean;
  introOffer?: string;
};

type ListingFooterType = {
  categories?: string[];
};

type ServiceListingCardProps = {
  listing: ListingHeaderType & ListingContentType & ListingFooterType;
};

export type {
  ListingHeaderType,
  ListingContentType,
  ListingFooterType,
  ServiceListingCardProps,
};
