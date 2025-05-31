import { NextRequest, NextResponse } from "next/server";
import { publishProfileService } from "./publishProfileService";
import { hexToBytes } from "@noble/hashes/utils";

export async function publishProfileHandler(req: NextRequest) {
  try {
    const { pubkey, privkey, profile } = await req.json();

    // 🔒 Ensure privkey is always a string before decoding
    const privkeyBytes = hexToBytes(
      typeof privkey === "string"
        ? privkey
        : Buffer.from(privkey).toString("hex")
    );

    // privkey as hex string
    const privkeyHex =
      typeof privkey === "string"
        ? privkey
        : Buffer.from(privkey).toString("hex");

    // Publish to Nostr
    const count = await publishProfileService({
      pubkey,
      privkey: privkeyHex,
      profile,
    });

    return NextResponse.json({ success: true, relaysAcknowledged: count });
  } catch (err) {
    console.error("Error publishing profile:", err);
    return NextResponse.json(
      { error: "Failed to publish profile" },
      { status: 500 }
    );
  }
}
