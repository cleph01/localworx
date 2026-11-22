# LocalWorx

Main Street first. LocalWorx pays neighbors in Bitcoin for bringing customers to local shops.
Members check in at the counter and fill punch cards; promoters earn sats for verified visits;
businesses only pay for customers who actually walk in.

**Non-custodial** (LocalWorx never holds funds) · **Nostr identity** (the key never leaves the device) ·
**Row-level security on every table** · GPLv3.

## Layout

| Path | What |
| --- | --- |
| `apps/web` | Next.js 16: landing page, directory, check-in, rewards, marketplace, owner tools, help |
| `apps/mobile` | Expo (React Native): scan-to-check-in, rewards, staff redeem scanner |
| `packages/shared` | Sign-in event checks, rotating check-in codes, Lightning proof, zod schemas, row types |
| `supabase/migrations` | Schema, RLS policies, and the database functions that guard every write |
| `scripts/test-rls.mjs` | Runs the migrations in an in-memory Postgres and tries to break every rule |

## Run it

```bash
pnpm install
pnpm test            # shared logic
pnpm test:rls        # 75 permission checks against the real migration
pnpm check:env       # no secrets behind NEXT_PUBLIC_/EXPO_PUBLIC_
pnpm --filter @localworx/web dev -- -p 3020
```

Copy `apps/web/.env.example` to `apps/web/.env.local` and fill in a Supabase project
(apply `supabase/migrations/*.sql` first: `npx supabase db push`, or paste into the SQL editor).

## How sign-in works

1. The app asks `/api/auth/challenge` for a one-time challenge.
2. The device signs it (NIP-98 style event, kind 27235) with its Nostr key: browser extension,
   a key stored encrypted on the device (NIP-49), or the phone keychain.
3. `/api/auth/verify` checks the signature and burns the challenge, then opens a normal Supabase
   session for that pubkey. RLS uses `auth.uid()` from then on.

## How a check-in is verified

The counter shows a QR that changes every 30 seconds (HMAC of a per-business secret). The phone sends
the code plus its location; the API checks both, then `record_checkin()` enforces one check-in per
business per day and fills the punch card.
