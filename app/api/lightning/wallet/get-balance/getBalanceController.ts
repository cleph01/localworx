import { NextRequest, NextResponse } from "next/server";
import { getBalanceService } from "./getBalanceService";

export async function getBalanceController(req: NextRequest) {
  const { pairingUri } = await req.json();
  if (!pairingUri) {
    return NextResponse.json({ error: "Missing pairingUri" }, { status: 400 });
  }

  try {
    const result = await getBalanceService(pairingUri);
    return NextResponse.json(result, { status: 200 });
  } catch (err) {
    console.error("Error fetching balance:", err);
    return NextResponse.json(
      { error: "Failed to get balance" },
      { status: 500 }
    );
  }
}
