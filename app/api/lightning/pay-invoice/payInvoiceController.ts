import { NextRequest, NextResponse } from "next/server";
import { payInvoiceService } from "./payInvoiceService";

export async function payInvoiceController(req: NextRequest) {
  try {
    const { businessId, bolt11 } = await req.json();

    if (!businessId || !bolt11) {
      return NextResponse.json(
        { error: "Missing required fields: businessId, bolt11" },
        { status: 400 }
      );
    }

    const result = await payInvoiceService({ businessId, bolt11 });
    return NextResponse.json({ success: true, result });
  } catch (err: any) {
    console.error("Payment failed:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
