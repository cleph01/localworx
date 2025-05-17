// api/nostr/promotions/route.ts
import { NextRequest, NextResponse } from "next/server";
import { publishPromotionService } from "./promotionsService";

// Controller: receives HTTP request, validates, and delegates to service
export async function publishPromotionController(req: NextRequest) {
  try {
    const body = await req.json();

    // Basic validation
    if (!body?.content || !body?.pubkey || !body?.sk) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const result = await publishPromotionService(body);
    return NextResponse.json({ success: true, relayCount: result });
  } catch (err) {
    console.error("Publish controller error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
