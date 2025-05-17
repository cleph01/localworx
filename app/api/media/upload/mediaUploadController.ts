import { NextRequest, NextResponse } from "next/server";
import { handleMockUpload } from "./mediaUploadService";

// Controller: handles validation and sends response
export async function uploadController(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file");

    if (!file || !(file instanceof File)) {
      return NextResponse.json(
        { error: "Missing or invalid file upload" },
        { status: 400 }
      );
    }

    const result = await handleMockUpload(file);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Upload controller error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
