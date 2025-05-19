type ListingHeaderType = {
  title?: string;
  description?: string;
  mediaUrl?: string;
  mediaType?: string;
};

type ListingContentType = {
  likes?: string;
  comments?: string;
};

type ListingFooterType = {
  publishDate: string;
};

type ContentListingCardProps = {
  listing: ListingHeaderType & ListingContentType & ListingFooterType;
};

export type {
  ListingHeaderType,
  ListingContentType,
  ListingFooterType,
  ContentListingCardProps,
};
