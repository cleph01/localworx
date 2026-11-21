import { createContext, useCallback, useContext, useEffect, useState } from "react";
import type { Session } from "@supabase/supabase-js";
import { buildAuthEventTemplate } from "@localworx/shared";
import { supabase } from "./supabase";
import { API_URL } from "./config";
import { createKey, deleteKey, importKey, loadKey, sign } from "./keys";

type Ctx = {
  session: Session | null;
  ready: boolean;
  /** New account: makes a key on this phone and signs in. */
  createAccount(name: string): Promise<void>;
  /** Existing key (nsec). */
  signInWithNsec(nsec: string): Promise<void>;
  /** Key already on this phone. */
  signInWithStoredKey(): Promise<void>;
  signOut(opts?: { forgetKey?: boolean }): Promise<void>;
};

const AuthCtx = createContext<Ctx | null>(null);

async function signInWithKey(sk: Uint8Array, displayName?: string) {
  const c = await fetch(`${API_URL}/api/auth/challenge`, { method: "POST" });
  if (!c.ok) throw new Error("Couldn't reach LocalWorx. Check your connection.");
  const { challenge, url } = await c.json();
  const event = sign(sk, buildAuthEventTemplate({ challenge, url }));
  const v = await fetch(`${API_URL}/api/auth/verify`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ event, display_name: displayName, client: "mobile" }),
  });
  const data = await v.json();
  if (!v.ok) throw new Error(data.error ?? "Sign-in failed");
  const { error } = await supabase.auth.setSession({ access_token: data.access_token, refresh_token: data.refresh_token });
  if (error) throw error;
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [session, setSession] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
      setReady(true);
    });
    const { data } = supabase.auth.onAuthStateChange((_e, s) => setSession(s));
    return () => data.subscription.unsubscribe();
  }, []);

  const createAccount = useCallback(async (name: string) => signInWithKey(await createKey(), name), []);
  const signInWithNsec = useCallback(async (nsec: string) => signInWithKey(await importKey(nsec)), []);
  const signInWithStoredKey = useCallback(async () => {
    const sk = await loadKey();
    if (!sk) throw new Error("No key on this phone");
    await signInWithKey(sk);
  }, []);
  const signOut = useCallback(async (opts?: { forgetKey?: boolean }) => {
    await supabase.auth.signOut();
    if (opts?.forgetKey) await deleteKey();
  }, []);

  return (
    <AuthCtx.Provider value={{ session, ready, createAccount, signInWithNsec, signInWithStoredKey, signOut }}>
      {children}
    </AuthCtx.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthCtx);
  if (!ctx) throw new Error("useAuth outside AuthProvider");
  return ctx;
}
