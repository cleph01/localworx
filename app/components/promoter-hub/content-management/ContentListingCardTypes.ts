type ListingHeaderType = {
  title?: string;
  description?: string;
  mediaUrl?: string;
  mediaType?: string;
};

type ListingContentType = {
  id?: number;
  description?: string;
  firstName?: string;
  avatarUrl?: string;
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
