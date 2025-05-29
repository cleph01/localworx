import { NextRequest, NextResponse } from "next/server";
import { verifyNsecService } from "./authService";

export async function authenticateNostrUser(req: NextRequest) {
  try {
    const { nsec } = await req.json();
    if (!nsec) {
      return NextResponse.json({ error: "Missing nsec key" }, { status: 400 });
    }

    const user = verifyNsecService(nsec);
    return NextResponse.json({ user }, { status: 200 });
  } catch (err: any) {
    console.error("Nostr auth error:", err);
    return NextResponse.json(
      { error: "Authentication failed" },
      { status: 500 }
    );
  }
}
