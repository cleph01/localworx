import "@/lib/polyfills";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { AuthProvider, useAuth } from "@/lib/auth";
import { C } from "@/lib/theme";

function RootStack() {
  const { session, ready } = useAuth();
  if (!ready) return null;
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: C.paper } }}>
      <Stack.Protected guard={!!session}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="business/[slug]" options={{ headerShown: true, title: "", headerTintColor: C.ink, headerStyle: { backgroundColor: C.paper } }} />
      </Stack.Protected>
      <Stack.Protected guard={!session}>
        <Stack.Screen name="welcome" />
      </Stack.Protected>
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <StatusBar style="dark" />
      <RootStack />
    </AuthProvider>
  );
}
