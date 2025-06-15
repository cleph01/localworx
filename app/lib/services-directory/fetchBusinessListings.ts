import { Business } from "@/types/business/businessType";

type FetchBusinessListingsResponse = {
  results: Business[];
  // Add other response fields if present
};

export async function fetchBusinessListings(
  searchTerm: string,
  category: string,
  hiring: boolean,
  sortBy: string,
  setResults: (results: Business[]) => void,
  setLoading: (loading: boolean) => void
): Promise<void> {
  setLoading(true);
  try {
    const params = new URLSearchParams({
      q: searchTerm,
      category,
      hiring: hiring.toString(),
      sortBy,
    });
    // Next.js has a glitch where it complains about
    // CORS when not using the full URL in a client-side fetch

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL;

    const res = await fetch(
      `${baseUrl}/api/search/services?${params.toString()}`
    );
    const data: FetchBusinessListingsResponse = await res.json();
    setResults(data.results || []);
  } catch (err) {
    console.error("Error fetching results:", err);
    setResults([]);
  } finally {
    setLoading(false);
  }
}
