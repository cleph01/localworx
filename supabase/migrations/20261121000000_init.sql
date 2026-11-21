-- LocalWorx v2 — initial schema
-- Rules of the road:
--   * RLS is ON for every table. No table is readable or writable without a policy.
--   * Writes that need business rules (check-ins, rewards, sales) go through
--     SECURITY DEFINER functions. Functions marked "server only" are executable
--     by service_role alone; the API calls them after its own verification.
--   * No table stores a wallet secret or a Nostr private key. Ever.

-- Supabase keeps extensions in the `extensions` schema; reference them by that name.
create schema if not exists extensions;
create extension if not exists pgcrypto with schema extensions;

-- ─────────────────────────────────────────────────────────────── profiles
create table public.profiles (
  id                uuid primary key references auth.users(id) on delete cascade,
  pubkey            text not null unique check (pubkey ~ '^[0-9a-f]{64}$'),
  display_name      text not null default '' check (char_length(display_name) <= 50),
  about             text check (char_length(about) <= 500),
  picture_url       text check (picture_url ~ '^https://'),
  lightning_address text check (lightning_address ~ '^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$'),
  created_at        timestamptz not null default now()
);
alter table public.profiles enable row level security;
create policy profiles_read on public.profiles for select using (true);
create policy profiles_update_self on public.profiles for update
  using (id = auth.uid()) with check (id = auth.uid());
-- Profiles are created by the server at first sign-in. Users may edit only these columns.
revoke insert, update, delete on public.profiles from anon, authenticated;
grant update (display_name, about, picture_url, lightning_address) on public.profiles to authenticated;

-- ─────────────────────────────────────────────────────────────── categories
create table public.categories (
  id   serial primary key,
  name text not null unique,
  slug text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$')
);
alter table public.categories enable row level security;
create policy categories_read on public.categories for select using (true);
revoke insert, update, delete on public.categories from anon, authenticated;

-- ─────────────────────────────────────────────────────────────── businesses
create table public.businesses (
  id                uuid primary key default gen_random_uuid(),
  slug              text not null unique check (slug ~ '^[a-z0-9]+(-[a-z0-9]+)*$' and char_length(slug) between 3 and 60),
  name              text not null check (char_length(name) between 2 and 80),
  description       text not null default '' check (char_length(description) <= 2000),
  category_id       int not null references public.categories(id),
  address           text not null,
  city              text not null,
  state             text not null,
  lat               double precision not null check (lat between -90 and 90),
  lng               double precision not null check (lng between -180 and 180),
  phone             text,
  website           text check (website ~ '^https?://'),
  logo_url          text check (logo_url ~ '^https://'),
  lightning_address text check (lightning_address ~ '^[a-z0-9._+-]+@[a-z0-9.-]+\.[a-z]{2,}$'),
  hiring_promoters  boolean not null default false,
  is_active         boolean not null default true,
  created_by        uuid not null references public.profiles(id),
  created_at        timestamptz not null default now()
);
create index businesses_city_idx on public.businesses (lower(city));
create index businesses_category_idx on public.businesses (category_id);

create table public.business_staff (
  business_id uuid not null references public.businesses(id) on delete cascade,
  profile_id  uuid not null references public.profiles(id) on delete cascade,
  role        text not null check (role in ('owner', 'staff')),
  created_at  timestamptz not null default now(),
  primary key (business_id, profile_id)
);

-- Helpers used by policies. SECURITY DEFINER so they can read business_staff
-- without recursing through its own RLS.
create function public.is_staff(b uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.business_staff
                 where business_id = b and profile_id = auth.uid());
$$;
create function public.is_owner(b uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.business_staff
                 where business_id = b and profile_id = auth.uid() and role = 'owner');
$$;

alter table public.businesses enable row level security;
create policy businesses_read on public.businesses for select
  using (is_active or public.is_staff(id));
create policy businesses_insert on public.businesses for insert to authenticated
  with check (created_by = auth.uid());
create policy businesses_update on public.businesses for update to authenticated
  using (public.is_staff(id)) with check (public.is_staff(id));
revoke update, delete on public.businesses from anon, authenticated;
grant update (name, description, category_id, address, city, state, lat, lng, phone,
              website, logo_url, lightning_address, hiring_promoters, is_active)
  on public.businesses to authenticated;

