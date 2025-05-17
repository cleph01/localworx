import type { File } from "formdata-node";
import { MAX_FILE_SIZE_BYTES } from "../../../lib/media/mediaUtils";
import type { UploadResult } from "./mediaUploadTypes";

// Service: handles file size logic and generates mock URL
export async function handleMockUpload(file: File): Promise<UploadResult> {
  if (file.size > MAX_FILE_SIZE_BYTES) {
    return {
      error: "File too large. Max size is 2GB.",
    };
  }

  const cdnUrl = `https://satellite.earth/cdn/mock/${encodeURIComponent(
    file.name
  )}`;
  return {
    message: "Mock upload successful.",
    cdnUrl,
  };
}
