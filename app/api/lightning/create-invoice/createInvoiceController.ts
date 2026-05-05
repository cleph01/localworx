import { NextRequest, NextResponse } from "next/server";
import { createInvoiceService } from "./createInvoiceService";

export async function createInvoiceController(req: NextRequest) {
  try {
    const { businessId, amount, memo } = await req.json();

    if (!businessId || !amount) {
      return NextResponse.json(
        { error: "Missing required fields: businessId, amount" },
        { status: 400 }
      );
    }

    const invoice = await createInvoiceService({ businessId, amount, memo });
    return NextResponse.json({ success: true, invoice });
  } catch (err: any) {
    console.error("Invoice creation failed:", err);
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
