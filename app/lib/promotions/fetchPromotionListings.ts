import { Promotion } from "@/types/promotion/promotionType";

type FetchPromotionListingsResponse = {
  results: Promotion[];
  // Add other response fields if present
};

export async function fetchPromotionListings(
  searchTerm: string,
  category: string,

  sortBy: string,
  setResults: (results: Promotion[]) => void,
  setLoading: (loading: boolean) => void
): Promise<void> {
  setLoading(true);
  try {
    const params = new URLSearchParams({
      q: searchTerm,
      category,

      sortBy,
    });
    const res = await fetch(`/api/search/promotions?${params.toString()}`);
    const data: FetchPromotionListingsResponse = await res.json();

    setResults(data.results || []);
  } catch (err) {
    console.error("Error fetching results:", err);
    setResults([]);
  } finally {
    setLoading(false);
  }
}
