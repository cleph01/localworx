import { NextRequest } from "next/server";
import { getPostsHandler } from "./postsController";

export async function GET(req: NextRequest) {
  return getPostsHandler(req);
}
