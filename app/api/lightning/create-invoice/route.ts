import { NextRequest, NextResponse } from "next/server";
import { createInvoiceController } from "./createInvoiceController";

export async function POST(req: NextRequest) {
  return createInvoiceController(req);
}
