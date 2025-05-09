import { NextRequest } from "next/server";
import {
  getBusinessByIdHandler,
  updateBusinessHandler,
  deleteBusinessHandler,
} from "../businessController";

export async function GET(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  return getBusinessByIdHandler(req, params);
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
