// components/business/PairingNoticeModal.tsx

"use client";

import { useEffect, useState } from "react";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";

type Props = {
  pairingUri: string;
  onClose: () => void;
};

export default function PairingNoticeModal({ pairingUri, onClose }: Props) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(pairingUri);
    setCopied(true);
    toast.success("📋 Copied pairing URI to clipboard!");
  };

  useEffect(() => {
    if (copied) {
      const timeout = setTimeout(() => setCopied(false), 2000);
      return () => clearTimeout(timeout);
    }
  }, [copied]);

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-xl p-6 max-w-lg w-full">
        <h2 className="text-xl font-bold mb-3">⚠️ Wallet Pairing URI</h2>
        <p className="text-gray-600 text-sm mb-4">
          This URI provides full access to your Lightning wallet. It will be{" "}
          <strong>encrypted</strong> and cannot be retrieved again.
        </p>
        <div className="flex justify-center mb-4">
          <QRCode value={pairingUri} size={180} />
        </div>
        <div className="bg-gray-100 p-3 text-sm rounded break-words mb-4">
          <strong>pairingUri:</strong>
          <br />
          {pairingUri}
        </div>
        <div className="flex justify-between">
          <button
            onClick={handleCopy}
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
          >
            {copied ? "✅ Copied!" : "📋 Copy URI"}
          </button>
          <button
            onClick={onClose}
            className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded text-sm"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
