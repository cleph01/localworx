import { Tabs } from "expo-router/js-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { C } from "@/lib/theme";

type IconName = React.ComponentProps<typeof Ionicons>["name"];
const icon = (name: IconName) => ({ color, size }: { color: unknown; size: number }) => <Ionicons name={name} color={color as string} size={size} />;

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      headerShown: false,
      tabBarActiveTintColor: C.orangeDark,
      tabBarInactiveTintColor: C.muted,
      tabBarStyle: { backgroundColor: C.white, borderTopColor: C.line },
      sceneStyle: { backgroundColor: C.paper },
    }}>
      <Tabs.Screen name="index" options={{ title: "Nearby", tabBarIcon: icon("storefront-outline") }} />
      <Tabs.Screen name="scan" options={{ title: "Scan", tabBarIcon: icon("qr-code-outline") }} />
      <Tabs.Screen name="rewards" options={{ title: "Rewards", tabBarIcon: icon("gift-outline") }} />
      <Tabs.Screen name="me" options={{ title: "Me", tabBarIcon: icon("person-circle-outline") }} />
    </Tabs>
  );
}
