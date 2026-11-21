"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { QRCodeSVG } from "qrcode.react";
import { createClient } from "@/lib/supabase/browser";
import { withTown } from "@localworx/shared";

type Props = {
  reward: { id: string; status: string; name: string; business: { name: string; slug: string; city?: string } };
  listing: { id: string; price_sats: number } | null;
};

export function RewardCard({ reward, listing }: Props) {
  const [show, setShow] = useState(false);
  const [selling, setSelling] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClient();

  return (
    <div className="card flex flex-col p-5">
      <p className="text-sm text-muted">{withTown(reward.business.name, reward.business.city)}</p>
      <p className="h-display mt-1 text-xl">{reward.name}</p>
      {listing ? (
        <p className="mt-2 text-sm font-semibold text-orange-dark">For sale · {listing.price_sats.toLocaleString()} sats</p>
      ) : (
        <p className="mt-2 text-sm text-good">Ready to use</p>
      )}

      {show && (
        <div className="mt-4 grid place-items-center rounded-xl bg-white p-4 ring-1 ring-line">
          <QRCodeSVG value={`localworx:reward:${reward.id}`} size={180} />
          <p className="mt-2 text-center text-xs text-muted">Staff scan this to mark it used. It works once.</p>
        </div>
      )}

      {selling && (
        <form className="mt-4 space-y-2" onSubmit={async (e) => {
          e.preventDefault();
          const price = Number(new FormData(e.currentTarget).get("price"));
          const { error } = await supabase.rpc("list_reward", { p_reward: reward.id, p_price: price });
          if (error) setError(error.message); else { setSelling(false); router.refresh(); }
        }}>
          <label className="label" htmlFor={`p-${reward.id}`}>Price in sats</label>
          <input id={`p-${reward.id}`} name="price" type="number" min={1} max={10000000} required className="field" placeholder="2500" />
          <p className="text-xs text-muted">Buyers pay your Lightning address directly. Set one in Profile & wallet.</p>
          <button className="btn-dark w-full">List for sale</button>
        </form>
      )}
      {error && <p className="mt-2 text-sm text-bad">{error}</p>}

      <div className="mt-auto flex gap-2 pt-5">
        {listing ? (
          <button className="btn-ghost flex-1 !py-2 text-sm" onClick={async () => {
            const { error } = await supabase.rpc("cancel_listing", { p_listing: listing.id });
            if (error) setError(error.message); else router.refresh();
          }}>Take off market</button>
        ) : (
          <>
            <button className="btn-primary flex-1 !py-2 text-sm" onClick={() => setShow((s) => !s)}>{show ? "Hide" : "Use it"}</button>
            <button className="btn-ghost flex-1 !py-2 text-sm" onClick={() => setSelling((s) => !s)}>Sell</button>
          </>
        )}
      </div>
    </div>
  );
}
