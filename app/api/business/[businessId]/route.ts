import { NextRequest } from "next/server";
import {
  getBusinessByIdHandler,
  updateBusinessHandler,
  deleteBusinessHandler,
} from "../businessController";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ businessId: string }> }
) {
  // Extract the businessId from the context
  const { businessId } = await params;
  return getBusinessByIdHandler(req, businessId);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ businessId: string }> }
) {
  // Extract the businessId from the context
  const { businessId } = await params;
  return updateBusinessHandler(req, businessId);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ businessId: string }> }
) {
  // Extract the businessId from the context
  const { businessId } = await params;
  return deleteBusinessHandler(req, businessId);
}
