// Fails if a secret-looking variable is exposed to the browser via NEXT_PUBLIC_ / EXPO_PUBLIC_.
// (The legacy app shipped NEXT_PUBLIC_AES_SECRET_KEY. Never again.)
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const BAD = /(NEXT|EXPO)_PUBLIC_[A-Z0-9_]*(SECRET|SERVICE_ROLE|PRIVATE|ADMIN|PASSWORD|NSEC|MNEMONIC)/;
const SKIP = new Set(["node_modules", ".next", ".git", ".expo", "dist", ".turbo"]);
const hits = [];

function walk(dir) {
  for (const name of readdirSync(dir)) {
    if (SKIP.has(name)) continue;
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p);
    else if (/\.(ts|tsx|js|mjs|json)$|^\.env/.test(name)) {
      readFileSync(p, "utf8").split("\n").forEach((line, i) => {
        if (BAD.test(line) && !p.endsWith("check-public-env.mjs")) hits.push(`${p}:${i + 1}: ${line.trim()}`);
      });
    }
  }
}
walk(new URL("..", import.meta.url).pathname);
if (hits.length) {
  console.error("Secret-looking public env vars found:\n" + hits.join("\n"));
  process.exit(1);
}
console.log("ok: no secrets exposed through public env vars");
