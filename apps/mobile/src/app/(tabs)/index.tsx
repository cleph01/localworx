import { useCallback, useEffect, useState } from "react";
import { FlatList, Pressable, RefreshControl, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Link } from "expo-router";
import * as Location from "expo-location";
import { haversineMeters } from "@localworx/shared";
import { supabase } from "@/lib/supabase";
import { Card, Eyebrow, H1, Muted, s } from "@/components/ui";
import { C } from "@/lib/theme";

type Biz = { slug: string; name: string; city: string; lat: number; lng: number; hiring_promoters: boolean;
  categories: { name: string } | null; reward_programs: { name: string; visits_required: number; is_active: boolean }[]; meters?: number };

const fmt = (m?: number) => (m == null ? "" : m < 1000 ? `${Math.round(m)} m` : `${(m / 1609).toFixed(1)} mi`);

export default function Nearby() {
  const [items, setItems] = useState<Biz[]>([]);
  const [loading, setLoading] = useState(true);

  const load = useCallback(async () => {
    setLoading(true);
    const { data } = await supabase.from("businesses")
      .select("slug, name, city, lat, lng, hiring_promoters, categories(name), reward_programs(name, visits_required, is_active)")
      .limit(300);
    let list = (data ?? []) as unknown as Biz[];
    const perm = await Location.requestForegroundPermissionsAsync();
    if (perm.granted) {
      const pos = await Location.getLastKnownPositionAsync() ?? await Location.getCurrentPositionAsync({});
      if (pos) {
        const me = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        list = list.map((b) => ({ ...b, meters: haversineMeters(me, b) })).sort((a, b) => a.meters! - b.meters!);
      }
    }
    setItems(list);
    setLoading(false);
  }, []);

  useEffect(() => { load(); }, [load]);

  return (
    <SafeAreaView style={s.screen} edges={["top"]}>
      <FlatList
        data={items}
        keyExtractor={(b) => b.slug}
        contentContainerStyle={{ padding: 20, gap: 12 }}
        refreshControl={<RefreshControl refreshing={loading} onRefresh={load} />}
        ListHeaderComponent={<View style={{ gap: 6, marginBottom: 8 }}><Eyebrow>Nearby</Eyebrow><H1>Local shops</H1></View>}
        ListEmptyComponent={loading ? undefined : <Muted>No shops yet. Know one that should be here? Send them to localworx.io.</Muted>}
        renderItem={({ item: b }) => {
          const program = b.reward_programs.find((p) => p.is_active);
          return (
            <Link href={`/business/${b.slug}`} asChild>
              <Pressable>
                <Card>
                  <View style={{ flexDirection: "row", justifyContent: "space-between", gap: 8 }}>
                    <Text style={{ fontSize: 17, fontWeight: "700", color: C.ink, flex: 1 }}>{b.name}</Text>
                    <Text style={{ color: C.muted }}>{fmt(b.meters)}</Text>
                  </View>
                  <Muted style={{ fontSize: 14 }}>{b.categories?.name} · {b.city}</Muted>
                  {program && <Text style={{ marginTop: 8, color: C.ink2 }}>🎁 {program.name} after {program.visits_required} visits</Text>}
                </Card>
              </Pressable>
            </Link>
          );
        }}
      />
    </SafeAreaView>
  );
}
