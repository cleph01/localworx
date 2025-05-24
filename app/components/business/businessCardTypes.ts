type BusinessCardHeaderType = {
  businessName?: string;
  firstName?: string;
  rating?: number;
  reviewCount?: number;
  logoUrl?: string;
  zapCount?: number;
};

type BusinessCardContentType = {
  businessHours?: string;
  address?: string;
  hiringPromoters?: boolean;
  hasSpecialOffers?: boolean;
  introOffer?: string;
};

type BusinessCardFooterType = {
  id: string;
  categories?: string[];
};

type BusinessCardProps = {
  business: BusinessCardHeaderType &
    BusinessCardContentType &
    BusinessCardFooterType;
};

export type {
  BusinessCardHeaderType,
  BusinessCardContentType,
  BusinessCardFooterType,
  BusinessCardProps,
};
