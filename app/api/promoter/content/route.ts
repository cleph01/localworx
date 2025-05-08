// app/api/promoter/content/route.ts
import { NextRequest } from "next/server";
import {
  createContentHandler,
  getAllContentHandler,
  updateContentHandler,
  deleteContentHandler,
} from "./contentController";

export async function GET(req: NextRequest) {
  return getAllContentHandler(req);
}

export async function POST(req: NextRequest) {
  return createContentHandler(req);
}

export async function PUT(req: NextRequest) {
  return updateContentHandler(req);
}

export async function DELETE(req: NextRequest) {
  return deleteContentHandler(req);
}