alter table public.business_staff enable row level security;
create policy staff_read on public.business_staff for select
  using (profile_id = auth.uid() or public.is_staff(business_id));
create policy staff_owner_insert on public.business_staff for insert to authenticated
  with check (public.is_owner(business_id) and role = 'staff');
create policy staff_owner_delete on public.business_staff for delete to authenticated
  using (public.is_owner(business_id) and role = 'staff');
revoke update on public.business_staff from anon, authenticated;

-- Secret behind the rotating counter QR. Staff devices read it to draw the code.
create table public.checkin_secrets (
  business_id uuid primary key references public.businesses(id) on delete cascade,
  secret_hex  text not null default encode(extensions.gen_random_bytes(32), 'hex'),
  rotated_at  timestamptz not null default now()
);
alter table public.checkin_secrets enable row level security;
create policy secrets_staff_read on public.checkin_secrets for select
  using (public.is_staff(business_id));
revoke insert, update, delete on public.checkin_secrets from anon, authenticated;

-- New business: creator becomes owner, a check-in secret is minted.
create function public.on_business_created() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.business_staff (business_id, profile_id, role)
    values (new.id, new.created_by, 'owner');
  insert into public.checkin_secrets (business_id) values (new.id);
  return new;
end $$;
create trigger business_created after insert on public.businesses
  for each row execute function public.on_business_created();

-- Owner can rotate the secret (e.g. after a staff member leaves).
create function public.rotate_checkin_secret(b uuid) returns void
language plpgsql security definer set search_path = public as $$
begin
  if not public.is_owner(b) then raise exception 'not owner' using errcode = '42501'; end if;
  update public.checkin_secrets
     set secret_hex = encode(extensions.gen_random_bytes(32), 'hex'), rotated_at = now()
   where business_id = b;
end $$;

-- ─────────────────────────────────────────────────────────────── rewards
create table public.reward_programs (
  id              uuid primary key default gen_random_uuid(),
  business_id     uuid not null references public.businesses(id) on delete cascade,
  name            text not null check (char_length(name) between 2 and 80),
  description     text not null default '' check (char_length(description) <= 500),
  visits_required int not null check (visits_required between 1 and 100),
  is_active       boolean not null default true,
  created_at      timestamptz not null default now()
);
create unique index one_active_program on public.reward_programs (business_id) where is_active;
alter table public.reward_programs enable row level security;
create policy programs_read on public.reward_programs for select
  using (is_active or public.is_staff(business_id));
create policy programs_staff_insert on public.reward_programs for insert to authenticated
  with check (public.is_staff(business_id));
create policy programs_staff_update on public.reward_programs for update to authenticated
  using (public.is_staff(business_id)) with check (public.is_staff(business_id));
revoke delete on public.reward_programs from anon, authenticated;

create table public.rewards (
  id          uuid primary key default gen_random_uuid(),
  program_id  uuid not null references public.reward_programs(id),
  business_id uuid not null references public.businesses(id),
  earned_by   uuid not null references public.profiles(id),
  owner_id    uuid not null references public.profiles(id),
  status      text not null default 'earned' check (status in ('earned', 'listed', 'redeemed')),
  issued_at   timestamptz not null default now(),
  redeemed_at timestamptz
);
create index rewards_owner_idx on public.rewards (owner_id);
alter table public.rewards enable row level security;
create policy rewards_read on public.rewards for select
  using (owner_id = auth.uid() or public.is_staff(business_id));
-- No write policies: rewards change only through the functions below.
revoke insert, update, delete on public.rewards from anon, authenticated;

-- ─────────────────────────────────────────────────────────────── check-ins
create table public.checkins (
  id            uuid primary key default gen_random_uuid(),
  profile_id    uuid not null references public.profiles(id),
  business_id   uuid not null references public.businesses(id),
  checkin_day   date not null,
  lat           double precision not null,
  lng           double precision not null,
  referral_code text,
  created_at    timestamptz not null default now(),
  unique (profile_id, business_id, checkin_day)
);
alter table public.checkins enable row level security;
create policy checkins_read on public.checkins for select
  using (profile_id = auth.uid() or public.is_staff(business_id));
revoke insert, update, delete on public.checkins from anon, authenticated;

