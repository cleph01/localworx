// app/api/users/create/createUserDAO.ts
import db from "@/db/db";

export async function insertBasicUser({
  npub,
  name,
  picture = null,
}: {
  npub: string;
  name: string;
  picture?: string | null;
}) {
  const [user] = await db("users")
    .insert({ npub, first_name: name, avatar_url: picture })
    .returning(["id", "npub", "first_name", "avatar_url"]);

  return user;
}
