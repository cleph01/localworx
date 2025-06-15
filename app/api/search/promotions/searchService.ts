// app/api/search/services/searchService.ts
import { queryPromotions } from "./searchDAO";

type SearchParams = {
  q: string;
  category: string;
  sortBy: string;
};

export async function searchPromotions(params: SearchParams) {
  const rawResults = await queryPromotions(params);

  // Optionally transform results (e.g., truncate description, format imageUrl)
  // return rawResults.map((row: any) => ({
  //   id: row.id,
  //   title: row.name,
  //   description: row.description,
  //   imageUrl: row.image_url || null,
  // }));

  return rawResults;
}
