import { listBusinesses } from "./businessesDAO";

export async function fetchBusinesses() {
  return listBusinesses();
}
