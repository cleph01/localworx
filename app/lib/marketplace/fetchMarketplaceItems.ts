import { MarketplaceItem } from "@/types/marketplaceItem/marketplaceItemType";

type FetchMarketplaceItemsResponse = {
  results: MarketplaceItem[];
  // Add other response fields if present
};

export async function fetchMarketplaceItems(
  searchTerm: string,
  category: string,
  sortBy: string,
  setResults: (results: MarketplaceItem[]) => void,
  setLoading: (loading: boolean) => void
): Promise<void> {
  setLoading(true);
  try {
    const params = new URLSearchParams({
      q: searchTerm,
      category,
      sortBy,
    });
    const res = await fetch(`/api/search/marketplace?${params.toString()}`);
    const data: FetchMarketplaceItemsResponse = await res.json();
    setResults(data.results || []);
  } catch (err) {
    console.error("Error fetching results:", err);
    setResults([]);
  } finally {
    setLoading(false);
  }
}
