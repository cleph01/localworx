// app/api/promoter/content/route.ts
import { NextRequest } from "next/server";
import {
  createContentHandler,
  getAllContentHandler,
  updateContentHandler,
  deleteContentHandler,
} from "./contentController";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  return getAllContentHandler(req, context);
}

export async function POST(req: NextRequest) {
  return createContentHandler(req);
}

export async function PUT(
  req: NextRequest,
  context: { params: { id: string; userId: string } }
) {
  return updateContentHandler(req, context);
}

export async function DELETE(
  req: NextRequest,
  context: { params: { id: string; userId: string } }
) {
  return deleteContentHandler(req, context);
}
