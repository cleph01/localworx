import { NextRequest } from "next/server";
import {
  getBusinessByIdHandler,
  updateBusinessHandler,
  deleteBusinessHandler,
} from "../businessController";

export async function GET(
  req: NextRequest,
  context: { params: { businessId: string } }
) {
  // Extract the businessId from the context
  const { businessId } = context.params;
  return getBusinessByIdHandler(req, businessId);
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string } }
) {
  return updateBusinessHandler(req, context);
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string } }
) {
  return deleteBusinessHandler(req, context);
}
