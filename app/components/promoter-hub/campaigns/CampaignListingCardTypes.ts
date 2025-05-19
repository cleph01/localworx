type ListingHeaderType = {
  businessName?: string;
  mediaUrl?: string;
  mediaType?: string;
};

type ListingContentType = {
  firstName?: string;
  rating?: string;
  reviewCount?: string;
  avatarUrl?: string;
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
