import { NextRequest } from "next/server";
import { getNearbyBusinessesHandler } from "./nearbyController";

export async function GET(req: NextRequest) {
  return getNearbyBusinessesHandler(req);
}
