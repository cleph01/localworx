import { uploadController } from "./mediaUploadController";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
  return uploadController(req);
}
