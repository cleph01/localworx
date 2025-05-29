// /app/api/wallets/create-invoice/createInvoiceController.ts
import { NextRequest, NextResponse } from "next/server";
import { createInvoiceService } from "./createInvoiceService";

export async function createInvoiceController(req: NextRequest) {
  try {
    const body = await req.json();
    const { pairingUri, amount, memo, zapRequestRaw } = body;

    if (!pairingUri || !amount) {
      return NextResponse.json(
        { error: "Missing required fields: pairingUri and amount" },
        { status: 400 }
      );
    }

    const result = await createInvoiceService({
      pairingUri,
      amount,
      memo,
      zapRequestRaw,
    });

    return NextResponse.json(result, { status: 200 });
  } catch (err: any) {
    console.error("Failed to create invoice:", err);
    return NextResponse.json(
      { error: err.message || "Internal server error" },
      { status: 500 }
    );
  }
}
