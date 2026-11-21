import { useEffect, useState } from "react";
import { Image, KeyboardAvoidingView, Platform, ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "@/lib/auth";
import { loadKey } from "@/lib/keys";
import { Button, Eyebrow, Field, H1, Muted, s } from "@/components/ui";
import { C } from "@/lib/theme";

type Mode = "start" | "new" | "import";

export default function Welcome() {
  const { createAccount, signInWithNsec, signInWithStoredKey } = useAuth();
  const [mode, setMode] = useState<Mode>("start");
  const [hasKey, setHasKey] = useState(false);
  const [name, setName] = useState("");
  const [nsec, setNsec] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => { loadKey().then((k) => setHasKey(!!k)); }, []);

  const run = async (fn: () => Promise<void>) => {
    setBusy(true); setError(null);
    try { await fn(); } catch (e) { setError((e as Error).message); } finally { setBusy(false); }
  };

  return (
    <SafeAreaView style={s.screen}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={{ flex: 1 }}>
        <ScrollView contentContainerStyle={{ padding: 24, gap: 20, flexGrow: 1, justifyContent: "center" }} keyboardShouldPersistTaps="handled">
          <Image source={require("@/assets/images/icon.png")} style={{ width: 88, height: 88, borderRadius: 44 }} />
          <Eyebrow>Main Street first</Eyebrow>
          <H1>Build a stronger town, one paid shoutout at a time.</H1>
          <Muted>Check in at local shops, earn rewards you own, and get paid in sats for spreading the word.</Muted>

          {mode === "start" && (
            <View style={{ gap: 12, marginTop: 8 }}>
              {hasKey && <Button title="Sign in" onPress={() => run(signInWithStoredKey)} busy={busy} />}
              <Button title="Create an account" kind={hasKey ? "ghost" : "primary"} onPress={() => setMode("new")} />
              <Button title="I already have a Nostr key" kind="ghost" onPress={() => setMode("import")} />
              <Muted style={{ fontSize: 13, textAlign: "center" }}>No email, no password. Your key stays on this phone.</Muted>
            </View>
          )}

          {mode === "new" && (
            <View style={{ gap: 14 }}>
              <Field label="Your name" value={name} onChangeText={setName} placeholder="Maria from Main St" maxLength={50} autoFocus />
              <Button title="Create my account" busy={busy} disabled={!name.trim()} onPress={() => run(() => createAccount(name.trim()))} />
              <Button title="Back" kind="ghost" onPress={() => setMode("start")} />
            </View>
          )}

          {mode === "import" && (
            <View style={{ gap: 14 }}>
              <Field label="Your nsec" value={nsec} onChangeText={setNsec} placeholder="nsec1…" autoCapitalize="none" autoCorrect={false} secureTextEntry />
              <Muted style={{ fontSize: 13 }}>Stored in this phone&apos;s secure keychain. Never sent anywhere.</Muted>
              <Button title="Sign in" busy={busy} disabled={!nsec.trim()} onPress={() => run(() => signInWithNsec(nsec))} />
              <Button title="Back" kind="ghost" onPress={() => setMode("start")} />
            </View>
          )}

          {error && <Text style={{ color: C.bad, fontSize: 15 }}>{error}</Text>}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
