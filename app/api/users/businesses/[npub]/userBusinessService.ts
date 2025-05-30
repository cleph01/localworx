import { getBusinessesByOwnerNpub } from "./userBusinessDAO";

export async function fetchBusinessesByUserNpub(npub: string) {
  return getBusinessesByOwnerNpub(npub);
}
