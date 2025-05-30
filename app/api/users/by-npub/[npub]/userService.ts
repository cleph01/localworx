import { getUserByNpub } from "./userDAO";

export async function fetchUserByNpub(npub: string) {
  return getUserByNpub(npub);
}
