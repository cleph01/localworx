import { getUserByNpub } from "./userByNpubDAO";

export async function fetchUserByNpub(npub: string) {
  return getUserByNpub(npub);
}
