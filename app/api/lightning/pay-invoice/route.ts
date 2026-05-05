import { NextRequest, NextResponse } from "next/server";
import { payInvoiceController } from "./payInvoiceController";

export async function POST(req: NextRequest) {
  return payInvoiceController(req);
}
