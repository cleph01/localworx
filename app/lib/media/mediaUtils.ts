// lib/media/mediaUtils.ts

export const MAX_FILE_SIZE_BYTES = 2 * 1024 ** 3; // 2 GB

export function isFileTooLarge(file: File): boolean {
  return file.size > MAX_FILE_SIZE_BYTES;
}

export function calculateStorageCost(fileSizeBytes: number): number {
  const sizeInGB = fileSizeBytes / 1024 ** 3;
  if (sizeInGB <= 1) return 0.25;
  return 0.05 * sizeInGB * 4 + 0.2;
}
