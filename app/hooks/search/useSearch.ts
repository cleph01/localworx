import useSWR from "swr";
import { useDebounce } from "use-debounce";

// Generic fetcher function
const fetcher = (url: string) =>
  fetch(url, { credentials: "same-origin" }).then((res) => {
    if (!res.ok) throw new Error("Network response was not ok");
    return res.json();
  });

interface UseSearchParams {
  resourceType: "services" | "promotions" | "marketplace";
  query: string;
  category?: string;
  isHiring?: boolean; // only used for services
}

const useSearch = ({
  resourceType,
  query,
  category = "",
  isHiring = false,
}: UseSearchParams) => {
  const [debouncedQuery] = useDebounce(query, 300);
  const [debouncedCategory] = useDebounce(category, 300);

  // Build dynamic query string
  const params = new URLSearchParams();
  // If query term is provided, add it to the params
  if (debouncedQuery) params.append("q", debouncedQuery);
  // Only add category if it's provided
  if (debouncedCategory) params.append("category", debouncedCategory);
  // Only add isHiring if the resource type is services
  if (resourceType === "services") {
    params.append("hiring", isHiring.toString());
  }

  const searchUrl = `/api/search/${resourceType}?${params.toString()}`;
  const { data, error, isLoading } = useSWR(searchUrl, fetcher);

  return {
    data,
    isLoading,
    error,
  };
};
export default useSearch;
