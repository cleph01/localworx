"use client";

import { useEffect, useState } from "react";
import { generateZapRequestEvent } from "./zapHelpers";
import QRCode from "react-qr-code";
import { nip57 } from "nostr-tools";
import { toast } from "react-toastify";

interface ZapButtonProps {
  lud16: string;
  targetPubkey: string;
  eventId: string;
  amount: number; // in millisats
}

const ZapButton = ({
  lud16,
  targetPubkey,
  eventId,
  amount,
}: ZapButtonProps) => {
  const [invoice, setInvoice] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // State for callback URL and zap confirmation
  const [callbackUrl, setCallbackUrl] = useState<string | null>(null);
  const [zapConfirmed, setZapConfirmed] = useState(false);

  const handleZap = async () => {
    setError(null);
    setLoading(true);
    try {
      // 1. Generate + sign ZapRequest
      const senderPubkey = window.nostr?.getPublicKey
        ? await window.nostr.getPublicKey()
        : (() => {
            throw new Error("Nostr extension not detected");
          })();

      const zapEvent = await generateZapRequestEvent({
        senderPubkey,
        targetPubkey,
        eventId,
        amount,
      });

      // 2. Call your backend to get invoice
      const res = await fetch("/api/zap/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount,
          lud16,
          targetPubkey,
          senderPubkey,
          eventId,
          zapRequest: JSON.stringify(zapEvent),
        }),
      });

      const data = await res.json();
      if (!data.invoice) throw new Error("Invoice not returned");

      // Set callback URL for polling
      setCallbackUrl(data.callback); // <-- store callback URL for polling

      // Set invoice and open modal
      setInvoice(data.invoice);
      setModalOpen(true);

      // 3. Optional WebLN fallback
      if (window.webln) {
        await window.webln.enable();
        await window.webln.sendPayment(data.invoice);
      }
    } catch (err: any) {
      console.error("Zap failed", err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // Poll for zap confirmation
  useEffect(() => {
    if (!callbackUrl || !invoice || zapConfirmed) return;

    let intervalId: NodeJS.Timeout;
    let attempts = 0;

    const pollInvoiceStatus = async () => {
      try {
        const res = await fetch(callbackUrl);
        const json = await res.json();

        if (json?.paid) {
          setZapConfirmed(true);
          // set toast notification
          toast.success("⚡ Zap sent successfully!");
          setTimeout(() => {
            setModalOpen(false);
            setInvoice(null);
            setCallbackUrl(null);
            setZapConfirmed(false);
          }, 1200);
        }
      } catch (err) {
        console.warn("Polling error", err);
      }

      attempts += 1;
      if (attempts >= 20) {
        clearInterval(intervalId);
      }
    };

    intervalId = setInterval(pollInvoiceStatus, 3000);

    return () => clearInterval(intervalId);
  }, [callbackUrl, invoice, zapConfirmed]);

  return (
    <>
      <button
        onClick={handleZap}
        className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? "Zapping..." : "⚡ Zap"}
      </button>

      {/* Modal */}
      {modalOpen && invoice && (
        <div className="fixed inset-0 z-50 bg-black/60 flex items-center justify-center">
          <div className="bg-white p-6 rounded shadow-md max-w-md w-full text-center relative">
            <h3 className="text-xl font-bold mb-4">⚡ Pay Invoice</h3>
            <QRCode value={invoice} size={192} className="mx-auto mb-4" />
            <p className="text-xs text-gray-600 break-all mb-4">{invoice}</p>
            <button
              onClick={() => navigator.clipboard.writeText(invoice)}
              className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm mr-2"
            >
              📋 Copy Invoice
            </button>
            <button
              onClick={() => setModalOpen(false)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
              disabled={zapConfirmed}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
    </>
  );
};

export default ZapButton;
