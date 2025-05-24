type ListingHeaderType = {
  businessName?: string;
  firstName?: string;
  rating?: number;
  reviewCount?: number;
  logoUrl?: string;
  zapCount?: number;
};

type ListingContentType = {
  businessHours?: string;
  address?: string;
  hiringPromoters?: boolean;
  hasSpecialOffers?: boolean;
  introOffer?: string;
};

type ListingFooterType = {
  id: string;
  categories?: string[];
};

type ServiceListingCardProps = {
  business: ListingHeaderType & ListingContentType & ListingFooterType;
};

export type {
  ListingHeaderType,
  ListingContentType,
  ListingFooterType,
  ServiceListingCardProps,
};
