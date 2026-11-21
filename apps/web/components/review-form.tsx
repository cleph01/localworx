"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/browser";

export function ReviewForm({ businessId }: { businessId: string }) {
  const [rating, setRating] = useState(5);
  const [msg, setMsg] = useState<string | null>(null);
  const router = useRouter();
  return (
    <form className="card mt-4 space-y-3 p-4" onSubmit={async (e) => {
      e.preventDefault();
      const body = String(new FormData(e.currentTarget).get("body") ?? "");
      const supabase = createClient();
      const { data: u } = await supabase.auth.getUser();
      const { error } = await supabase.from("business_reviews").upsert(
        { business_id: businessId, reviewer_id: u.user!.id, rating, body },
        { onConflict: "business_id,reviewer_id" }
      );
      setMsg(error ? "Couldn't save your review." : "Thanks! Your review is up.");
      if (!error) router.refresh();
    }}>
      <div className="flex gap-1" role="radiogroup" aria-label="Rating">
        {[1, 2, 3, 4, 5].map((n) => (
          <button type="button" key={n} aria-label={`${n} stars`} onClick={() => setRating(n)}
            className={`text-2xl ${n <= rating ? "text-orange" : "text-line"}`}>★</button>
        ))}
      </div>
      <textarea name="body" maxLength={2000} rows={3} className="field" placeholder="What should neighbors know?" />
      <button className="btn-dark">Post review</button>
      {msg && <p className="text-sm text-muted">{msg}</p>}
    </form>
  );
}
