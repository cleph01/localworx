// app/api/search/services/route.ts
import { NextRequest, NextResponse } from "next/server";
import { handleSearchServicesRequest } from "./searchController";

export async function GET(req: NextRequest) {
  return handleSearchServicesRequest(req);
}