-- Server only: the API has already verified the rotating code and distance.
-- Records the visit, then issues a reward when the punch card fills.
create function public.record_checkin(
  p_profile uuid, p_business uuid, p_lat double precision, p_lng double precision, p_ref text
) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  v_checkin uuid;
  v_program public.reward_programs%rowtype;
  v_since   timestamptz;
  v_visits  int := 0;
  v_reward  uuid;
begin
  begin
    insert into public.checkins (profile_id, business_id, checkin_day, lat, lng, referral_code)
      values (p_profile, p_business, (now() at time zone 'utc')::date, p_lat, p_lng, p_ref)
      returning id into v_checkin;
  exception when unique_violation then
    return jsonb_build_object('ok', false, 'reason', 'already_checked_in_today');
  end;

  select * into v_program from public.reward_programs
   where business_id = p_business and is_active;
  if found then
    select coalesce(max(issued_at), '-infinity') into v_since from public.rewards
     where program_id = v_program.id and earned_by = p_profile;
    select count(*) into v_visits from public.checkins
     where profile_id = p_profile and business_id = p_business and created_at > v_since;
    if v_visits >= v_program.visits_required then
      insert into public.rewards (program_id, business_id, earned_by, owner_id)
        values (v_program.id, p_business, p_profile, p_profile)
        returning id into v_reward;
      v_visits := 0;
    end if;
  end if;

  return jsonb_build_object(
    'ok', true, 'checkin_id', v_checkin, 'reward_id', v_reward,
    'visits', v_visits, 'visits_required', v_program.visits_required,
    'program_name', v_program.name);
end $$;

-- Staff scan a member's reward and mark it used. Works once.
create function public.redeem_reward(p_reward uuid) returns void
language plpgsql security definer set search_path = public as $$
declare v public.rewards%rowtype;
begin
  select * into v from public.rewards where id = p_reward for update;
  if not found or not public.is_staff(v.business_id) then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if v.status <> 'earned' then
    raise exception 'reward is %', v.status using errcode = 'P0001';
  end if;
  update public.rewards set status = 'redeemed', redeemed_at = now() where id = p_reward;
end $$;

-- ─────────────────────────────────────────────────────────────── marketplace
create table public.listings (
  id             uuid primary key default gen_random_uuid(),
  reward_id      uuid not null references public.rewards(id),
  seller_id      uuid not null references public.profiles(id),
  price_sats     int not null check (price_sats between 1 and 10000000),
  status         text not null default 'open' check (status in ('open', 'sold', 'cancelled')),
  reserved_by    uuid references public.profiles(id),
  reserved_until timestamptz,
  buyer_id       uuid references public.profiles(id),
  created_at     timestamptz not null default now(),
  sold_at        timestamptz
);
create unique index one_open_listing on public.listings (reward_id) where status = 'open';
alter table public.listings enable row level security;
create policy listings_read on public.listings for select
  using (status = 'open' or seller_id = auth.uid() or buyer_id = auth.uid());
