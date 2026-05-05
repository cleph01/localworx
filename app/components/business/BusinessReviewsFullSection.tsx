"use client";

import { useState } from "react";
import useSWR from "swr";
import { FaStar } from "react-icons/fa";
import { useNostrUser } from "@/app/context/NostrUserContext";
import { calculateAverageRating } from "@/app/utilities/calculateAverageRating";
import StarRating from "@/app/components/ui/StarRating";

const fetcher = (url: string) =>
  fetch(url, { credentials: "same-origin" }).then((res) => {
    if (!res.ok) throw new Error("Failed to fetch reviews");
    return res.json();
  });

function StarPicker({
  value,
  onChange,
}: {
  value: number;
  onChange: (v: number) => void;
}) {
  const [hovered, setHovered] = useState(0);
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange(i)}
          onMouseEnter={() => setHovered(i)}
          onMouseLeave={() => setHovered(0)}
          className="text-2xl transition-colors"
        >
          <FaStar
            className={
              i <= (hovered || value) ? "text-yellow-400" : "text-gray-300"
            }
          />
        </button>
      ))}
    </div>
  );
}

export default function BusinessReviewsFullSection({
  businessId,
}: {
  businessId: string;
}) {
  const { user } = useNostrUser();
  const [rating, setRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const { data: reviews, isLoading, mutate } = useSWR(
    `/api/business/reviews/${businessId}`,
    fetcher
  );

  const { rating: avgRating, reviewCount } = calculateAverageRating(reviews ?? []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || rating === 0) return;
    setSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch(`/api/business/reviews/${businessId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reviewerId: user.id, rating, review: reviewText }),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error ?? "Failed to submit review");
      }
      setRating(0);
      setReviewText("");
      mutate();
    } catch (err: any) {
      setSubmitError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="reviews" className="w-full max-w-4xl px-6 py-8">
      <h2 className="text-2xl font-bold mb-4">Reviews</h2>

      {/* Aggregate rating */}
      {!isLoading && (
        <div className="mb-6">
          <StarRating rating={avgRating} reviewCount={reviewCount} />
        </div>
      )}

      {/* Review form */}
      {user ? (
        <form
          onSubmit={handleSubmit}
          className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8 flex flex-col gap-3"
        >
          <h3 className="font-semibold text-gray-800">Leave a review</h3>
          <StarPicker value={rating} onChange={setRating} />
          <textarea
            value={reviewText}
            onChange={(e) => setReviewText(e.target.value)}
            placeholder="Share your experience (optional)"
            rows={3}
            className="w-full border border-gray-300 rounded-lg p-3 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          {submitError && (
            <p className="text-sm text-red-600">{submitError}</p>
          )}
          <button
            type="submit"
            disabled={submitting || rating === 0}
            className="self-start bg-brand-orange hover:bg-orange-500 disabled:opacity-50 text-white text-sm font-semibold px-5 py-2 rounded-xl transition-colors"
          >
            {submitting ? "Submitting…" : "Submit Review"}
          </button>
        </form>
      ) : (
        <div className="bg-gray-50 border border-gray-200 rounded-xl p-5 mb-8 text-sm text-gray-500">
          <a href="/auth" className="text-blue-600 underline font-medium">
            Sign in
          </a>{" "}
          to leave a review.
        </div>
      )}

      {/* Review list */}
      {isLoading && (
        <div className="flex flex-col gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-gray-100 rounded-xl animate-pulse" />
          ))}
        </div>
      )}

      {!isLoading && reviews?.length === 0 && (
        <p className="text-gray-400 text-sm">
          No reviews yet. Be the first to share your experience!
        </p>
      )}

      {!isLoading && reviews?.length > 0 && (
        <div className="flex flex-col gap-4">
          {[...reviews].reverse().map((r: any) => (
            <div
              key={r.id}
              className="border border-gray-100 rounded-xl p-4 bg-white shadow-sm"
            >
              <div className="flex items-center gap-2 mb-1">
                {[1, 2, 3, 4, 5].map((i) => (
                  <FaStar
                    key={i}
                    className={
                      i <= r.rating ? "text-yellow-400 text-sm" : "text-gray-200 text-sm"
                    }
                  />
                ))}
                <span className="text-xs text-gray-400 ml-1">
                  {new Date(r.created_at).toLocaleDateString()}
                </span>
              </div>
              {r.review && (
                <p className="text-sm text-gray-700">&ldquo;{r.review}&rdquo;</p>
              )}
            </div>
          ))}
        </div>
      )}
    </section>
  );
}
