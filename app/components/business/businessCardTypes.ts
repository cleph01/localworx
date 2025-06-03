type BusinessCardHeaderType = {
  id: string;
  business_name?: string;
  first_name?: string;
  rating?: number;
  description?: string;
  logo_url?: string;
  zapCount?: number;
};

type BusinessCardContentType = {
  id: string;
  address?: string;
  hiring_promoters?: boolean;
  city?: string;
  state?: string;
  phone?: string;
  email?: string;
  website?: string;
};

type BusinessCardFooterType = {
  id: string;
  category_id?: string;
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
