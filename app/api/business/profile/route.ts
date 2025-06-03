// app/api/business/[businessId]/profile/route.ts
import { getBusinessByIdHandler } from "../businessController";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ businessId: string }> }
) {
  // Extract the businessId from the context
  const { businessId } = await params;
  // Call the handler function with the request and businessId
  return getBusinessByIdHandler(req, businessId);
}
