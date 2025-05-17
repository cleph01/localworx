// app/api/promoter/[pubkey]/list/route.ts

import { NextRequest } from "next/server";
import { listPromoterEventsController } from "./promotionListController";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ pubkey: string }> }
) {
  // Extract the businessId from the context
  const { pubkey } = await params;
  return listPromoterEventsController(req, pubkey);
}
