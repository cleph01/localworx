// app/api/users/create/createUserService.ts
import { insertBasicUser } from "./createUserDAO";

export async function createUserService({
  npub,
  name,
  picture = null,
}: {
  npub: string;
  name: string;
  picture: string | null;
}) {
  console.log("Creating user in createUserService:", { npub, name, picture });
  return insertBasicUser({ npub, name, picture });
}
