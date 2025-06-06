import db from "@/db/db";

export async function getUserByNpub(npub: string) {
  return db("users").where({ npub }).first();
}
