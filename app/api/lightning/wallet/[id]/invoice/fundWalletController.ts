// app/api/wallet/[id]/invoice/fundWalletController.ts
import { NextResponse } from "next/server";
import { createInvoiceForSubwallet } from "./fundWalletService";

export async function handleFundWalletRequest(req: Request, id: string) {
  const walletId = id;
  const body = await req.json();
  const amount = body.amount;

  if (!amount || amount <= 0) {
    return new Response(JSON.stringify({ error: "Invalid amount" }), {
      status: 400,
    });
  }

  try {
    const invoice = await createInvoiceForSubwallet(walletId, amount);
    console.log("invoice @ fundWalletController: ", invoice);
    return new Response(JSON.stringify({ invoice }));
  } catch (error: any) {
    console.error("Invoice generation failed", error);
    return new Response(
      JSON.stringify({ error: error.message || "Invoice error" }),
      { status: 500 }
    );
  }
}
