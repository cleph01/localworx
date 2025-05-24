/**
 * promotion/[id]/page.tsx
 * */

export type PromotionHeroSectionProps = {
  data: {
    title: string;
    businessName: string;
    mediaUrl: string;
    mediaType: string;
  };
};

export type PromotionDetailsSectionProps = {
  data: {
    description: string;
    termsAndConditions: string;
    expiresAt: string;
  };
};

export type PromotionRewardCalloutSectionProps = {
  data: { rewardId: string; businessId: string };
};

export type PromotionBusinessPreviewSectionProps = {
  data: {
    businessId: string;
  };
};

export type promoterDetailsSectionProps = {
  data: {
    promoterId: string;
  };
};

/**
 *  PromoterDetailsSection.tsx
 **/
export type PromoterDetails = {
  promoterId: string;
  avatarUrl: string;
  firstName: string;
  rating: number;
  reviewCount: number;
};

/**
 *  PromotionCard.tsx
 **/
export type PromotionHeaderType = {
  title?: string;
  mediaUrl?: string;
  mediaType?: string;
};

export type PromotionContentType = {
  id: string;
  promoterId?: string;
  rating?: string;
  reviewCount?: string;

  businessName?: string;
  description?: string;
  address?: string;
  city?: string;
  state?: string;
  zip?: string;
  phone?: string;
  expiresAt?: string;
};

export type PromotionFooterType = {
  clicks: string;
  views: string;
  referrals: string;
};

export type PromotionCardProps = {
  promotion: PromotionHeaderType & PromotionContentType & PromotionFooterType;
};
