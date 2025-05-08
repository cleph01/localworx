import { NextRequest } from "next/server";
import { getBusinessesHandler } from "../../business/businessController";

export async function GET(req: NextRequest) {
  return getBusinessesHandler(req);
}
