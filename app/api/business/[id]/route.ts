import { NextRequest } from "next/server";
import {
  getBusinessByIdHandler,
  updateBusinessHandler,
  deleteBusinessHandler,
} from "../businessController";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Extract the id from the context
  const { id } = await params;
  return getBusinessByIdHandler(req, id);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Extract the businessId from the context
  const { id } = await params;
  return updateBusinessHandler(req, id);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Extract the businessId from the context
  const { id } = await params;
  return deleteBusinessHandler(req, id);
}
