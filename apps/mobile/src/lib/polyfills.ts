// Must be imported first (see app/_layout.tsx).
import "react-native-url-polyfill/auto";
import * as Crypto from "expo-crypto";

// nostr-tools needs crypto.getRandomValues to make keys. Hermes doesn't ship it; Expo does.
const g = globalThis as unknown as { crypto?: { getRandomValues?: unknown } };
if (!g.crypto) g.crypto = {};
if (!g.crypto.getRandomValues) {
  g.crypto.getRandomValues = Crypto.getRandomValues;
}
