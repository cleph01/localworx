// components/business/BusinessCard/index.tsx
import dynamic from "next/dynamic";
// Lazy imports
const Client = dynamic(() => import("./AuthorProfileSection.client"));
const Server = dynamic(() => import("./AuthorProfileSection.server"));
// This ensures the client-side component is only loaded on the client side
// and not during server-side rendering, which is useful for components that rely on browser APIs or client-side state.
// This is particularly useful for components that need to fetch data on the client side or use browser-specific features.
// It allows you to conditionally render components based on whether the code is running on the client or server side.

type AuthorProfileSectionProps = {
  id: number | string;
  authorId: number | string;
  clientSideFetch: boolean;
};

export default function AuthorProfileSection({
  id,
  authorId,
  clientSideFetch,
}: AuthorProfileSectionProps) {
  if (clientSideFetch) {
    return <Client id={id} authorId={authorId} />;
  } else {
    return <Server id={id} authorId={authorId} />;
  }
}
