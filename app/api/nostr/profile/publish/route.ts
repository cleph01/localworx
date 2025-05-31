import { NextRequest } from "next/server";
import { publishProfileHandler } from "./publishProfileController";

export async function POST(req: NextRequest) {
  return publishProfileHandler(req);
}
