// app/api/wallet/[id]/invoice/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createInvoiceController } from "./createInvoiceController";

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  return createInvoiceController(req);
}
