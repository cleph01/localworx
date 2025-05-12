// app/api/business/[id]/profile/route.ts
import { getBusinessByIdHandler } from "../../businessController";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return getBusinessByIdHandler(req, params);
}
