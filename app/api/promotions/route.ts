import { NextRequest } from "next/server";
import { getPromotionsHandler } from "./promotionsController";

export async function GET(req: NextRequest) {
  return getPromotionsHandler(req);
}
