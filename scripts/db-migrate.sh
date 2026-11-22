#!/usr/bin/env bash
# Apply new migrations in supabase/migrations to the Supabase database (like Gepeto's `pnpm migrate`).
#
#   pnpm db:migrate                     apply every migration not yet applied
#   pnpm db:migrate --status            list applied / pending, change nothing
#   pnpm db:migrate --baseline <ver>    mark migrations up to <ver> as already applied (one time,
#                                       for ones pasted into the SQL editor before this script existed)
#
# Reads DATABASE_URL from the environment, else MIGRATE_DATABASE_URL in apps/web/.env.local
# (written by scripts/setup-env.sh; Supabase > Connect > Session pooler, password filled in). Each migration runs in one transaction:
# if any statement fails, none of it is applied. Applied versions are recorded in
# supabase_migrations.schema_migrations, the same table the Supabase CLI uses.
set -euo pipefail
cd "$(dirname "$0")/.."

if [[ -z "${DATABASE_URL:-}" && -f apps/web/.env.local ]]; then
  DATABASE_URL="$(grep -E '^MIGRATE_DATABASE_URL=' apps/web/.env.local | head -1 | cut -d= -f2- | sed -e 's/^"//' -e "s/^'//" -e 's/"$//' -e "s/'$//")"
fi
if [[ -z "${DATABASE_URL:-}" ]]; then
  echo "No database URL. Run scripts/setup-env.sh, or set MIGRATE_DATABASE_URL in apps/web/.env.local." >&2
  exit 1
fi
command -v psql >/dev/null || { echo "psql not found (brew install libpq)" >&2; exit 1; }

export PGCONNECT_TIMEOUT=15
q() { psql "$DATABASE_URL" --no-psqlrc -v ON_ERROR_STOP=1 -qAt "$@"; }

q -c "set client_min_messages = warning; create schema if not exists supabase_migrations;
      create table if not exists supabase_migrations.schema_migrations (version text primary key, statements text[], name text);"
applied="$(q -c "select version from supabase_migrations.schema_migrations order by version")"
is_applied() { grep -qx "$1" <<<"$applied"; }

mode="${1:-apply}"
if [[ "$mode" == "--baseline" ]]; then
  upto="${2:?usage: --baseline <version>}"
  for f in supabase/migrations/*.sql; do
    v="$(basename "$f" | cut -d_ -f1)"; n="$(basename "$f" .sql | cut -d_ -f2-)"
    [[ "$v" > "$upto" ]] && break
    is_applied "$v" || { q -c "insert into supabase_migrations.schema_migrations (version, name) values ('$v', '$n')"; echo "marked  $v $n"; }
  done
  exit 0
fi

# A database that already has the schema but no record of it: refuse rather than re-run old migrations.
if [[ -z "$applied" && "$(q -c "select to_regclass('public.businesses') is not null")" == "t" ]]; then
  echo "This database already has tables but no migration history." >&2
  echo "Mark the ones you applied by hand first:  pnpm db:migrate --baseline <last applied version>" >&2
  exit 1
fi

pending=0
for f in supabase/migrations/*.sql; do
  v="$(basename "$f" | cut -d_ -f1)"; n="$(basename "$f" .sql | cut -d_ -f2-)"
  if is_applied "$v"; then
    [[ "$mode" == "--status" ]] && echo "applied  $v $n"
    continue
  fi
  pending=$((pending + 1))
  if [[ "$mode" == "--status" ]]; then echo "pending  $v $n"; continue; fi
  echo "applying $v $n"
  { cat "$f"; echo; echo "insert into supabase_migrations.schema_migrations (version, name) values ('$v', '$n');"; } \
    | psql "$DATABASE_URL" --no-psqlrc --single-transaction -v ON_ERROR_STOP=1 -q
done
[[ "$mode" == "--status" ]] || { [[ $pending -eq 0 ]] && echo "Up to date." || echo "Done: $pending applied."; }
