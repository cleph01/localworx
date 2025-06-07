import db from "@/db/db";

export function getPostsByAuthorIdDAO(authorId: string) {
  return db("posts").where("user_id", Number(authorId));
}

export function getAllPostsDAO() {
  return db("posts").select("*");
}
