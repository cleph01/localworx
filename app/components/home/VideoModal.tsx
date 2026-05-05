"use client";

import { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

type VideoModalProps = {
  open: boolean;
  onClose: () => void;
};

const VideoModal = ({ open, onClose }: VideoModalProps) => {
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm px-4"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl aspect-video rounded-2xl overflow-hidden shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 text-white/80 hover:text-white bg-black/40 rounded-full p-2"
          aria-label="Close video"
        >
          <FaTimes />
        </button>
        <iframe
          className="w-full h-full"
          src="https://www.youtube.com/embed/P2phABZ8_88?autoplay=1"
          title="LocalWorx — How it works"
          allow="autoplay; fullscreen"
          allowFullScreen
        />
      </div>
    </div>
  );
};

export default VideoModal;
