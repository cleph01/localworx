import { getUserById } from "./userByIdDAO";

export async function fetchUserById(id: string) {
  return getUserById(id);
}
