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
  context: { params: { businessId: string } }
) {
  // Extract the businessId from the context
  const { businessId } = context.params;
  return updateBusinessHandler(req, businessId);
}

export async function DELETE(
  req: NextRequest,
  context: { params: { businessId: string } }
) {
  // Extract the businessId from the context
  const { businessId } = context.params;
  return deleteBusinessHandler(req, businessId);
}
