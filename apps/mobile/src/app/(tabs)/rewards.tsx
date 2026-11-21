import { useCallback, useState } from "react";
import { FlatList, Modal, Pressable, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "expo-router";
import QRCode from "react-native-qrcode-svg";
import { supabase } from "@/lib/supabase";
import { Button, Card, Eyebrow, H1, Muted, s } from "@/components/ui";
import { C } from "@/lib/theme";
import { withTown } from "@localworx/shared";

type R = { id: string; status: string; reward_programs: { name: string }; businesses: { name: string; city: string } };

export default function Rewards() {
  const [items, setItems] = useState<R[]>([]);
  const [loading, setLoading] = useState(false);
  const [showing, setShowing] = useState<R | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    const { data: u } = await supabase.auth.getUser();
    const { data } = await supabase.from("rewards")
      .select("id, status, reward_programs(name), businesses(name, city)")
      .eq("owner_id", u.user?.id ?? "").neq("status", "redeemed").order("issued_at", { ascending: false });
    setItems((data ?? []) as unknown as R[]);
    setLoading(false);
  }, []);
  useFocusEffect(useCallback(() => { load(); }, [load]));

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
            <Text style={{ fontSize: 20, fontWeight: "700", color: C.ink }}>{r.reward_programs.name}</Text>
            {r.status === "listed"
              ? <Text style={{ color: C.orangeDark, fontWeight: "600" }}>Listed for sale (manage on localworx.io)</Text>
              : <View style={{ marginTop: 6 }}><Button title="Use it" onPress={() => setShowing(r)} /></View>}
          </Card>
        )}
      />
      <Modal visible={!!showing} animationType="slide" presentationStyle="pageSheet" onRequestClose={() => setShowing(null)}>
        {showing && (
          <View style={{ flex: 1, backgroundColor: C.paper, padding: 24, alignItems: "center", justifyContent: "center", gap: 20 }}>
            <Eyebrow>{withTown(showing.businesses.name, showing.businesses.city)}</Eyebrow>
            <H1>{showing.reward_programs.name}</H1>
            <View style={{ padding: 16, backgroundColor: C.white, borderRadius: 20 }}>
              <QRCode value={`localworx:reward:${showing.id}`} size={240} />
            </View>
            <Muted style={{ textAlign: "center" }}>Show this to staff. They scan it with the LocalWorx app. It works once.</Muted>
            <Pressable onPress={() => { setShowing(null); load(); }}><Text style={{ color: C.orangeDark, fontWeight: "700", fontSize: 16 }}>Done</Text></Pressable>
          </View>
        )}
      </Modal>
    </SafeAreaView>
  );
}
