import { useCallback, useState } from "react";
import { Alert, FlatList, Modal, Pressable, RefreshControl, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import QRCode from "react-native-qrcode-svg";
import { supabase } from "@/lib/supabase";
import { Button, Card, Eyebrow, H1, Muted, s } from "@/components/ui";
import { C } from "@/lib/theme";
import { HONOR_GRACE_DAYS, withTown } from "@localworx/shared";

type R = { id: string; status: string; kind: string; title: string; details: string | null; businesses: { name: string; city: string } };
type Report = { id: string; reward_id: string; created_at: string };

const REWARD_COLS = "id, status, kind, title, details, businesses(name, city)";
const daysSince = (iso: string) => Math.floor((Date.now() - new Date(iso).getTime()) / 864e5);

export default function Rewards() {
  const [items, setItems] = useState<R[]>([]);
  const [loading, setLoading] = useState(false);
  const [showing, setShowing] = useState<R | null>(null);
  const [reports, setReports] = useState<Map<string, Report>>(new Map());
  const [reporting, setReporting] = useState<R | null>(null);
  const [note, setNote] = useState("");
  const [busy, setBusy] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    const { data: u } = await supabase.auth.getUser();
    const me = u.user?.id ?? "";
    const [{ data }, { data: open }] = await Promise.all([
      supabase.from("rewards").select(REWARD_COLS)
        .eq("owner_id", me).neq("status", "redeemed").order("issued_at", { ascending: false }),
      supabase.from("honor_reports").select("id, reward_id, created_at")
        .eq("reporter_id", me).is("resolved_at", null),
    ]);
    let rows = (data ?? []) as unknown as R[];
    // A report stays open after the shop marks the IOU used, so show those rewards too: only the holder can close it.
    const missing = (open ?? []).map((r) => r.reward_id).filter((id) => !rows.some((x) => x.id === id));
    if (missing.length) {
      const { data: extra } = await supabase.from("rewards").select(REWARD_COLS).in("id", missing);
      rows = [...rows, ...((extra ?? []) as unknown as R[])];
    }
    setItems(rows);
    setReports(new Map((open ?? []).map((r) => [r.reward_id, r as Report])));
    setLoading(false);
  }, []);
  useFocusEffect(useCallback(() => { load(); }, [load]));

  async function submitReport() {
    if (!reporting) return;
    setBusy(true);
    const { error } = await supabase.rpc("report_unhonored", { p_reward: reporting.id, p_note: note.trim() });
    setBusy(false);
    if (error) return Alert.alert("Couldn't report it", /already reported/i.test(error.message) ? "You've already reported this one." : error.message);
    setReporting(null);
    setNote("");
    load();
  }

  function closeReport(rep: Report) {
    Alert.alert("They made it right?", "This closes your report, and it stops counting toward the shop's Unpaid IOU badge.", [
      { text: "Not yet", style: "cancel" },
      { text: "Yes, close it", onPress: async () => {
        const { error } = await supabase.rpc("close_honor_report", { p_report: rep.id });
        if (error) Alert.alert("Couldn't close it", error.message); else load();
      } },
    ]);
  }

  return (
    <SafeAreaView style={s.screen} edges={["top"]}>
      <FlatList
        data={items}
        keyExtractor={(r) => r.id}
        contentContainerStyle={{ padding: 20, gap: 12 }}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
        ListHeaderComponent={<View style={{ gap: 6, marginBottom: 8 }}><Eyebrow>Your wallet</Eyebrow><H1>Rewards</H1></View>}
        ListEmptyComponent={loading ? undefined : <Muted>No rewards yet. Scan in at a shop to start a punch card.</Muted>}
        renderItem={({ item: r }) => (
          <Card style={{ gap: 6 }}>
            <Muted style={{ fontSize: 14 }}>{withTown(r.businesses.name, r.businesses.city)}</Muted>
            <Text style={{ fontSize: 20, fontWeight: "700", color: C.ink }}>{r.title}</Text>
            {!!r.details && <Muted style={{ fontSize: 14 }}>{r.details}</Muted>}
            {r.kind === "promoter_payout" && <Text style={{ fontSize: 12, fontWeight: "600", color: C.ink2 }}>Earned promoting this shop · sell it on localworx.io</Text>}
            {(() => {
              const rep = reports.get(r.id);
              if (rep) {
                const left = HONOR_GRACE_DAYS - daysSince(rep.created_at);
                return (
                  <View style={{ marginTop: 6, gap: 8, padding: 12, borderRadius: 12, backgroundColor: "#b4231814" }}>
                    <Text style={{ color: C.bad, fontSize: 14 }}>
                      You reported that the shop wouldn&apos;t honor this. {left > 0 ? `The badge shows in ${left} day${left === 1 ? "" : "s"} if it isn't made right.` : "The shop's page shows an Unpaid IOU badge."}
                    </Text>
                    <Button title="They made it right" kind="ghost" onPress={() => closeReport(rep)} />
                  </View>
                );
              }
              if (r.status === "listed") return <Text style={{ color: C.orangeDark, fontWeight: "600" }}>Listed for sale (manage on localworx.io)</Text>;
              return (
                <View style={{ marginTop: 6, gap: 10 }}>
                  <Button title="Use it" onPress={() => setShowing(r)} />
                  <Pressable onPress={() => { setNote(""); setReporting(r); }} hitSlop={8}>
                    <Text style={{ color: C.muted, fontSize: 13, textAlign: "center", textDecorationLine: "underline" }}>Shop won&apos;t honor this?</Text>
                  </Pressable>
                </View>
              );
            })()}
          </Card>
        )}
      />
      <Modal visible={!!showing} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setShowing(null)}>
        {showing && (
          <View style={{ flex: 1, backgroundColor: C.paper, padding: 24, alignItems: "center", justifyContent: "center", gap: 20 }}>
            <Eyebrow>{withTown(showing.businesses.name, showing.businesses.city)}</Eyebrow>
            <H1>{showing.title}</H1>
            <View style={{ padding: 16, backgroundColor: C.white, borderRadius: 20 }}>
              <QRCode value={`localworx:reward:${showing.id}`} size={240} />
            </View>
            <Muted style={{ textAlign: "center" }}>Show this to staff. They scan it with the LocalWorx app. It works once.</Muted>
            <Pressable onPress={() => { setShowing(null); load(); }}><Text style={{ color: C.orangeDark, fontWeight: "700", fontSize: 16 }}>Done</Text></Pressable>
          </View>
        )}
      </Modal>
      <Modal visible={!!reporting} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setReporting(null)}>
        {reporting && (
          <View style={{ flex: 1, backgroundColor: C.paper, padding: 24, gap: 16 }}>
            <Eyebrow>{withTown(reporting.businesses.name, reporting.businesses.city)}</Eyebrow>
            <H1>Shop won&apos;t honor this?</H1>
            <Text style={{ fontSize: 16, color: C.ink2, lineHeight: 22 }}>
              Every shop on LocalWorx pledges to honor its rewards and IOUs. Tell us what happened. The shop has {HONOR_GRACE_DAYS} days
              to make it right before its page shows an &quot;Unpaid IOU&quot; badge. Close the report once they do.
            </Text>
            <Text style={{ fontWeight: "700", color: C.ink }}>{reporting.title}</Text>
            <TextInput
              value={note} onChangeText={setNote} maxLength={500} multiline placeholder="What happened? (optional)"
              placeholderTextColor={C.muted}
              style={{ minHeight: 90, borderWidth: 1, borderColor: C.line, borderRadius: 12, backgroundColor: C.white, padding: 12, fontSize: 16, color: C.ink, textAlignVertical: "top" }}
            />
            <Button title="Report it" kind="dark" busy={busy} onPress={submitReport} />
            <Pressable onPress={() => setReporting(null)} style={{ alignSelf: "center" }}>
              <Text style={{ color: C.orangeDark, fontWeight: "700", fontSize: 16 }}>Never mind</Text>
            </Pressable>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
}
