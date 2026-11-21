# LocalWorx v2 — Claude context

Rebuild of the legacy LocalWorx app (Next 15 + Knex, pre-2026).
The legacy code is a spec only. Product spec + decisions live in the Claude Doc
"LocalWorx — Product Spec & Feature Inventory".

## Non-negotiables
- **Non-custodial.** No table, env var or code path may hold a wallet secret or user funds.
  Payments are wallet→wallet; the server only verifies proofs (preimage / LUD-21).
- **Keys never leave the device.** Never send an nsec to the server. Sign-in = signed challenge.
- **RLS on every table.** New table → enable RLS, write policies, add cases to `scripts/test-rls.mjs`.
  Writes with business rules go through SECURITY DEFINER functions; server-only ones are granted to
  `service_role` alone (see the grants block at the end of the migration).
- `pnpm test:rls` and `pnpm check:env` must pass before commit.

## Conventions
- pnpm + Turborepo. Every env var an app reads must be in `turbo.json` `globalEnv` (Gepeto lesson).
- Web dev port 3020. Mobile Expo port 8090.
- Extensions live in the `extensions` schema on Supabase: call `extensions.gen_random_bytes(...)`.
- Plain-language UI copy; help articles live in `apps/web/lib/help.ts` — update when features change.
