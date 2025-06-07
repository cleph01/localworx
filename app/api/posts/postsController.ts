import { NextRequest, NextResponse } from "next/server";
import { getPostsByAuthorId, getAllPosts } from "./postsService";

// Fetch all businesses by ownerId
export async function getPostsHandler(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const authorId = searchParams.get("authorId");

  try {
    if (authorId) {
      const businesses = await getPostsByAuthorId(authorId);
      return NextResponse.json(businesses);
    }

    const allPosts = await getAllPosts();
    return NextResponse.json(allPosts);
  } catch (err) {
    console.error("Failed to fetch business by param", err);
    return NextResponse.json(
      { error: "Failed to fetch businesses" },
      { status: 500 }
    );
  }
}
