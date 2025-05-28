// components/wallet/FundWalletModal.tsx
"use client";

import { useState, useEffect } from "react";
import QRCode from "react-qr-code";
import { toast } from "react-toastify";

interface FundWalletModalProps {
  walletId: string;
  onClose: () => void;
}

const FundWalletModal = ({ walletId, onClose }: FundWalletModalProps) => {
  const [amount, setAmount] = useState(5000);
  const [invoice, setInvoice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [expiration, setExpiration] = useState<number | null>(null);

  const fetchInvoice = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/lightning/wallet/${walletId}/invoice`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ amount }),
      });

      const data = await res.json();
      if (!data.invoice) throw new Error("No invoice returned");

      setInvoice(data.invoice);
      setExpiration(Date.now() + 120000); // 2 minutes
      toast.success("Invoice generated!");
    } catch (err: any) {
      console.error("Invoice generation failed", err);
      toast.error("Failed to generate invoice");
    } finally {
      setLoading(false);
    }
  };

  // Auto-check expiration and refresh if needed
  useEffect(() => {
    const timer = setInterval(() => {
      if (expiration && Date.now() > expiration) {
        toast.info("Invoice expired. Please generate a new one.");
        setInvoice(null);
        setExpiration(null);
      }
    }, 10000);
    return () => clearInterval(timer);
  }, [expiration]);

  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-md max-w-md w-full text-center relative">
        <h3 className="text-xl font-bold mb-4">➕ Fund Wallet</h3>

        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
          className="border p-2 mb-4 w-full text-center"
          placeholder="Enter amount in sats"
          min={1}
        />

        <button
          onClick={fetchInvoice}
          disabled={loading || amount <= 0}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm font-semibold mb-4"
        >
          {loading ? "Generating..." : "Generate Invoice"}
        </button>

        {invoice && (
          <>
            <p className="text-center font-medium mb-2">Scan QR to Pay</p>
            <QRCode value={invoice} size={192} className="mx-auto mb-4" />
            <p className="text-xs text-gray-600 break-all mb-4">{invoice}</p>
            <button
              onClick={() => {
                navigator.clipboard.writeText(invoice);
                toast.success("Invoice copied to clipboard");
              }}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm mr-2"
            >
              📋 Copy Invoice
            </button>
          </>
        )}

        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded text-sm mt-4"
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default FundWalletModal;
