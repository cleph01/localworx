"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import UploadMediaModal from "../../components/promotions/UploadMediaModal";

export default function CreatePromotionPage() {
  // Form field states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [mediaUrl, setMediaUrl] = useState("");
  const [tags, setTags] = useState("");

  // Nostr keypair (loaded from localStorage)
  const [pubkey, setPubkey] = useState("");
  const [sk, setSk] = useState("");

  // UI states
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);

  // Intanstiate Route to Rediretct if no pubKey or secKey
  const router = useRouter();

  // Load user's Nostr keys from localStorage on first render
  useEffect(() => {
    const storedPubkey = localStorage.getItem("nostr-pubkey");
    const storedSk = localStorage.getItem("nostr-sk");

    if (!storedPubkey || !storedSk) {
      router.replace("/nostr/keys/create");
    }

    if (storedPubkey) setPubkey(storedPubkey);
    if (storedSk) setSk(storedSk);
  }, []);

  // Form submit handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setResponse(null);

    // Construct the "content" field of the Nostr event from form inputs
    const content = `
      **${title}**
      ${description}
      ${mediaUrl ? `Media: ${mediaUrl}` : ""}
    `.trim();

    // Convert comma-separated tag input into Nostr tag format: [["t", "value"]]
    const tagArray = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0)
      .map((tag) => ["t", tag]);

    // Construct request body to send to /api/nostr/promotions
    const body = {
      content,
      pubkey,
      sk,
      tags: tagArray,
    };

    try {
      const res = await fetch("/api/nostr/promotions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (res.ok) {
        setResponse(`✅ Success! Published to ${data.relayCount} relays.`);
      } else {
        setResponse(`❌ Error: ${data.error}`);
      }
    } catch (err) {
      setResponse("❌ Network error or invalid response.");
    } finally {
      setLoading(false);
    }
  };

  // Determine appropriate media preview component (image or embed)
  const renderMediaPreview = () => {
    if (!mediaUrl) return null;

    // Match common YouTube and Vimeo patterns
    const youTubeMatch = mediaUrl.match(
      /(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
    );
    const vimeoMatch = mediaUrl.match(/vimeo\.com\/(\d+)/);

    if (youTubeMatch) {
      const id = youTubeMatch[1];
      return (
        <iframe
          className="w-full h-64 mt-2"
          src={`https://www.youtube.com/embed/${id}`}
          title="YouTube Preview"
          allowFullScreen
        />
      );
    }

    if (vimeoMatch) {
      const id = vimeoMatch[1];
      return (
        <iframe
          className="w-full h-64 mt-2"
          src={`https://player.vimeo.com/video/${id}`}
          title="Vimeo Preview"
          allowFullScreen
        />
      );
    }

    // Basic image preview fallback
    if (mediaUrl.match(/\.(jpeg|jpg|gif|png|webp)$/)) {
      return (
        <img
          src={mediaUrl}
          alt="Image Preview"
          className="w-full max-h-64 object-cover mt-2"
        />
      );
    }

    return (
      <p className="text-sm text-gray-500 mt-2">Unrecognized media format.</p>
    );
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Create a Promotion</h1>

      {/* Promotion submission form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title input */}
        <input
          type="text"
          placeholder="Title"
          className="w-full border px-4 py-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        {/* Description textarea */}
        <textarea
          placeholder="Description"
          className="w-full border px-4 py-2"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          required
        />

        {/* Media input and upload modal trigger */}
        <div className="flex gap-2 items-center">
          <input
            type="url"
            placeholder="Media URL (or use upload)"
            className="w-full border px-4 py-2"
            value={mediaUrl}
            onChange={(e) => setMediaUrl(e.target.value)}
          />
          <button
            type="button"
            className="bg-gray-200 px-3 py-2 rounded text-sm"
            onClick={() => setShowUploadModal(true)}
          >
            Upload
          </button>
        </div>

        {/* Media preview (image or embed) */}
        {renderMediaPreview()}

        {/* Tags input */}
        <input
          type="text"
          placeholder="Tags (comma separated)"
          className="w-full border px-4 py-2"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />

        {/* Nostr keys – pulled from localStorage */}
        <input
          type="text"
          placeholder="Public Key (hex)"
          className="w-full border px-4 py-2"
          value={pubkey}
          onChange={(e) => setPubkey(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Secret Key (hex)"
          className="w-full border px-4 py-2"
          value={sk}
          onChange={(e) => setSk(e.target.value)}
          required
        />

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {loading ? "Publishing..." : "Publish Promotion"}
        </button>
      </form>

      {/* Server response or error message */}
      {response && <p className="mt-4 text-center">{response}</p>}

      {/* Upload modal (conditionally rendered) */}
      {showUploadModal && (
        <UploadMediaModal
          onClose={() => setShowUploadModal(false)}
          onUploadSuccess={(cdnUrl) => setMediaUrl(cdnUrl)} // Auto-fill mediaUrl when upload succeeds
        />
      )}
    </div>
  );
}
