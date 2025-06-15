import { queryMarketplace } from "./searchDAO";

export async function searchMarketplace(params: any) {
  const rawResults = await queryMarketplace(params);

  return rawResults.map((row: any) => ({
    id: row.id,
    user_id: row.user_id,
    business_id: row.business_id,
    reward_id: row.reward_id,
    rewardIssued_id: row.reward_issued_id,
    status: row.status,
    price: row.price,
    notes: row.notes || null,
    created_at: row.created_at,
    updated_at: row.updated_at,
  }));
}
