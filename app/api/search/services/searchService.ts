// app/api/search/services/searchService.ts
import { queryServiceDirectory } from "./searchDAO";

type SearchParams = {
  q: string;
  category: string;
  hiring: boolean;
  sortBy: string;
};

export async function searchServices(params: SearchParams) {
  const rawResults = await queryServiceDirectory(params);

  return rawResults.map((row: any) => ({
    id: row.id,
    category_name: row.category_name,
    description: row.description,
    business_name: row.business_name,
    address: row.address,
    city: row.city,
    state: row.state,
    phone: row.phone,
    email: row.email,
    email_verified: row.email_verified,
    website: row.website,
    logo_url: row.logo_url,
    latitude: row.latitude,
    longitude: row.longitude,
    owner_id: row.owner_id,
    category_id: row.category_id,
    hiring_promoters: row.hiring_promoters,
  }));
}
