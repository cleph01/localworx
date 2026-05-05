// components/business/BusinessCard/BusinessReviewsSection/index.tsx

import dynamic from "next/dynamic";

const Client = dynamic(() => import("./BusinessReviewsSection.client"));
const Server = dynamic(() => import("./BusinessReviewsSection.server"));

type BusinessReviewsSectionProps = {
  businessId: string;
  clientSideFetch: boolean;
  showSnippet?: boolean;
};

export default function BusinessReviewsSection({
  businessId,
  clientSideFetch,
  showSnippet = false,
}: BusinessReviewsSectionProps) {
  if (clientSideFetch) {
    return <Client businessId={businessId} showSnippet={showSnippet} />;
  } else {
    return <Server businessId={businessId} showSnippet={showSnippet} />;
  }
}
