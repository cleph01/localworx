import { NextRequest, NextResponse } from "next/server";
import { createSubwalletService } from "./walletService";

export async function createSubwalletHandler(req: NextRequest) {
  try {
    const { userId, businessId, context } = await req.json(); // expect one of these
    if (!userId && !businessId) {
      return NextResponse.json(
        { error: "Missing userId or businessId" },
        { status: 400 }
      );
    }

    const { wallet, error } = await createSubwalletService({
      userId,
      businessId,
      context,
    });

    if (error) {
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ wallet });
  } catch (err) {
    console.error("Subwallet handler error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
