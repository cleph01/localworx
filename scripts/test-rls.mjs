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

console.log("\nHonor pledge");
await check("alice cannot start a punch card before signing the honor pledge", () => as("alice", () => denied(() =>
  q(`insert into reward_programs (business_id,name,visits_required) values ($1,'Free coffee',3)`, [biz]))));
await check("alice cannot set the pledge date directly", () => as("alice", () => denied(() =>
  q(`update businesses set honor_pledge_at=now() where id=$1`, [biz]))));
await check("mallory cannot sign alice's pledge", () => as("mallory", () => denied(() =>
  q(`select sign_honor_pledge($1)`, [biz]))));
await check("alice (owner) signs the pledge", () => as("alice", async () => {
  assert((await q(`select sign_honor_pledge($1) as at`, [biz])).rows[0].at, "no date");
  assert((await q(`select has_pledged($1) as ok`, [biz])).rows[0].ok === true, "not pledged");
}));

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
await check("a scan inside the shop's gap (default 3 h) is refused with a wait time", () => as("service", async () => {
  const r = (await q(`select record_checkin($1,$2,41,-73.66,null) as r`, [U.bob, biz])).rows[0].r;
  assert(!r.ok && r.reason === "too_soon" && r.wait_minutes > 170 && r.wait_minutes <= 180, JSON.stringify(r));
}));
await check("a second visit the same day counts once the gap has passed", () => as("service", async () => {
  await q(`update checkins set created_at = now() - interval '3 hours 1 minute' where profile_id = $1 and business_id = $2 and created_at > now() - interval '1 minute'`, [U.bob, biz]);
  const r = (await q(`select record_checkin($1,$2,41,-73.66,null) as r`, [U.bob, biz])).rows[0].r;
  assert(r.ok && r.visits === 1, JSON.stringify(r));
}));
await check("alice (owner) sets a 1 h gap and a 150 m radius", () => as("alice", async () => {
  const r = await q(`update businesses set checkin_cooldown_minutes = 60, checkin_radius_m = 150 where id = $1 returning id`, [biz]);
  assert(r.rows.length === 1);
}));
await check("radius above 250 m or gap under 15 min is rejected", () => as("alice", async () => {
  await denied(() => q(`update businesses set checkin_radius_m = 1000 where id = $1`, [biz]), /check constraint/);
  await denied(() => q(`update businesses set checkin_cooldown_minutes = 1 where id = $1`, [biz]), /check constraint/);
}));
await check("mallory cannot change alice's check-in rules", () => as("mallory", async () => {
  const r = await q(`update businesses set checkin_radius_m = 250 where id = $1 returning id`, [biz]);
  assert(r.rows.length === 0, "update should match no rows");
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
await check("a promotion post must be labelled paid (even from the server)", () => as("service", () => denied(() =>
  q(`insert into posts (author_id,title,promotion_id,is_paid_promotion) values ($1,'Great coffee',$2,false)`, [U.carol, promo]),
  /check constraint/)));
await check("users cannot insert posts directly, not even as themselves (server checks fee + signature)", async () => {
  await as("carol", () => denied(() => q(`insert into posts (author_id,title) values ($1,'Skip the fee')`, [U.carol])));
  await as("mallory", () => denied(() => q(`insert into posts (author_id,title) values ($1,'I am carol')`, [U.carol])));
});
await check("mallory (never visited) cannot review; bob (visited) can", async () => {
  await as("mallory", () => denied(() => q(`insert into business_reviews (business_id,reviewer_id,rating) values ($1,$2,1)`, [biz, U.mallory])));
  await as("bob", () => q(`insert into business_reviews (business_id,reviewer_id,rating) values ($1,$2,5)`, [biz, U.bob]));
});

console.log("\nIn-kind promoter payouts (IOUs)");
await check("a promotion that pays nothing is refused", () => as("alice", () => denied(() =>
  q(`insert into promotions (business_id,title,sats_per_visit) values ($1,'Free exposure',0)`, [biz]))));
let kindPromo, kindClaim, iou;
await check("alice posts an in-kind promotion: a free haircut every 2 referred visits", () => as("alice", async () => {
  kindPromo = (await q(`insert into promotions (business_id,title,inkind_item,inkind_visits) values ($1,'Send me regulars','Free haircut',2) returning id`, [biz])).rows[0].id;
}));
await as("carol", async () => {
  kindClaim = (await q(`insert into promotion_claims (promotion_id,promoter_id) values ($1,$2) returning id`, [kindPromo, U.carol])).rows[0].id;
});
await as("alice", () => q(`update promotion_claims set status='approved' where id=$1`, [kindClaim]));
const kindRef = (await q(`select referral_code from promotion_claims where id=$1`, [kindClaim])).rows[0].referral_code;
await q(`update checkins set created_at = created_at - interval '1 day'`); // clear everyone's check-in gap
await check("carol's own visit through her link earns her nothing", () => as("service", async () => {
  const r = (await q(`select record_checkin($1,$2,41,-73.66,$3) as r`, [U.carol, biz, kindRef])).rows[0].r;
  assert(r.ok && !r.promoter_reward_id, JSON.stringify(r));
  const c = (await q(`select referral_code from checkins where id=$1`, [r.checkin_id])).rows[0];
  assert(c.referral_code === null, "self-referral was credited");
}));
await check("1st referred visit: no IOU yet; 2nd: carol gets a 'Free haircut' IOU", () => as("service", async () => {
  const r1 = (await q(`select record_checkin($1,$2,41,-73.66,$3) as r`, [U.bob, biz, kindRef])).rows[0].r;
  assert(r1.ok && !r1.promoter_reward_id, JSON.stringify(r1));
  const r2 = (await q(`select record_checkin($1,$2,41,-73.66,$3) as r`, [U.mallory, biz, kindRef])).rows[0].r;
  assert(r2.ok && r2.promoter_reward_id, JSON.stringify(r2));
  iou = r2.promoter_reward_id;
  const row = (await q(`select kind, owner_id, title from rewards where id=$1`, [iou])).rows[0];
  assert(row.kind === "promoter_payout" && row.owner_id === U.carol && row.title === "Free haircut", JSON.stringify(row));
}));
await check("a referral code from another shop's promotion is ignored", () => as("service", async () => {
  await q(`update checkins set created_at = created_at - interval '1 day'`);
  const r = (await q(`select record_checkin($1,$2,41,-73.66,'not-a-real-code') as r`, [U.bob, biz])).rows[0].r;
  assert(r.ok && !r.promoter_reward_id, JSON.stringify(r));
}));
await check("carol sees her IOU and can sell it on the marketplace", () => as("carol", async () => {
  assert((await q(`select id from rewards where id=$1`, [iou])).rows.length === 1, "hidden");
  const l = (await q(`select list_reward($1, 5000) as id`, [iou])).rows[0].id;
  await q(`select cancel_listing($1)`, [l]);
}));

console.log("\nReferrals stick to the person");
const gap = () => q(`update checkins set created_at = created_at - interval '1 day'`);
const bobRef = () => q(`select claim_id, referred_at from referrals where member_id=$1 and business_id=$2`, [U.bob, biz]).then((r) => r.rows[0]);
await check("bob's first visit with carol's link saved the referral on his account", async () => {
  const r = await bobRef();
  assert(r && r.claim_id === kindClaim, JSON.stringify(r));
});
await check("bob scans with no link (the app, another browser) and carol is still credited", () => as("service", async () => {
  await gap();
  const r = (await q(`select record_checkin($1,$2,41,-73.66,null) as r`, [U.bob, biz])).rows[0].r;
  assert(r.ok && r.referred_by === U.carol, JSON.stringify(r));
  const c = (await q(`select referral_code from checkins where id=$1`, [r.checkin_id])).rows[0];
  assert(c.referral_code === kindRef, "check-in not tagged with carol's code");
}));
await check("re-sending the same cookie doesn't restart the 30 days", () => as("service", async () => {
  await q(`update referrals set referred_at = now() - interval '10 days' where member_id=$1`, [U.bob]);
  await gap();
  await q(`select record_checkin($1,$2,41,-73.66,$3)`, [U.bob, biz, kindRef]);
  const r = await bobRef();
  assert(new Date(r.referred_at) < new Date(Date.now() - 9 * 864e5), "window restarted");
}));
await check("after 30 days, bob's visits stop crediting carol", () => as("service", async () => {
  await q(`update referrals set referred_at = now() - interval '31 days' where member_id=$1`, [U.bob]);
  await gap();
  const r = (await q(`select record_checkin($1,$2,41,-73.66,null) as r`, [U.bob, biz])).rows[0].r;
  assert(r.ok && !r.referred_by, JSON.stringify(r));
}));
await check("opening carol's link again restarts the 30 days", () => as("service", async () => {
  assert((await q(`select record_referral($1,$2) as b`, [U.bob, kindRef])).rows[0].b === biz, "not recorded");
  await gap();
  const r = (await q(`select record_checkin($1,$2,41,-73.66,null) as r`, [U.bob, biz])).rows[0].r;
  assert(r.referred_by === U.carol, JSON.stringify(r));
}));
await check("nobody can refer themselves", () => as("service", async () => {
  assert((await q(`select record_referral($1,$2) as b`, [U.carol, kindRef])).rows[0].b === null, "self-referral saved");
  assert((await q(`select 1 from referrals where member_id=$1`, [U.carol])).rows.length === 0, "row exists");
}));
let malloryClaim;
await check("the newest promoter link wins", async () => {
  await as("mallory", async () => {
    malloryClaim = (await q(`insert into promotion_claims (promotion_id,promoter_id) values ($1,$2) returning id`, [kindPromo, U.mallory])).rows[0].id;
  });
  await as("alice", () => q(`update promotion_claims set status='approved' where id=$1`, [malloryClaim]));
  const mRef = (await q(`select referral_code from promotion_claims where id=$1`, [malloryClaim])).rows[0].referral_code;
  await as("service", () => q(`select record_referral($1,$2)`, [U.bob, mRef]));
  assert((await bobRef()).claim_id === malloryClaim, "carol still credited");
});
await check("bob, his referring promoter and the shop see the referral; carol (replaced) does not", async () => {
  for (const who of ["bob", "mallory", "alice"]) {
    const n = await as(who, () => q(`select 1 from referrals where member_id=$1`, [U.bob]));
    assert(n.rows.length === 1, `${who} can't see it`);
  }
  const n = await as("carol", () => q(`select 1 from referrals where member_id=$1`, [U.bob]));
  assert(n.rows.length === 0, "carol can see it");
});
await check("members can't write referrals or call record_referral", () => as("bob", async () => {
  await denied(() => q(`insert into referrals (member_id,business_id,claim_id) values ($1,$2,$3)`, [U.bob, biz, kindClaim]));
  await denied(() => q(`update referrals set referred_at = now() where member_id=$1`, [U.bob]));
  await denied(() => q(`select record_referral($1,$2)`, [U.bob, kindRef]));
}));
await as("service", () => q(`select record_referral($1,$2)`, [U.bob, kindRef])); // back to carol for the tests below
await check("the shop page can name the promoter behind a link, only for that shop's codes", () => as("anon", async () => {
  assert((await q(`select referrer_name($1,$2) as n`, [kindRef, biz])).rows[0].n === "carol", "no name");
  assert((await q(`select referrer_name('not-a-real-code',$1) as n`, [biz])).rows[0].n === null, "named a fake code");
}));
await check("bob sees who referred him and until when; anon can't ask", async () => {
  const r = (await as("bob", () => q(`select * from my_referral($1)`, [biz]))).rows[0];
  assert(r && r.promoter_name === "carol" && new Date(r.counts_until) > new Date(Date.now() + 29 * 864e5), JSON.stringify(r));
  await as("anon", () => denied(() => q(`select * from my_referral($1)`, [biz])));
});


console.log("\nHonor reports and the unpaid-IOU badge");
let report;
await check("mallory cannot report carol's IOU", () => as("mallory", () => denied(() =>
  q(`select report_unhonored($1,'nope')`, [iou]))));
await check("carol reports the shop refused her IOU; a second report on it is refused", () => as("carol", async () => {
  report = (await q(`select report_unhonored($1,'They said the deal ended') as id`, [iou])).rows[0].id;
  await denied(() => q(`select report_unhonored($1,'again')`, [iou]), /already reported/);
}));
await check("nobody writes honor reports directly", async () => {
  await as("carol", () => denied(() => q(`insert into honor_reports (reward_id,business_id,reporter_id) values ($1,$2,$3)`, [iou, biz, U.carol])));
  await as("alice", () => denied(() => q(`update honor_reports set resolved_at=now(), resolution='dismissed' where id=$1`, [report])));
});
await check("alice (staff) and carol see the report; mallory does not", async () => {
  assert((await as("alice", () => q(`select id from honor_reports`))).rows.length === 1, "alice");
  assert((await as("carol", () => q(`select id from honor_reports`))).rows.length === 1, "carol");
  assert((await as("mallory", () => q(`select id from honor_reports`))).rows.length === 0, "mallory");
});
await check("no badge during the 7-day grace period", () => as("anon", async () => {
  assert((await q(`select * from unhonored_businesses()`)).rows.length === 0, "badge too early");
}));
await check("alice cannot close the report, even by marking the IOU used", () => as("alice", async () => {
  await denied(() => q(`select close_honor_report($1)`, [report]));
  await q(`select redeem_reward($1)`, [iou]);
  const r = (await q(`select resolved_at from honor_reports where id=$1`, [report])).rows[0];
  assert(r.resolved_at === null, "redeeming closed the report");
}));
await check("after 7 days the shop shows the badge to everyone", async () => {
  await q(`update honor_reports set created_at = now() - interval '8 days' where id=$1`, [report]);
  const rows = (await as("anon", () => q(`select * from unhonored_businesses()`))).rows;
  assert(rows.length === 1 && rows[0].business_id === biz && rows[0].open_reports === 1, JSON.stringify(rows));
});
await check("carol says it was made right: the badge goes away", async () => {
  await as("carol", () => q(`select close_honor_report($1)`, [report]));
  assert((await as("anon", () => q(`select * from unhonored_businesses()`))).rows.length === 0, "badge stayed");
});

console.log("\nCommunity posts, fees and tips");
let draft, live, payment, tip;
await as("service", async () => {
  draft = (await q(`insert into posts (author_id,title,status) values ($1,'Awaiting fee','awaiting_payment') returning id`, [U.carol])).rows[0].id;
  live = (await q(`insert into posts (author_id,title,published_at) values ($1,'Best tacos in town',now()) returning id`, [U.carol])).rows[0].id;
  payment = (await q(`insert into post_payments (post_id,payer_id,method,amount,invoice,payment_hash) values ($1,$2,'sats',1000,'lnbc1',$3) returning id`,
    [draft, U.carol, "a".repeat(64)])).rows[0].id;
  tip = (await q(`insert into post_tips (post_id,tipper_id,amount_sats,invoice,payment_hash) values ($1,$2,210,'lnbc2',$3) returning id`,
    [live, U.bob, "b".repeat(64)])).rows[0].id;
});
await check("anon sees the published post, not the one awaiting its fee", () => as("anon", async () => {
  const ids = (await q(`select id from posts where id in ($1,$2)`, [draft, live])).rows.map((r) => r.id);
  assert(ids.includes(live) && !ids.includes(draft), JSON.stringify(ids));
}));
await check("carol sees her own draft", () => as("carol", async () => {
  assert((await q(`select 1 from posts where id=$1`, [draft])).rows.length === 1, "own draft hidden");
}));
await check("carol cannot publish her draft or edit her post or tip totals", () => as("carol", async () => {
  await denied(() => q(`update posts set status='published' where id=$1`, [draft]));
  await denied(() => q(`update posts set tips_sats=1000000 where id=$1`, [live]));
}));
await check("only the server marks a fee paid or settles a tip", async () => {
  await as("carol", () => denied(() => q(`select mark_post_paid($1)`, [payment])));
  await as("bob", () => denied(() => q(`select settle_post_tip($1,'x')`, [tip])));
  await as("carol", () => denied(() => q(`insert into post_tips (post_id,tipper_id,amount_sats,invoice,payment_hash) values ($1,$2,5,'x',$3)`, [live, U.carol, "c".repeat(64)])));
});
await check("fee paid → post published", () => as("service", async () => {
  await q(`select mark_post_paid($1)`, [payment]);
  const p = (await q(`select status, published_at from posts where id=$1`, [draft])).rows[0];
  assert(p.status === "published" && p.published_at, JSON.stringify(p));
}));
await check("a tip settles once and adds to the post total", () => as("service", async () => {
  assert((await q(`select settle_post_tip($1,'pre') as ok`, [tip])).rows[0].ok === true, "first");
  assert((await q(`select settle_post_tip($1,'pre') as ok`, [tip])).rows[0].ok === false, "replay");
  const p = (await q(`select tips_sats, tips_count from posts where id=$1`, [live])).rows[0];
  assert(Number(p.tips_sats) === 210 && p.tips_count === 1, JSON.stringify(p));
}));
await check("tips and fees are private: tipper and author see the tip, mallory sees nothing", async () => {
  await as("bob", async () => assert((await q(`select 1 from post_tips where id=$1`, [tip])).rows.length === 1, "tipper"));
  await as("carol", async () => assert((await q(`select 1 from post_tips where id=$1`, [tip])).rows.length === 1, "author"));
  await as("mallory", async () => {
    assert((await q(`select 1 from post_tips`)).rows.length === 0, "tips leak");
    assert((await q(`select 1 from post_payments`)).rows.length === 0, "payments leak");
  });
  await as("anon", () => denied(() => q(`select 1 from post_tips`)));
});
await check("carol can delete her own post; mallory cannot", async () => {
  await as("mallory", async () => assert((await q(`delete from posts where id=$1`, [live])).affectedRows === 0, "mallory deleted"));
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
  for (const t of ["checkins","sales","promotion_claims","promoter_payouts","business_staff","honor_reports","referrals"]) {
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
