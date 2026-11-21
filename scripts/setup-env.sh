#!/usr/bin/env bash
# Writes apps/web/.env.local and apps/mobile/.env from values you paste in.
# Secrets are typed hidden and never echoed. Both files are gitignored.
# Run from the repo root:  bash scripts/setup-env.sh
set -euo pipefail
cd "$(dirname "$0")/.."

echo "LocalWorx env setup. Values come from your Supabase project dashboard."
echo

read -r -p "1) Project URL (https://xxxx.supabase.co): " SUPABASE_URL
SUPABASE_URL="${SUPABASE_URL%/}"
[[ "$SUPABASE_URL" =~ ^https://[a-z0-9]+\.supabase\.co$ ]] || { echo "That doesn't look like a Supabase project URL."; exit 1; }

read -r -p "2) Publishable key (sb_publishable_… or anon eyJ…): " ANON_KEY
[[ "$ANON_KEY" == sb_secret_* ]] && { echo "That's the SECRET key. Paste the publishable one here."; exit 1; }

read -r -s -p "3) Secret key (sb_secret_… or service_role eyJ…), hidden: " SECRET_KEY; echo
[[ "$SECRET_KEY" == sb_publishable_* ]] && { echo "That's the publishable key. Paste the SECRET one."; exit 1; }
[[ -n "$SECRET_KEY" ]] || { echo "Secret key is empty."; exit 1; }

read -r -p "4) Session pooler connection string (with [YOUR-PASSWORD] in it): " DB_TEMPLATE
[[ "$DB_TEMPLATE" == *"[YOUR-PASSWORD]"* ]] || { echo "Paste the string exactly as Supabase shows it, with [YOUR-PASSWORD]."; exit 1; }
read -r -s -p "5) Database password, hidden: " DB_PASS; echo

# Passwords with @ # / : etc. must be URL-encoded inside a connection string.
DB_PASS_ENC=$(DB_PASS="$DB_PASS" python3 -c 'import os,urllib.parse;print(urllib.parse.quote(os.environ["DB_PASS"],safe=""))')
DB_URL="${DB_TEMPLATE/\[YOUR-PASSWORD\]/$DB_PASS_ENC}"

read -r -p "Phone testing: this machine's Tailscale or LAN IP (blank to skip): " DEV_IP

for f in apps/web/.env.local apps/mobile/.env; do
  [[ -f "$f" ]] && cp "$f" "$f.bak.$(date +%s)" && echo "Backed up existing $f"
done

umask 077
cat > apps/web/.env.local <<EOF
NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL
NEXT_PUBLIC_SUPABASE_ANON_KEY=$ANON_KEY
# Server only. Bypasses RLS. Never prefix with NEXT_PUBLIC_.
SUPABASE_SERVICE_ROLE_KEY=$SECRET_KEY
# Used only to apply migrations (session pooler, port 5432).
MIGRATE_DATABASE_URL=$DB_URL
NEXT_PUBLIC_SITE_URL=http://localhost:3020
DEV_ORIGINS=$DEV_IP
EOF

API_HOST="${DEV_IP:-localhost}"
cat > apps/mobile/.env <<EOF
EXPO_PUBLIC_API_URL=http://$API_HOST:3020
EXPO_PUBLIC_SUPABASE_URL=$SUPABASE_URL
EXPO_PUBLIC_SUPABASE_ANON_KEY=$ANON_KEY
EOF

chmod 600 apps/web/.env.local apps/mobile/.env
echo
echo "Wrote apps/web/.env.local and apps/mobile/.env (readable only by you)."
git check-ignore -q apps/web/.env.local apps/mobile/.env && echo "Confirmed: both files are gitignored."
