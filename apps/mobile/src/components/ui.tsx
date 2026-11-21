import { ActivityIndicator, Pressable, StyleSheet, Text, TextInput, View, type TextInputProps, type ViewStyle } from "react-native";
import { C } from "@/lib/theme";

export function H1({ children }: { children: React.ReactNode }) {
  return <Text style={s.h1}>{children}</Text>;
}
export function Eyebrow({ children }: { children: React.ReactNode }) {
  return <Text style={s.eyebrow}>{children}</Text>;
}
export function Muted({ children, style }: { children: React.ReactNode; style?: object }) {
  return <Text style={[s.muted, style]}>{children}</Text>;
}
export function Card({ children, style }: { children: React.ReactNode; style?: ViewStyle }) {
  return <View style={[s.card, style]}>{children}</View>;
}

export function Button({ title, onPress, kind = "primary", busy, disabled }: {
  title: string; onPress: () => void; kind?: "primary" | "dark" | "ghost"; busy?: boolean; disabled?: boolean;
}) {
  const bg = kind === "primary" ? C.orange : kind === "dark" ? C.ink : C.white;
  const fg = kind === "dark" ? C.paper : C.ink;
  return (
    <Pressable onPress={onPress} disabled={busy || disabled} accessibilityRole="button"
      style={({ pressed }) => [s.btn, { backgroundColor: bg, opacity: pressed || disabled ? 0.7 : 1 },
        kind === "ghost" && { borderWidth: 1, borderColor: C.line }]}>
      {busy ? <ActivityIndicator color={fg} /> : <Text style={[s.btnText, { color: fg }]}>{title}</Text>}
    </Pressable>
  );
}

export function Field(props: TextInputProps & { label: string }) {
  return (
    <View style={{ gap: 6 }}>
      <Text style={s.label}>{props.label}</Text>
      {/* fontSize 16: iOS doesn't zoom */}
      <TextInput placeholderTextColor="#9aa5b1" {...props} style={[s.input, props.style]} />
    </View>
  );
}

export const s = StyleSheet.create({
  h1: { fontSize: 30, fontWeight: "700", color: C.ink, letterSpacing: -0.5 },
  eyebrow: { fontSize: 12, fontWeight: "700", letterSpacing: 1.6, color: C.orangeDark, textTransform: "uppercase" },
  muted: { fontSize: 15, color: C.muted, lineHeight: 21 },
  card: { backgroundColor: C.white, borderRadius: 18, borderWidth: 1, borderColor: C.line, padding: 16 },
  btn: { height: 50, borderRadius: 999, alignItems: "center", justifyContent: "center", paddingHorizontal: 20 },
  btnText: { fontSize: 16, fontWeight: "700" },
  label: { fontSize: 14, fontWeight: "600", color: C.ink2 },
  input: { backgroundColor: C.white, borderWidth: 1, borderColor: C.line, borderRadius: 14, paddingHorizontal: 14, height: 48, fontSize: 16, color: C.ink },
  screen: { flex: 1, backgroundColor: C.paper },
});
