"use client";

import { useState, useEffect, useCallback } from "react";
import QRCode from "react-qr-code";
import { FaTimes, FaBolt, FaCopy, FaCheck } from "react-icons/fa";
import { toast } from "react-toastify";

interface FundWalletModalProps {
  businessId: number;
  onClose: () => void;
}

const QUICK_AMOUNTS = [1000, 5000, 10000, 50000];
const INVOICE_TTL_MS = 120_000; // 2 minutes

const FundWalletModal = ({ businessId, onClose }: FundWalletModalProps) => {
  const [amount, setAmount] = useState(5000);
  const [invoice, setInvoice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  // Countdown tick
  useEffect(() => {
    if (secondsLeft === null) return;
    if (secondsLeft <= 0) {
      setInvoice(null);
      setSecondsLeft(null);
      toast.info("Invoice expired — generate a new one.");
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => (s ?? 1) - 1), 1000);
    return () => clearTimeout(t);
  }, [secondsLeft]);

  const fetchInvoice = useCallback(async () => {
    setLoading(true);
    setInvoice(null);
    setSecondsLeft(null);
    try {
      const res = await fetch("/api/lightning/create-invoice", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ businessId, amount }),
      });
      const data = await res.json();
      if (!data.success || !data.invoice?.payment_request) {
        throw new Error("No invoice returned");
      }
      setInvoice(data.invoice.payment_request);
      setSecondsLeft(Math.floor(INVOICE_TTL_MS / 1000));
    } catch (err: any) {
      toast.error("Failed to generate invoice");
    } finally {
      setLoading(false);
    }
  }, [businessId, amount]);

  const handleCopy = () => {
    if (!invoice) return;
    navigator.clipboard.writeText(invoice);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const expiryColor =
    secondsLeft !== null && secondsLeft < 30
      ? "text-red-500"
      : "text-green-600";

  return (
    <div
      className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4"
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-sm overflow-hidden">
        {/* Header */}
        <div
          className="px-6 py-5 flex items-center justify-between"
          style={{ background: "linear-gradient(135deg, #091f36 0%, #0f3660 100%)" }}
        >
          <div className="flex items-center gap-2 text-white">
            <FaBolt className="text-brand-orange text-lg" />
            <h3 className="text-lg font-bold">Fund Wallet</h3>
          </div>
          <button
            onClick={onClose}
            className="text-white/60 hover:text-white transition-colors"
            aria-label="Close"
          >
            <FaTimes className="text-lg" />
          </button>
        </div>

        <div className="p-6 flex flex-col gap-5">
          {!invoice ? (
            <>
              {/* Amount quick-select */}
              <div>
                <label className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2 block">
                  Amount (sats)
                </label>
                <div className="grid grid-cols-4 gap-2 mb-3">
                  {QUICK_AMOUNTS.map((q) => (
                    <button
                      key={q}
                      type="button"
                      onClick={() => setAmount(q)}
                      className={`py-1.5 rounded-lg text-xs font-semibold border transition-colors ${
                        amount === q
                          ? "bg-brand-orange text-white border-brand-orange"
                          : "bg-gray-50 text-gray-600 border-gray-200 hover:border-brand-orange hover:text-brand-orange"
                      }`}
                    >
                      {q.toLocaleString()}
                    </button>
                  ))}
                </div>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(parseInt(e.target.value) || 0)}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-center text-lg font-bold focus:outline-none focus:ring-2 focus:ring-brand-orange"
                  placeholder="Custom amount"
                  min={1}
                />
              </div>

              <button
                onClick={fetchInvoice}
                disabled={loading || amount <= 0}
                className="w-full bg-brand-orange hover:bg-orange-500 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <FaBolt />
                {loading ? "Generating…" : "Generate Invoice"}
              </button>
            </>
          ) : (
            <>
              {/* Expiry countdown */}
              {secondsLeft !== null && (
                <div className="text-center">
                  <span className="text-xs text-gray-400">Expires in </span>
                  <span className={`text-sm font-bold ${expiryColor}`}>
                    {Math.floor(secondsLeft / 60)}:
                    {String(secondsLeft % 60).padStart(2, "0")}
                  </span>
                </div>
              )}

              {/* QR code */}
              <div className="flex flex-col items-center gap-3">
                <p className="text-xs text-gray-500 text-center">
                  Scan with any Lightning wallet to pay{" "}
                  <span className="font-semibold text-gray-700">
                    {amount.toLocaleString()} sats
                  </span>
                </p>
                <div className="p-3 bg-white border-2 border-gray-100 rounded-xl">
                  <QRCode value={invoice} size={180} />
                </div>
              </div>

              {/* Copy invoice */}
              <button
                onClick={handleCopy}
                className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border font-semibold text-sm transition-all ${
                  copied
                    ? "bg-green-50 border-green-400 text-green-700"
                    : "bg-gray-50 border-gray-200 text-gray-700 hover:border-brand-orange hover:text-brand-orange"
                }`}
              >
                {copied ? <FaCheck /> : <FaCopy />}
                {copied ? "Copied!" : "Copy Invoice"}
              </button>

              {/* New invoice */}
              <button
                onClick={() => { setInvoice(null); setSecondsLeft(null); }}
                className="text-xs text-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                Generate a different amount
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FundWalletModal;
