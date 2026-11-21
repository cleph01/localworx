@AGENTS.md

# apps/mobile (Expo SDK 58, expo-router, Expo Go compatible)

- Start: `pnpm start` (Metro on port 8090). Set `.env` from `.env.example`; on a phone, `EXPO_PUBLIC_API_URL`
  must be reachable (e.g. the Mac Mini's Tailscale IP + web port 3020; add that IP to `DEV_ORIGINS` in apps/web/.env.local).
- The Nostr key lives in SecureStore (`src/lib/keys.ts`), never AsyncStorage, never sent to the server.
- Sign-in: same signed-challenge flow as web, `client: "mobile"` returns Supabase tokens → `setSession`.
- `src/lib/polyfills.ts` must stay the first import in `src/app/_layout.tsx` (crypto.getRandomValues for nostr-tools).
- One scanner (`(tabs)/scan.tsx`) handles counter check-in URLs and staff reward codes (`localworx:reward:<id>`).
