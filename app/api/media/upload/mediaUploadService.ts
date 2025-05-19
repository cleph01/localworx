type CustomFile = {
  name: string;
  size: number;
};

type UploadResult = {
  message?: string;
  cdnUrl?: string;
  error?: string;
};

const MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024 * 1024; // 2GB

export async function handleMockUpload(
  file: CustomFile
): Promise<UploadResult> {
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
