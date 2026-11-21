import { useEffect, useState } from "react";
import { Linking, ScrollView, Text, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { supabase } from "@/lib/supabase";
import { Button, Card, Eyebrow, H1, Muted } from "@/components/ui";
import { C } from "@/lib/theme";

export default function BusinessScreen() {
  const { slug } = useLocalSearchParams<{ slug: string }>();
  const [b, setB] = useState<any>(null);

  useEffect(() => {
    supabase.from("businesses")
      .select("id, name, description, address, city, state, lat, lng, phone, website, categories(name), reward_programs(name, description, visits_required, is_active), promotions(id, title, body, sats_per_visit, is_active)")
      .eq("slug", slug).maybeSingle().then(({ data }) => setB(data));
  }, [slug]);

  if (!b) return null;
  const program = b.reward_programs?.find((p: any) => p.is_active);
  const promos = (b.promotions ?? []).filter((p: any) => p.is_active);

  return (
    <ScrollView contentContainerStyle={{ padding: 20, gap: 14 }}>
      <Stack.Screen options={{ title: b.name }} />
      <Eyebrow>{b.categories?.name}</Eyebrow>
      <H1>{b.name}</H1>
      <Muted>{b.address}, {b.city}, {b.state}</Muted>
      {!!b.description && <Text style={{ fontSize: 16, color: C.ink2, lineHeight: 23 }}>{b.description}</Text>}
      <View style={{ flexDirection: "row", gap: 10 }}>
        <View style={{ flex: 1 }}><Button title="Directions" kind="ghost" onPress={() => Linking.openURL(`https://maps.apple.com/?daddr=${b.lat},${b.lng}`)} /></View>
        {!!b.phone && <View style={{ flex: 1 }}><Button title="Call" kind="ghost" onPress={() => Linking.openURL(`tel:${b.phone}`)} /></View>}
      </View>
      <Card style={{ gap: 6 }}>
        <Eyebrow>Rewards</Eyebrow>
        {program ? (
          <>
            <Text style={{ fontSize: 20, fontWeight: "700", color: C.ink }}>{program.name}</Text>
            <Muted>After {program.visits_required} visits. {program.description}</Muted>
          </>
        ) : <Muted>No reward set up yet.</Muted>}
        <Muted style={{ fontSize: 13, marginTop: 6 }}>Scan the LocalWorx code at the counter to check in. Once a day.</Muted>
      </Card>
      {promos.map((p: any) => (
        <Card key={p.id} style={{ gap: 4 }}>
          <Text style={{ fontWeight: "700", fontSize: 16, color: C.ink }}>{p.title}</Text>
          {!!p.body && <Muted style={{ fontSize: 14 }}>{p.body}</Muted>}
          {p.sats_per_visit > 0 && <Text style={{ color: C.orangeDark, fontWeight: "700" }}>{p.sats_per_visit.toLocaleString()} sats per visit for promoters</Text>}
        </Card>
      ))}
    </ScrollView>
  );
}
