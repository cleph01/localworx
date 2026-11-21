import { useCallback, useState } from "react";
import { Alert, Linking, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import * as Clipboard from "expo-clipboard";
import { lightningAddress } from "@localworx/shared";
import { useAuth } from "@/lib/auth";
import { supabase } from "@/lib/supabase";
import { loadKey, npubOf, nsecOf } from "@/lib/keys";
import { API_URL } from "@/lib/config";
import { Button, Card, Eyebrow, Field, H1, Muted, s } from "@/components/ui";
import { C } from "@/lib/theme";

export default function Me() {
  const { signOut } = useAuth();
  const [id, setId] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [ln, setLn] = useState("");
  const [npub, setNpub] = useState("");
  const [businesses, setBusinesses] = useState<{ name: string; slug: string }[]>([]);
  const [msg, setMsg] = useState<string | null>(null);

  useFocusEffect(useCallback(() => {
    (async () => {
      const { data: u } = await supabase.auth.getUser();
      if (!u.user) return;
      setId(u.user.id);
      const { data: p } = await supabase.from("profiles").select("display_name, lightning_address").eq("id", u.user.id).single();
      setName(p?.display_name ?? ""); setLn(p?.lightning_address ?? "");
      const { data: b } = await supabase.from("business_staff").select("businesses(name, slug)").eq("profile_id", u.user.id);
      setBusinesses((b ?? []).map((r) => r.businesses as unknown as { name: string; slug: string }));
      const sk = await loadKey(); if (sk) setNpub(npubOf(sk));
    })();
  }, []));

  async function save() {
    const parsed = ln.trim() ? lightningAddress.safeParse(ln) : null;
    if (parsed && !parsed.success) return setMsg(parsed.error.issues[0].message);
    const { error } = await supabase.from("profiles").update({ display_name: name.trim(), lightning_address: parsed?.data ?? null }).eq("id", id!);
    setMsg(error ? "Couldn't save." : "Saved.");
  }

  function backup() {
    Alert.alert("Show your secret key?", "Anyone who sees it can use your account. Only copy it into a password manager.", [
      { text: "Cancel", style: "cancel" },
      { text: "Copy key", onPress: async () => { const sk = await loadKey(); if (sk) { await Clipboard.setStringAsync(nsecOf(sk)); setMsg("Key copied. Paste it into your password manager now."); } } },
    ]);
  }

  return (
    <SafeAreaView style={s.screen} edges={["top"]}>
      <ScrollView contentContainerStyle={{ padding: 20, gap: 16 }} keyboardShouldPersistTaps="handled">
        <Eyebrow>Account</Eyebrow>
        <H1>Me</H1>
        <Card style={{ gap: 14 }}>
          <Field label="Display name" value={name} onChangeText={setName} maxLength={50} />
          <Field label="Lightning address" value={ln} onChangeText={setLn} placeholder="you@getalby.com" autoCapitalize="none" autoCorrect={false} keyboardType="email-address" />
          <Muted style={{ fontSize: 13 }}>Where you receive sats from promotions and reward sales.</Muted>
          <Button title="Save" kind="dark" onPress={save} />
          {msg && <Text style={{ color: C.ink2 }}>{msg}</Text>}
        </Card>

        {businesses.length > 0 && (
          <Card style={{ gap: 10 }}>
            <Text style={{ fontWeight: "700", fontSize: 17, color: C.ink }}>My businesses</Text>
            <Muted style={{ fontSize: 14 }}>Use the Scan tab to mark customers&apos; rewards as used.</Muted>
            {businesses.map((b) => (
              <Button key={b.slug} title={`Manage ${b.name}`} kind="ghost" onPress={() => Linking.openURL(`${API_URL}/business/${b.slug}/manage`)} />
            ))}
          </Card>
        )}

        <Card style={{ gap: 10 }}>
          <Text style={{ fontWeight: "700", fontSize: 17, color: C.ink }}>Your key</Text>
          <Muted style={{ fontSize: 13 }}>Public ID: {npub ? `${npub.slice(0, 16)}…${npub.slice(-6)}` : "…"}</Muted>
          <Muted style={{ fontSize: 13 }}>Your account is this key. Back it up, or you can&apos;t get back in on a new phone.</Muted>
          <Button title="Back up my key" kind="ghost" onPress={backup} />
        </Card>

        <Button title="Sign out" kind="ghost" onPress={() => signOut()} />
        <Text style={{ color: C.muted, fontSize: 13, textAlign: "center" }} onPress={() =>
          Alert.alert("Remove key from this phone?", "Only do this if you've backed it up.", [
            { text: "Cancel", style: "cancel" },
            { text: "Remove", style: "destructive", onPress: () => signOut({ forgetKey: true }) },
          ])}>Sign out and remove key from this phone</Text>
      </ScrollView>
    </SafeAreaView>
  );
}
