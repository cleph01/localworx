import { NextRequest, NextResponse } from "next/server";
import { searchMarketplace } from "./searchService";

export async function handleSearchMarketplaceRequest(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const sortBy = searchParams.get("sortBy") || "relevance";

  try {
    const results = await searchMarketplace({ q, category, sortBy });
    return NextResponse.json({ results });
  } catch (error: any) {
    console.error("Search marketplace error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
