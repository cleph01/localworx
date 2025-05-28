// /app/api/nostr/profile/[pubkey]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { getProfileController } from "./profileController";

export async function GET(
  req: NextRequest,
  { params }: { params: { pubkey: string } }
) {
  const pubkey = params.pubkey;
  if (!pubkey) {
    return NextResponse.json({ error: "Missing pubkey" }, { status: 400 });
  }

  try {
    const profile = await getProfileController(pubkey);
    return NextResponse.json(profile);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

/**
 * Example Response
 * {
  "pubkey": "npub1...",
  "name": "Alice",
  "displayName": "Alice in Zapland",
  "picture": "https://example.com/avatar.jpg",
  "about": "Bitcoin & Lightning maxi"
}

 */
