import { useRef, useState } from "react";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { CameraView, useCameraPermissions } from "expo-camera";
import * as Location from "expo-location";
import { useIsFocused } from "expo-router";
import { parseCheckinUrl } from "@localworx/shared";
import { api } from "@/lib/api";
import { supabase } from "@/lib/supabase";
import { Button, Card, H1, Muted, s } from "@/components/ui";
import { C } from "@/lib/theme";

type Outcome = { ok: boolean; title: string; body?: string };

// One scanner for everything: counter codes (members check in) and
// reward codes (staff mark a customer's reward as used).
export default function Scan() {
  const [perm, requestPerm] = useCameraPermissions();
  const [busy, setBusy] = useState(false);
  const [outcome, setOutcome] = useState<Outcome | null>(null);
  const locked = useRef(false);
  const focused = useIsFocused();

  async function handle(data: string) {
    if (locked.current) return;
    locked.current = true;
    setBusy(true);
    try {
      const checkin = parseCheckinUrl(data);
      if (checkin) {
        const loc = await Location.requestForegroundPermissionsAsync();
        if (!loc.granted) throw new Error("Allow location so we can confirm you're at the shop.");
        const pos = await Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.High });
        const r = await api("/api/checkin", { method: "POST",
          body: { slug: checkin.slug, code: checkin.code, lat: pos.coords.latitude, lng: pos.coords.longitude } });
        setOutcome(r.reward_id
          ? { ok: true, title: "You earned a reward! 🎉", body: `${r.program_name} is in your Rewards.` }
          : { ok: true, title: `Checked in at ${r.business}`, body: r.visits_required ? `${r.program_name}: ${r.visits} of ${r.visits_required} visits` : undefined });
      } else if (data.startsWith("localworx:reward:")) {
        const { error } = await supabase.rpc("redeem_reward", { p_reward: data.slice("localworx:reward:".length) });
        if (error) throw new Error(/not allowed/.test(error.message) ? "Only staff of this shop can use this reward." : error.message);
        setOutcome({ ok: true, title: "Reward used ✅", body: "It can't be used again." });
      } else {
        throw new Error("That isn't a LocalWorx code.");
      }
    } catch (e) {
      setOutcome({ ok: false, title: "Not done", body: (e as Error).message });
    } finally {
      setBusy(false);
    }
  }

  if (!perm) return <View style={s.screen} />;
  if (!perm.granted) {
    return (
      <SafeAreaView style={[s.screen, { padding: 24, gap: 16, justifyContent: "center" }]}>
        <H1>Scan to check in</H1>
        <Muted>LocalWorx uses the camera only to read the code at the counter.</Muted>
        <Button title="Allow camera" onPress={requestPerm} />
      </SafeAreaView>
    );
  }

  return (
    <View style={{ flex: 1, backgroundColor: "#000" }}>
      {focused && !outcome && (
        <CameraView style={StyleSheet.absoluteFill} facing="back"
          barcodeScannerSettings={{ barcodeTypes: ["qr"] }}
          onBarcodeScanned={busy ? undefined : ({ data }) => handle(data)} />
      )}
      <SafeAreaView style={{ flex: 1, justifyContent: "space-between", padding: 20 }} pointerEvents="box-none">
        <Text style={{ color: "#fff", fontSize: 22, fontWeight: "700", textAlign: "center", marginTop: 12 }}>
          {busy ? "Checking…" : "Point at the LocalWorx code"}
        </Text>
        {!outcome && <View style={styles.frame} />}
        {outcome ? (
          <Card style={{ gap: 8 }}>
            <Text style={{ fontSize: 20, fontWeight: "700", color: outcome.ok ? C.good : C.bad }}>{outcome.title}</Text>
            {outcome.body && <Muted>{outcome.body}</Muted>}
            <Button title="Scan another" kind="dark" onPress={() => { setOutcome(null); locked.current = false; }} />
          </Card>
        ) : <View />}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  frame: { alignSelf: "center", width: 250, height: 250, borderRadius: 24, borderWidth: 3, borderColor: C.orange },
});
