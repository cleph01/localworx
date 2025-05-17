"use client";

import { useState } from "react";

interface NostrKeypair {
  pubkey: string;
  privkey: string;
}

export default function CreateKeysPage() {
  const [keypair, setKeypair] = useState<NostrKeypair | null>(null);
  const [loading, setLoading] = useState(false);

  const generateKeys = async () => {
    setLoading(true);
    setKeypair(null);

    try {
      const res = await fetch("/api/nostr/keys");
      const data = await res.json();

      if (res.ok) {
        setKeypair(data);

        // Save to localStorage
        localStorage.setItem("nostr-pubkey", data.pubkey);
        localStorage.setItem("nostr-sk", data.privkey);
      } else {
        alert("Error generating keys: " + data.error);
      }
    } catch (err) {
      alert("Unexpected error while generating keys.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Generate Nostr Keys</h1>

      <button
        onClick={generateKeys}
        disabled={loading}
        className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
      >
        {loading ? "Generating..." : "Generate Keypair"}
      </button>

      {/* Warnings about security */}
      <div className="bg-yellow-100 border border-yellow-400 text-yellow-800 p-4 mt-6 rounded">
        <p className="font-semibold">⚠️ Important:</p>
        <ul className="list-disc ml-6 mt-2 space-y-1 text-sm">
          <li>
            <strong>Keep your secret key private.</strong> Anyone with it can
            impersonate you.
          </li>
          <li>
            This app currently stores your secret key in{" "}
            <code>localStorage</code> for convenience.
          </li>
          <li>
            This is <strong>not secure</strong> and will be changed once users
            adopt better key handling tools.
          </li>
          <li>Always make a safe backup of your keys.</li>
        </ul>
      </div>

      {/* Key display section */}
      {keypair && (
        <div className="mt-8 space-y-4 text-sm bg-gray-50 p-4 rounded border">
          <div>
            <p className="font-semibold">🔓 Public Key (hex):</p>
            <p className="break-all">{keypair.pubkey}</p>
          </div>
          <div>
            <p className="font-semibold">🔑 Secret Key (hex):</p>
            <p className="break-all text-red-600">{keypair.privkey}</p>
          </div>
        </div>
      )}
    </div>
  );
}
