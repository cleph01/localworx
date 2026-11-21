"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { lightningAddress } from "@localworx/shared";
import { createClient } from "@/lib/supabase/browser";

type P = { id: string; display_name: string; lightning_address: string | null };

export function ProfileForm({ profile }: { profile: P }) {
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const router = useRouter();
  return (
    <form className="card space-y-5 p-6" onSubmit={async (e) => {
      e.preventDefault();
      const f = new FormData(e.currentTarget);
      const ln = String(f.get("ln") ?? "").trim();
      const parsedLn = ln ? lightningAddress.safeParse(ln) : null;
      if (parsedLn && !parsedLn.success) return setMsg({ ok: false, text: parsedLn.error.issues[0].message });
      const { error } = await createClient().from("profiles").update({
        display_name: String(f.get("name")).trim(),
        lightning_address: parsedLn?.data ?? null,
      }).eq("id", profile.id);
      setMsg(error ? { ok: false, text: "Couldn't save." } : { ok: true, text: "Saved." });
      router.refresh();
    }}>
      <label className="block">
        <span className="label">Display name</span>
        <input name="name" defaultValue={profile.display_name} required maxLength={50} className="field" />
      </label>
      <label className="block">
        <span className="label">Lightning address</span>
        <input name="ln" defaultValue={profile.lightning_address ?? ""} placeholder="you@getalby.com" className="field" />
        <span className="mt-1 block text-xs text-muted">
          Where you receive sats: promoter payouts and reward sales. Any Lightning wallet works (Alby, Wallet of Satoshi, Strike, Primal…).
        </span>
      </label>
      <button className="btn-primary">Save</button>
      {msg && <p className={`text-sm ${msg.ok ? "text-good" : "text-bad"}`}>{msg.text}</p>}
    </form>
  );
}
