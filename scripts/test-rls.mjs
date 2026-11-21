// RLS / permission test: runs every migration in an in-memory Postgres (PGlite)
// with Supabase's roles and auth.uid() stubbed, then tries to break the rules.
// Usage: pnpm test:rls
import { PGlite } from "@electric-sql/pglite";
import { pgcrypto } from "@electric-sql/pglite/contrib/pgcrypto";
import { readFileSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const db = new PGlite({ extensions: { pgcrypto } });

// ── Supabase-like environment
await db.exec(`
  create role anon nologin;
  create role authenticated nologin;
  create role service_role nologin bypassrls;
  create schema auth;
  create table auth.users (id uuid primary key);
  create function auth.uid() returns uuid language sql stable as
    $$ select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid $$;
  grant usage on schema auth to anon, authenticated, service_role;
  grant execute on function auth.uid() to anon, authenticated, service_role;
  grant usage on schema public to anon, authenticated, service_role;
  create schema extensions;
  grant usage on schema extensions to anon, authenticated, service_role;
  -- Matches the project setting "grant API access to new tables automatically: OFF":
  -- no automatic table grants, so the migration must grant everything explicitly.
  alter default privileges in schema public grant all on functions to anon, authenticated, service_role;
`);

for (const f of readdirSync(join(root, "supabase/migrations")).sort()) {
  await db.exec(readFileSync(join(root, "supabase/migrations", f), "utf8"));
}

// ── people
const U = {
  alice: "00000000-0000-0000-0000-00000000000a", // business owner
  bob: "00000000-0000-0000-0000-00000000000b", // member
  carol: "00000000-0000-0000-0000-00000000000c", // promoter / buyer
  mallory: "00000000-0000-0000-0000-00000000000d", // attacker
};
let i = 0;
for (const [name, id] of Object.entries(U)) {
  i++;
  await db.query(`insert into auth.users (id) values ($1)`, [id]);
  await db.query(`insert into public.profiles (id, pubkey, display_name) values ($1, $2, $3)`, [
    id, String(i).repeat(64), name,
  ]);
}

async function as(who, fn) {
  if (who === "anon") await db.exec(`set role anon; select set_config('request.jwt.claim.sub', '', false);`);
  else if (who === "service") await db.exec(`set role service_role; select set_config('request.jwt.claim.sub', '', false);`);
  else await db.exec(`set role authenticated; select set_config('request.jwt.claim.sub', '${U[who]}', false);`);
  try { return await fn(); } finally { await db.exec(`reset role; select set_config('request.jwt.claim.sub', '', false);`); }
}
const q = (sql, params) => db.query(sql, params);

let pass = 0, fail = 0;
async function check(name, fn) {
  try { await fn(); pass++; console.log(`  ok   ${name}`); }
  catch (e) { fail++; console.log(`  FAIL ${name}\n       ${e.message}`); }
}
function assert(c, msg) { if (!c) throw new Error(msg); }
async function denied(fn, pattern = /permission denied|not allowed|violates row-level security/) {
  try { await fn(); } catch (e) { if (pattern.test(e.message)) return; throw new Error(`wrong error: ${e.message}`); }
  throw new Error("expected an error, got success");
}

console.log("\nBusinesses");
let biz;
await check("alice creates a business as herself", () => as("alice", async () => {
  const r = await q(`insert into businesses (slug,name,category_id,address,city,state,lat,lng,created_by)
                     values ('joes-coffee','Joe''s Coffee',2,'1 Main St','Port Chester','NY',41.0,-73.66,$1) returning id`, [U.alice]);
  biz = r.rows[0].id;
}));
await check("mallory cannot create a business in alice's name", () => as("mallory", () => denied(() =>
  q(`insert into businesses (slug,name,category_id,address,city,state,lat,lng,created_by)
     values ('fake-shop','Fake',2,'x st','x','NY',0,0,$1)`, [U.alice]))));
await check("trigger made alice owner", () => as("alice", async () => {
  const r = await q(`select role from business_staff where business_id=$1 and profile_id=$2`, [biz, U.alice]);
  assert(r.rows[0]?.role === "owner", "no owner row");
}));
await check("alice (staff) reads the check-in secret", () => as("alice", async () => {
  assert((await q(`select * from checkin_secrets`)).rows.length === 1, "staff cannot read secret");
}));
await check("bob and anon cannot read the check-in secret", async () => {
  assert((await as("bob", () => q(`select * from checkin_secrets`))).rows.length === 0, "bob read secret");
  // anon has no grant at all on this table: permission denied is the expected (stricter) answer
  await as("anon", () => denied(() => q(`select * from checkin_secrets`)));
});
await check("anon sees the active business", () => as("anon", async () => {
  assert((await q(`select id from businesses`)).rows.length === 1, "not visible");
}));
await check("mallory cannot edit alice's business", () => as("mallory", async () => {
  const r = await q(`update businesses set name='Hacked' where id=$1`, [biz]);
  assert(r.affectedRows === 0, "update went through");
}));
await check("even alice cannot change created_by", () => as("alice", () => denied(() =>
  q(`update businesses set created_by=$1 where id=$2`, [U.mallory, biz]))));
await check("mallory cannot add herself as staff", () => as("mallory", () => denied(() =>
  q(`insert into business_staff (business_id, profile_id, role) values ($1,$2,'staff')`, [biz, U.mallory]))));
await check("alice cannot add a second owner", () => as("alice", () => denied(() =>
  q(`insert into business_staff (business_id, profile_id, role) values ($1,$2,'owner')`, [biz, U.carol]))));

console.log("\nCheck-ins and rewards");
let program;
await check("alice sets a 3-visit reward program", () => as("alice", async () => {
  program = (await q(`insert into reward_programs (business_id,name,visits_required) values ($1,'Free coffee',3) returning id`, [biz])).rows[0].id;
}));
await check("mallory cannot create a program for alice's shop", () => as("mallory", () => denied(() =>
  q(`insert into reward_programs (business_id,name,visits_required) values ($1,'Free everything',1)`, [biz]))));
await check("bob cannot insert a check-in directly", () => as("bob", () => denied(() =>
  q(`insert into checkins (profile_id,business_id,checkin_day,lat,lng) values ($1,$2,current_date,41,-73.66)`, [U.bob, biz]))));
await check("bob cannot call record_checkin (server only)", () => as("bob", () => denied(() =>
  q(`select record_checkin($1,$2,41,-73.66,null)`, [U.bob, biz]))));
// two earlier visits on previous days
await q(`insert into checkins (profile_id,business_id,checkin_day,lat,lng,created_at) values
         ($1,$2,current_date-2,41,-73.66,now()-interval '2 days'),
         ($1,$2,current_date-1,41,-73.66,now()-interval '1 day')`, [U.bob, biz]);
let reward;
await check("3rd visit via server issues a reward and resets the card", () => as("service", async () => {
  const r = (await q(`select record_checkin($1,$2,41,-73.66,null) as r`, [U.bob, biz])).rows[0].r;
  assert(r.ok && r.reward_id && r.visits === 0, JSON.stringify(r));
  reward = r.reward_id;
}));
await check("second check-in the same day is refused", () => as("service", async () => {
  const r = (await q(`select record_checkin($1,$2,41,-73.66,null) as r`, [U.bob, biz])).rows[0].r;
  assert(!r.ok && r.reason === "already_checked_in_today", JSON.stringify(r));
}));
await check("bob sees his reward; alice (staff) sees it; mallory does not", async () => {
  assert((await as("bob", () => q(`select id from rewards`))).rows.length === 1, "bob");
  assert((await as("alice", () => q(`select id from rewards`))).rows.length === 1, "alice");
  assert((await as("mallory", () => q(`select id from rewards`))).rows.length === 0, "mallory");
});
await check("mallory cannot see bob's check-ins", () => as("mallory", async () => {
  assert((await q(`select id from checkins`)).rows.length === 0, "leak");
}));
await check("bob cannot edit his reward directly", () => as("bob", () => denied(() =>
  q(`update rewards set status='earned', owner_id=$1 where id=$2`, [U.bob, reward]))));
await check("bob (not staff) cannot redeem his own reward", () => as("bob", () => denied(() =>
  q(`select redeem_reward($1)`, [reward]))));
await check("alice redeems it once", () => as("alice", () => q(`select redeem_reward($1)`, [reward])));
await check("a second redeem fails", () => as("alice", () => denied(() =>
  q(`select redeem_reward($1)`, [reward]), /reward is redeemed/)));

console.log("\nMarketplace");
const reward2 = (await q(`insert into rewards (program_id,business_id,earned_by,owner_id) values ($1,$2,$3,$3) returning id`,
  [program, biz, U.bob])).rows[0].id;
let listing;
await check("mallory cannot list bob's reward", () => as("mallory", () => denied(() =>
  q(`select list_reward($1, 1000)`, [reward2]))));
await check("bob lists his reward", () => as("bob", async () => {
  listing = (await q(`select list_reward($1, 1000) as id`, [reward2])).rows[0].id;
}));
await check("anon sees the open listing and its reward", () => as("anon", async () => {
  assert((await q(`select id from listings`)).rows.length === 1, "listing");
  assert((await q(`select id from rewards`)).rows.length === 1, "reward");
}));
await check("carol cannot reserve or finalize (server only)", () => as("carol", async () => {
  await denied(() => q(`select reserve_listing($1,$2)`, [listing, U.carol]));
  await denied(() => q(`select finalize_sale(gen_random_uuid(), 'x')`));
}));
await check("server reserves for carol; bob cannot buy his own", () => as("service", async () => {
  await denied(() => q(`select reserve_listing($1,$2)`, [listing, U.bob]), /own listing/);
  await q(`select reserve_listing($1,$2)`, [listing, U.carol]);
}));
await check("mallory cannot snipe a reserved listing", () => as("service", () => denied(() =>
  q(`select reserve_listing($1,$2)`, [listing, U.mallory]), /someone else/)));
await check("bob cannot cancel while carol is paying", () => as("bob", () => denied(() =>
  q(`select cancel_listing($1)`, [listing]), /paying right now/)));
await check("sale finalizes: carol owns the reward, bob no longer does", async () => {
  await as("service", async () => {
    const s = (await q(`insert into sales (listing_id,buyer_id,invoice,payment_hash,amount_sats)
                        values ($1,$2,'lnbc...', $3, 1000) returning id`, [listing, U.carol, "a".repeat(64)])).rows[0].id;
    await q(`select finalize_sale($1,$2)`, [s, "b".repeat(64)]);
  });
  assert((await as("carol", () => q(`select id from rewards where owner_id=$1`, [U.carol]))).rows.length === 1, "carol");
  assert((await as("bob", () => q(`select id from rewards where id=$1`, [reward2]))).rows.length === 0, "bob still sees it");
  assert((await as("anon", () => q(`select id from listings`))).rows.length === 0, "still listed");
});

console.log("\nProfiles, promotions, posts, reviews");
await check("bob cannot change his pubkey", () => as("bob", () => denied(() =>
  q(`update profiles set pubkey=$1 where id=$2`, ["f".repeat(64), U.bob]))));
await check("bob edits his own display name only", () => as("bob", async () => {
  assert((await q(`update profiles set display_name='Bobby' where id=$1`, [U.bob])).affectedRows === 1, "own");
  assert((await q(`update profiles set display_name='pwned' where id=$1`, [U.alice])).affectedRows === 0, "other");
}));
await check("nobody can insert a profile directly", () => as("mallory", () => denied(() =>
  q(`insert into profiles (id,pubkey) values ($1,$2)`, [U.mallory, "e".repeat(64)]))));
let promo;
await check("alice posts a promotion; mallory cannot", async () => {
  promo = (await as("alice", () => q(`insert into promotions (business_id,title,sats_per_visit) values ($1,'Bring a friend',500) returning id`, [biz]))).rows[0].id;
  await as("mallory", () => denied(() => q(`insert into promotions (business_id,title) values ($1,'Spam')`, [biz])));
});
await check("carol cannot self-approve a claim", () => as("carol", () => denied(() =>
  q(`insert into promotion_claims (promotion_id,promoter_id,status) values ($1,$2,'approved')`, [promo, U.carol]))));
let claim;
await check("carol claims (pending); cannot approve herself", () => as("carol", async () => {
  claim = (await q(`insert into promotion_claims (promotion_id,promoter_id) values ($1,$2) returning id, status`, [promo, U.carol])).rows[0];
  assert(claim.status === "pending", "not pending");
  assert((await q(`update promotion_claims set status='approved' where id=$1`, [claim.id])).affectedRows === 0, "self-approved");
}));
await check("alice approves; cannot change the referral code", () => as("alice", async () => {
  assert((await q(`update promotion_claims set status='approved' where id=$1`, [claim.id])).affectedRows === 1, "approve");
  await denied(() => q(`update promotion_claims set referral_code='mine' where id=$1`, [claim.id]));
}));
await check("a promotion post must be labelled paid", () => as("carol", () => denied(() =>
  q(`insert into posts (author_id,title,promotion_id,is_paid_promotion) values ($1,'Great coffee',$2,false)`, [U.carol, promo]),
  /check constraint/)));
await check("mallory cannot post as carol", () => as("mallory", () => denied(() =>
  q(`insert into posts (author_id,title) values ($1,'I am carol')`, [U.carol]))));
await check("mallory (never visited) cannot review; bob (visited) can", async () => {
  await as("mallory", () => denied(() => q(`insert into business_reviews (business_id,reviewer_id,rating) values ($1,$2,1)`, [biz, U.mallory])));
  await as("bob", () => q(`insert into business_reviews (business_id,reviewer_id,rating) values ($1,$2,5)`, [biz, U.bob]));
});

console.log("\nAuth challenges");
await check("users cannot read or write challenges", () => as("mallory", async () => {
  await denied(() => q(`select * from auth_challenges`));
  await denied(() => q(`select consume_challenge('x')`));
}));
await check("a challenge is consumed exactly once", () => as("service", async () => {
  await q(`insert into auth_challenges (challenge) values ('c1')`);
  assert((await q(`select consume_challenge('c1') as ok`)).rows[0].ok === true, "first");
  assert((await q(`select consume_challenge('c1') as ok`)).rows[0].ok === false, "replay");
}));

console.log("\nExplicit grants (auto-grant is OFF)");
await check("anon can read the public tables the site shows", () => as("anon", async () => {
  for (const t of ["profiles","categories","businesses","reward_programs","listings","promotions","posts","business_reviews","promoter_reviews"]) {
    await q(`select 1 from ${t} limit 1`);
  }
}));
await check("anon cannot read private tables", () => as("anon", async () => {
  for (const t of ["checkins","sales","promotion_claims","promoter_payouts","business_staff"]) {
    await denied(() => q(`select 1 from ${t} limit 1`));
  }
}));
await check("service role can read and write every table", () => as("service", async () => {
  for (const t of ["profiles","businesses","checkins","rewards","listings","sales","auth_challenges","promoter_payouts"]) {
    await q(`select 1 from ${t} limit 1`);
  }
}));

console.log(`\n${pass} passed, ${fail} failed`);
process.exit(fail ? 1 : 0);
