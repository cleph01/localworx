// api/business/create/route.ts

import { NextRequest } from "next/server";
import { addBusinessHandler } from "../businessController";

export async function POST(req: NextRequest) {
  return addBusinessHandler(req);
}
