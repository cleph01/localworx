// /app/api/nostr/zap/totals/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getZapTotalsHandler } from "./zapTotalsController";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const targetPubkey = searchParams.get("targetPubkey");
  const eventId = searchParams.get("eventId");

  if (!targetPubkey || !eventId) {
    return NextResponse.json(
      { error: "Missing required params" },
      { status: 400 }
    );
  }

  try {
    const result = await getZapTotalsHandler({ targetPubkey, eventId });
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
