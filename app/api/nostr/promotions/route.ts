// app/api/nostr/promotions/route.ts

import { NextRequest, NextResponse } from "next/server";
import { publishPromotionController } from "./promotionsController";

// Entry point for publishing to Nostr relays
export async function POST(req: NextRequest) {
  return publishPromotionController(req);
}
