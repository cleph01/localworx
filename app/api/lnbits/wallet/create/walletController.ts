import { NextRequest, NextResponse } from "next/server";
import { createWalletForBusinessService } from "./walletService";

export async function createWalletHandler(req: NextRequest) {
  try {
    const { businessId, userId } = await req.json();

    if (!businessId || !userId) {
      return NextResponse.json(
        { error: "Missing required fields: businessId, userId" },
        { status: 400 }
      );
    }

    const result = await createWalletForBusinessService({
      businessId: Number(businessId),
      userId,
    });

    return NextResponse.json({ success: true, businessId: result.businessId });
  } catch (error) {
    console.error("Wallet creation error:", error);
    return NextResponse.json({ error: "Failed to create wallet" }, { status: 500 });
  }
}
