/**
 * promotion/[id]/page.tsx
 * */

export type PromotionHeroSectionProps = {
  data: {
    title: string;
    business_id: string;
    media_url: string;
    media_type: string;
  };
};

export type PromotionDetailsSectionProps = {
  data: {
    description: string;
    terms_and_conditions: string;
    expires_at: string;
  };
};

export type PromotionRewardCalloutSectionProps = {
  data: { reward_id: string; business_id: string };
};

export type PromotionBusinessPreviewSectionProps = {
  data: {
    business_id: string;
  };
};

export type promoterDetailsSectionProps = {
  data: {
    promoter_id: string;
  };
};

/**
 *  PromoterDetailsSection.tsx
 **/
export type PromoterDetails = {
  promoter_id: string;
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
  media_url?: string;
  media_type?: string;
};

export type PromotionContentType = {
  id: string;
  promoter_id?: string;
  business_id?: string;

  description?: string;

  expires_at?: string;
};

export type PromotionFooterType = {
  clicks: string;
  views: string;
  referrals: string;
};

export type PromotionCardProps = {
  promotion: PromotionHeaderType & PromotionContentType & PromotionFooterType;
};
