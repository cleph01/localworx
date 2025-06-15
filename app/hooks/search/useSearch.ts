import { useMemo } from "react";
import useSWR from "swr";
import { useDebounce } from "use-debounce";

const fetcher = (url: string) =>
  fetch(url, { credentials: "same-origin" }).then((res) => {
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  });

interface UseSearchParams {
  resourceType: "services" | "promotions" | "marketplace";
  query: string;
  category?: string;
  isHiring?: boolean;
}

const useSearch = ({
  resourceType,
  query,
  category = "",
  isHiring = false,
}: UseSearchParams) => {
  const [debouncedQuery] = useDebounce(query, 300);
  const [debouncedCategory] = useDebounce(category, 300);

  // Memoize the full search URL to avoid re-renders
  const searchUrl = useMemo(() => {
    const params = new URLSearchParams();

    params.append("q", debouncedQuery || ""); // always include q
    params.append("category", debouncedCategory || "");

    if (resourceType === "services") {
      params.append("hiring", isHiring.toString());
    }

    return `/api/search/${resourceType}?${params.toString()}`;
  }, [resourceType, debouncedQuery, debouncedCategory, isHiring]);

  const { data, error, isLoading } = useSWR(searchUrl, fetcher);

  return {
    data,
    isLoading,
    error,
  };
};

export default useSearch;
