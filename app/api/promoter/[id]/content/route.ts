// app/api/promoter/content/route.ts
import { NextRequest } from "next/server";
import {
  createContentHandler,
  getAllContentHandler,
  updateContentHandler,
  deleteContentHandler,
} from "../../contentController";

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Extract the id from the context
  const { id } = await params;
  return getAllContentHandler(req, id);
}

export async function POST(req: NextRequest) {
  return createContentHandler(req);
}

export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Extract the id from the context
  const { id } = await params;
  return updateContentHandler(req, id);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Extract the id from the context
  const { id } = await params;
  return deleteContentHandler(req, id);
}
