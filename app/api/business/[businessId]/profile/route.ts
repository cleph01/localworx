// app/api/business/[id]/profile/route.ts
import { getBusinessByIdHandler } from "../../businessController";
import { NextRequest } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: { businessId: string } }
) {
  // Extract the businessId from the context
  const { businessId } = context.params;
  // Call the handler function with the request and businessId
  return getBusinessByIdHandler(req, businessId);
}