revoke insert, update, delete on public.listings from anon, authenticated;
-- Anyone can see a reward that is up for sale (so buyers know what they're getting).
create policy rewards_read_listed on public.rewards for select
  using (exists (select 1 from public.listings l
                 where l.reward_id = rewards.id and l.status = 'open'));

create table public.sales (
  id           uuid primary key default gen_random_uuid(),
  listing_id   uuid not null references public.listings(id),
  buyer_id     uuid not null references public.profiles(id),
  invoice      text not null,
  verify_url   text, -- LUD-21: lets the server confirm payment without the buyer's help
  payment_hash text not null unique check (payment_hash ~ '^[0-9a-f]{64}$'),
  amount_sats  int not null,
  preimage     text,
  created_at   timestamptz not null default now(),
  settled_at   timestamptz
);
alter table public.sales enable row level security;
create policy sales_read on public.sales for select
  using (buyer_id = auth.uid()
         or exists (select 1 from public.listings l where l.id = listing_id and l.seller_id = auth.uid()));
revoke insert, update, delete on public.sales from anon, authenticated;

create function public.list_reward(p_reward uuid, p_price int) returns uuid
language plpgsql security definer set search_path = public as $$
declare v public.rewards%rowtype; v_id uuid;
begin
  select * into v from public.rewards where id = p_reward for update;
  if not found or v.owner_id <> auth.uid() then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if v.status <> 'earned' then raise exception 'reward is %', v.status using errcode = 'P0001'; end if;
  update public.rewards set status = 'listed' where id = p_reward;
  insert into public.listings (reward_id, seller_id, price_sats)
    values (p_reward, auth.uid(), p_price) returning id into v_id;
  return v_id;
end $$;

create function public.cancel_listing(p_listing uuid) returns void
language plpgsql security definer set search_path = public as $$
declare l public.listings%rowtype;
begin
  select * into l from public.listings where id = p_listing for update;
  if not found or l.seller_id <> auth.uid() then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if l.status <> 'open' then raise exception 'listing is %', l.status using errcode = 'P0001'; end if;
  if l.reserved_until > now() then
    raise exception 'a buyer is paying right now' using errcode = 'P0001';
  end if;
  update public.listings set status = 'cancelled' where id = p_listing;
  update public.rewards set status = 'earned' where id = l.reward_id;
end $$;

-- Server only: hold an open listing for one buyer while they pay (10 minutes).
create function public.reserve_listing(p_listing uuid, p_buyer uuid) returns public.listings
language plpgsql security definer set search_path = public as $$
declare l public.listings%rowtype;
begin
  select * into l from public.listings where id = p_listing for update;
  if not found or l.status <> 'open' then raise exception 'not for sale' using errcode = 'P0001'; end if;
  if l.seller_id = p_buyer then raise exception 'cannot buy your own listing' using errcode = 'P0001'; end if;
  if l.reserved_until > now() and l.reserved_by <> p_buyer then
    raise exception 'someone else is buying this' using errcode = 'P0001';
  end if;
  update public.listings set reserved_by = p_buyer, reserved_until = now() + interval '10 minutes'
   where id = p_listing returning * into l;
  return l;
end $$;

-- Server only: called after the API has checked sha256(preimage) = payment_hash.
create function public.finalize_sale(p_sale uuid, p_preimage text) returns void
language plpgsql security definer set search_path = public as $$
declare s public.sales%rowtype; l public.listings%rowtype;
begin
  select * into s from public.sales where id = p_sale for update;
  if not found then raise exception 'no sale' using errcode = 'P0001'; end if;
  if s.settled_at is not null then return; end if; -- idempotent
  select * into l from public.listings where id = s.listing_id for update;
  if l.status <> 'open' then raise exception 'listing is %', l.status using errcode = 'P0001'; end if;
  update public.sales set preimage = p_preimage, settled_at = now() where id = p_sale;
  update public.listings set status = 'sold', buyer_id = s.buyer_id, sold_at = now(),
         reserved_by = null, reserved_until = null where id = l.id;
  update public.rewards set owner_id = s.buyer_id, status = 'earned' where id = l.reward_id;
end $$;

-- ─────────────────────────────────────────────────────────────── promotions
create table public.promotions (
  id             uuid primary key default gen_random_uuid(),
  business_id    uuid not null references public.businesses(id) on delete cascade,
  title          text not null check (char_length(title) between 3 and 120),
  body           text not null default '' check (char_length(body) <= 4000),
  media_url      text check (media_url ~ '^https://'),
  terms          text check (char_length(terms) <= 2000),
  sats_per_visit int not null default 0 check (sats_per_visit between 0 and 1000000),
  starts_at      timestamptz not null default now(),
  ends_at        timestamptz,
  is_active      boolean not null default true,
  created_at     timestamptz not null default now()
);
alter table public.promotions enable row level security;
create policy promotions_read on public.promotions for select
  using (is_active or public.is_staff(business_id));
create policy promotions_staff_insert on public.promotions for insert to authenticated
  with check (public.is_staff(business_id));
create policy promotions_staff_update on public.promotions for update to authenticated
  using (public.is_staff(business_id)) with check (public.is_staff(business_id));
revoke delete on public.promotions from anon, authenticated;

create table public.promotion_claims (
  id            uuid primary key default gen_random_uuid(),
  promotion_id  uuid not null references public.promotions(id) on delete cascade,
  promoter_id   uuid not null references public.profiles(id),
  status        text not null default 'pending' check (status in ('pending', 'approved', 'rejected')),
  referral_code text not null unique default substr(md5(gen_random_uuid()::text), 1, 12),
  created_at    timestamptz not null default now(),
  unique (promotion_id, promoter_id)
);
create function public.promotion_business(p uuid) returns uuid
language sql stable security definer set search_path = public as $$
  select business_id from public.promotions where id = p;
$$;
alter table public.promotion_claims enable row level security;
create policy claims_read on public.promotion_claims for select
  using (promoter_id = auth.uid() or public.is_staff(public.promotion_business(promotion_id)));
create policy claims_insert on public.promotion_claims for insert to authenticated
  with check (promoter_id = auth.uid() and status = 'pending');
create policy claims_staff_update on public.promotion_claims for update to authenticated
  using (public.is_staff(public.promotion_business(promotion_id)))
  with check (public.is_staff(public.promotion_business(promotion_id)));
revoke update, delete on public.promotion_claims from anon, authenticated;
revoke insert on public.promotion_claims from anon, authenticated;
grant insert (promotion_id, promoter_id) on public.promotion_claims to authenticated;
grant update (status) on public.promotion_claims to authenticated;

-- Record of sats a business paid a promoter for a referred visit (proof = preimage).
create table public.promoter_payouts (
  id           uuid primary key default gen_random_uuid(),
  claim_id     uuid not null references public.promotion_claims(id),
  checkin_id   uuid not null unique references public.checkins(id),
  amount_sats  int not null check (amount_sats > 0),
  payment_hash text not null unique,
  preimage     text,
  paid_at      timestamptz
);
alter table public.promoter_payouts enable row level security;
create policy payouts_read on public.promoter_payouts for select
  using (exists (select 1 from public.promotion_claims c
                 where c.id = claim_id
                   and (c.promoter_id = auth.uid()
                        or public.is_staff(public.promotion_business(c.promotion_id)))));
revoke insert, update, delete on public.promoter_payouts from anon, authenticated;

-- ─────────────────────────────────────────────────────────────── posts & reviews
create table public.posts (
  id                uuid primary key default gen_random_uuid(),
  author_id         uuid not null references public.profiles(id),
  title             text not null check (char_length(title) between 3 and 120),
  body              text not null default '' check (char_length(body) <= 8000),
  media_url         text check (media_url ~ '^https://'),
  category_id       int references public.categories(id),
  promotion_id      uuid references public.promotions(id),
  is_paid_promotion boolean not null default false,
  nostr_event_id    text check (nostr_event_id ~ '^[0-9a-f]{64}$'),
  hidden            boolean not null default false,
  created_at        timestamptz not null default now(),
  -- FTC: a post tied to a promotion is always labelled as paid.
  check (promotion_id is null or is_paid_promotion)
);
alter table public.posts enable row level security;
create policy posts_read on public.posts for select using (not hidden or author_id = auth.uid());
create policy posts_insert on public.posts for insert to authenticated
  with check (author_id = auth.uid() and not hidden);
create policy posts_update on public.posts for update to authenticated
  using (author_id = auth.uid()) with check (author_id = auth.uid());
create policy posts_delete on public.posts for delete to authenticated using (author_id = auth.uid());
revoke update on public.posts from anon, authenticated;
grant update (title, body, media_url, category_id, nostr_event_id) on public.posts to authenticated;

create table public.business_reviews (
  id          uuid primary key default gen_random_uuid(),
  business_id uuid not null references public.businesses(id) on delete cascade,
  reviewer_id uuid not null references public.profiles(id),
  rating      int not null check (rating between 1 and 5),
  body        text not null default '' check (char_length(body) <= 2000),
  created_at  timestamptz not null default now(),
  unique (business_id, reviewer_id)
);
alter table public.business_reviews enable row level security;
create policy breviews_read on public.business_reviews for select using (true);
create policy breviews_insert on public.business_reviews for insert to authenticated
  with check (reviewer_id = auth.uid()
              and exists (select 1 from public.checkins c
                          where c.profile_id = auth.uid() and c.business_id = business_reviews.business_id));
create policy breviews_update on public.business_reviews for update to authenticated
  using (reviewer_id = auth.uid()) with check (reviewer_id = auth.uid());
create policy breviews_delete on public.business_reviews for delete to authenticated
  using (reviewer_id = auth.uid());

create table public.promoter_reviews (
  id          uuid primary key default gen_random_uuid(),
  promoter_id uuid not null references public.profiles(id),
  business_id uuid not null references public.businesses(id) on delete cascade,
  reviewer_id uuid not null references public.profiles(id),
  rating      int not null check (rating between 1 and 5),
  body        text not null default '' check (char_length(body) <= 2000),
  is_public   boolean not null default true,
  created_at  timestamptz not null default now(),
  unique (promoter_id, business_id)
);
alter table public.promoter_reviews enable row level security;
create policy previews_read on public.promoter_reviews for select
  using (is_public or promoter_id = auth.uid() or public.is_staff(business_id));
create policy previews_insert on public.promoter_reviews for insert to authenticated
  with check (reviewer_id = auth.uid() and public.is_staff(business_id)
              and exists (select 1 from public.promotion_claims c
                          join public.promotions p on p.id = c.promotion_id
                          where c.promoter_id = promoter_reviews.promoter_id
                            and p.business_id = promoter_reviews.business_id
                            and c.status = 'approved'));
create policy previews_update on public.promoter_reviews for update to authenticated
  using (reviewer_id = auth.uid()) with check (reviewer_id = auth.uid());

-- ─────────────────────────────────────────────────────────────── auth challenges
create table public.auth_challenges (
  challenge  text primary key,
  created_at timestamptz not null default now(),
  expires_at timestamptz not null default now() + interval '5 minutes',
  used_at    timestamptz
);
alter table public.auth_challenges enable row level security;
-- No policies: service role only.
revoke all on public.auth_challenges from anon, authenticated;

-- Server only: atomically consume a challenge. Returns true once, then never again.
create function public.consume_challenge(p_challenge text) returns boolean
language plpgsql security definer set search_path = public as $$
declare n int;
begin
  update public.auth_challenges set used_at = now()
   where challenge = p_challenge and used_at is null and expires_at > now();
  get diagnostics n = row_count;
  delete from public.auth_challenges where expires_at < now() - interval '1 day';
  return n = 1;
end $$;

-- ─────────────────────────────────────────────────────────────── function grants
-- Postgres grants EXECUTE to PUBLIC by default; lock every function down first.
revoke execute on all functions in schema public from public, anon, authenticated;
grant execute on function public.is_staff(uuid), public.is_owner(uuid),
                          public.promotion_business(uuid) to anon, authenticated;
grant execute on function public.rotate_checkin_secret(uuid), public.redeem_reward(uuid),
                          public.list_reward(uuid, int), public.cancel_listing(uuid)
  to authenticated;
grant execute on function public.record_checkin(uuid, uuid, double precision, double precision, text),
                          public.reserve_listing(uuid, uuid), public.finalize_sale(uuid, text),
                          public.consume_challenge(text)
  to service_role;
alter default privileges in schema public revoke execute on functions from public, anon, authenticated;

-- ─────────────────────────────────────────────────────────────── table grants
-- The project has "grant API access to new tables automatically" OFF, so every
-- privilege is listed here on purpose. Grants say what a role MAY touch; RLS
-- policies above decide which ROWS. Column-limited updates are granted earlier
-- (profiles, businesses, promotion_claims, posts).
grant all on all tables in schema public to service_role;
grant usage, select on all sequences in schema public to service_role;

-- Public reads (anon + signed-in)
grant select on public.profiles, public.categories, public.businesses, public.reward_programs,
                public.rewards, public.listings, public.promotions, public.posts,
                public.business_reviews, public.promoter_reviews
  to anon, authenticated;

-- Signed-in only reads
grant select on public.business_staff, public.checkin_secrets, public.checkins, public.sales,
                public.promotion_claims, public.promoter_payouts
  to authenticated;

-- Signed-in writes (RLS policies limit them to the user's own rows / own business)
grant insert on public.businesses, public.reward_programs, public.promotions, public.posts,
                public.business_reviews, public.promoter_reviews
  to authenticated;
grant insert, delete on public.business_staff to authenticated;
grant update on public.reward_programs, public.promotions, public.business_reviews,
                public.promoter_reviews
  to authenticated;
grant delete on public.posts, public.business_reviews to authenticated;
-- auth_challenges: no grants. Service role only.

-- ─────────────────────────────────────────────────────────────── seed: categories
insert into public.categories (name, slug) values
  ('Food & Drink', 'food-drink'), ('Coffee', 'coffee'), ('Retail', 'retail'),
  ('Home Services', 'home-services'), ('Health & Wellness', 'health-wellness'),
  ('Beauty', 'beauty'), ('Auto', 'auto'), ('Professional Services', 'professional-services'),
  ('Arts & Entertainment', 'arts-entertainment'), ('Farms & Markets', 'farms-markets');
