// app/api/promoter/[pubkey]/list/listController.ts

import { NextRequest, NextResponse } from "next/server";
import { getEventsByAuthor } from "./promotionListService";
import { nip19 } from "nostr-tools";

// Controller: Validates pubkey, passes to service, formats response
export async function listPromoterEventsController(
  req: NextRequest,
  pubkey: string
) {
  try {
    const decodedPubKey = nip19.decode(pubkey); // returns { type: 'npub', data: hex }
    // console.log("pubkey at keygenService:", decodedPubKey);
    if (!decodedPubKey.data || decodedPubKey.data.toString().length !== 64) {
      return NextResponse.json(
        { error: "Invalid or missing pubkey" },
        { status: 400 }
      );
    }

    const events = await getEventsByAuthor(decodedPubKey.data as string);

    return NextResponse.json({ events });
  } catch (err) {
    console.error("Error fetching promoter events:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
