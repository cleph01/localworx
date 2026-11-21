@AGENTS.md

# apps/web

- Next.js 16 with `cacheComponents: false` on purpose (plain server rendering, like Gepeto).
- Dev server: port 3020 (3000 = Gepeto dispatcher, 3010 = Gepeto sales CRM).
- Data access: Server Components and client components use the anon key AS the user (RLS applies).
  `lib/supabase/admin.ts` (service role) is only for API routes, after the route has verified the caller.
- Never prefix a secret with `NEXT_PUBLIC_`. `pnpm check:env` at the repo root fails if one is.
