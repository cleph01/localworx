"use client";

import React, { useRef, useState } from "react";
import {
  calculateStorageCost,
  isFileTooLarge,
  MAX_FILE_SIZE_BYTES,
} from "../../lib/media/mediaUtils";

interface UploadMediaModalProps {
  // Called when user closes the modal manually
  onClose: () => void;
  // Called when the mock upload completes successfully
  onUploadSuccess: (cdnUrl: string) => void;
}

export default function UploadMediaModal({
  onClose,
  onUploadSuccess,
}: UploadMediaModalProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Local state to track selected file and upload state
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);

  // Called when user selects a file
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    // Reject if too large
    if (isFileTooLarge(selected)) {
      setError(
        `File too large. Max allowed is ${MAX_FILE_SIZE_BYTES / 1024 ** 2} MB.`
      );
      setFile(null);
      return;
    }

    setError(null);
    setFile(selected);
  };

  // Simulates uploading file to Satellite CDN (mock for now)
  const handleUpload = async () => {
    if (!file) return;

    setUploading(true);

    // Simulate network delay and response
    setTimeout(() => {
      const mockUrl = `https://satellite.earth/cdn/mock/${encodeURIComponent(
        file.name
      )}`;
      onUploadSuccess(mockUrl); // Pass URL back to parent component
      setUploading(false);
      onClose(); // Close the modal
    }, 1500);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-md relative">
        {/* Modal close (X) button */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-black"
        >
          ×
        </button>

        <h2 className="text-xl font-bold mb-4">Upload Media</h2>

        {/* File picker (accepts images and videos) */}
        <input
          type="file"
          accept="image/*,video/*"
          ref={fileInputRef}
          onChange={handleFileChange}
        />

        {/* If file is selected and valid, show details */}
        {file && (
          <div className="mt-4">
            <p className="text-sm text-gray-700">File: {file.name}</p>
            <p className="text-sm text-gray-700">
              Size: {(file.size / 1024 / 1024).toFixed(2)} MB
            </p>
            <p className="text-sm text-green-600 font-medium">
              Estimated Cost: ${calculateStorageCost(file.size).toFixed(2)}
            </p>
          </div>
        )}

        {/* Show error if validation fails */}
        {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}

        {/* Upload button (disabled until a valid file is selected) */}
        <div className="mt-6 flex justify-end">
          <button
            onClick={handleUpload}
            disabled={!file || !!error || uploading}
            className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>
        </div>
      </div>
    </div>
  );
}
