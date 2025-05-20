type ListingHeaderType = {
  title?: string;
  description?: string;
  mediaUrl?: string;
  mediaType?: string;
};

type ListingContentType = {
  description?: string;
};

type ListingFooterType = {
  likes?: string;
  comments?: string;
  zapCount?: string;
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
