import { NextRequest } from "next/server";
import { getBusinessesHandler } from "../businessesController";

export async function GET(req: NextRequest) {
  return getBusinessesHandler(req);
}
