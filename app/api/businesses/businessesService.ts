import { listBusinesses } from "./businessesDAO";

export async function fetchBusinesses(ownerId?: number) {
  return listBusinesses(ownerId);
}
