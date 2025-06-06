// components/business/BusinessCard/index.tsx
import dynamic from "next/dynamic";
// Lazy imports
const Client = dynamic(() => import("./BusinessCategorySection.client"));
const Server = dynamic(() => import("./BusinessCategorySection.server"));
// This ensures the client-side component is only loaded on the client side
// and not during server-side rendering, which is useful for components that rely on browser APIs or client-side state.
// This is particularly useful for components that need to fetch data on the client side or use browser-specific features.
// It allows you to conditionally render components based on whether the code is running on the client or server side.

type BusinessCategorySectionProps = {
  categoryId: string;
  clientSideFetch: boolean;
};

export default function BusinessCategorySection({
  categoryId,
  clientSideFetch,
}: BusinessCategorySectionProps) {
  if (clientSideFetch) {
    return <Client categoryId={categoryId} />;
  } else {
    return <Server categoryId={categoryId} />;
  }
}
