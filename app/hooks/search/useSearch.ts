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
  sortBy?: string; // used for marketplace / promotions
}

const useSearch = ({
  resourceType,
  query,
  category = "",
  isHiring = false,
  sortBy = "",
}: UseSearchParams) => {
  const [debouncedQuery] = useDebounce(query, 300);
  const [debouncedCategory] = useDebounce(category, 300);
  const [debouncedSortBy] = useDebounce(sortBy, 300);

  // Build dynamic query string
  const params = new URLSearchParams();
  if (debouncedQuery) params.append("q", debouncedQuery);
  if (debouncedCategory) params.append("category", debouncedCategory);
  if (resourceType === "services") {
    params.append("hiring", isHiring.toString());
  }
  if (debouncedSortBy) params.append("sortBy", debouncedSortBy);

  const searchUrl = `/api/search/${resourceType}?${params.toString()}`;
  const { data, error, isLoading } = useSWR(searchUrl, fetcher);

  return {
    data,
    isLoading,
    error,
  };
};
export default useSearch;
