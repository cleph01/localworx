import { NextRequest, NextResponse } from "next/server";
import { checkBalanceService } from "./checkBalanceService";

export async function checkBalanceController(req: NextRequest) {
  const { businessId } = await req.json();

  if (!businessId) {
    return NextResponse.json({ error: "Missing businessId" }, { status: 400 });
  }

  try {
    const balance = await checkBalanceService(businessId);
    return NextResponse.json({ success: true, balance });
  } catch (err: any) {
    console.error("Balance check failed:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
