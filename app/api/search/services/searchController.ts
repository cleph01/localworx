// app/api/search/services/searchController.ts
import { NextRequest, NextResponse } from "next/server";
import { searchServices } from "./searchService";

export async function handleSearchServicesRequest(req: NextRequest) {
  const { searchParams } = new URL(req.url);

  const q = searchParams.get("q") || "";
  const category = searchParams.get("category") || "";
  const hiring = searchParams.get("hiring") === "true";
  const sortBy = searchParams.get("sortBy") || "relevance";

  try {
    const results = await searchServices({ q, category, hiring, sortBy });
    return NextResponse.json({ results });
  } catch (error: any) {
    console.error("Search services error:", error);
    return NextResponse.json({ error: "Search failed" }, { status: 500 });
  }
}
