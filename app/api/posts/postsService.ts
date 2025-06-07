import { getPostsByAuthorIdDAO, getAllPostsDAO } from "./postsDAO";

export function getPostsByAuthorId(authorId: string) {
  return getPostsByAuthorIdDAO(authorId);
}

export function getAllPosts() {
  return getAllPostsDAO();
}
