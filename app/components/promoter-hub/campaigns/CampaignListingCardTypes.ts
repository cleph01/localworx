type ListingHeaderType = {
  title?: string;
  mediaUrl?: string;
  mediaType?: string;
};

type ListingContentType = {
  id: number;
  firstName?: string;
  rating?: string;
  reviewCount?: string;
  avatarUrl?: string;
  businessName?: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  phone?: string;
  expiresAt?: string;
};

type ListingFooterType = {
  clicks: string;
  views: string;
  referrals: string;
};

type CampaignListingCardProps = {
  listing: ListingHeaderType & ListingContentType & ListingFooterType;
};

export type {
  ListingHeaderType,
  ListingContentType,
  ListingFooterType,
  CampaignListingCardProps,
};
