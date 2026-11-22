-- Referrals stick to the person, not the browser.
--
-- Before: promoter credit lived only in a browser cookie (lw_ref), so a friend who opened the
-- link in Instagram's browser and then scanned with the camera (Safari), or scanned with the
-- LocalWorx app, earned the promoter nothing. Now the referral is saved on the member's account
-- for that shop: when they open the link signed in, when they sign in with the cookie, or at
-- their first check-in with it. Every visit to that shop in the next 30 days credits the promoter
-- (Charlie, 2026-11-22: "any visit within 30 days"). A different promoter's link replaces it.

create table public.referrals (
  member_id   uuid not null references public.profiles(id) on delete cascade,
  business_id uuid not null references public.businesses(id) on delete cascade,
  claim_id    uuid not null references public.promotion_claims(id) on delete cascade,
  referred_at timestamptz not null default now(),
  primary key (member_id, business_id)
);
create index referrals_claim_idx on public.referrals (claim_id);
alter table public.referrals enable row level security;
-- The member, the promoter who referred them, and the shop's staff can see it. Writes only via functions.
create policy referrals_read on public.referrals for select using (
  member_id = auth.uid()
  or public.is_staff(business_id)
  or exists (select 1 from public.promotion_claims c where c.id = claim_id and c.promoter_id = auth.uid())
);
revoke insert, update, delete on public.referrals from anon, authenticated;
grant select on public.referrals to authenticated;
grant all on public.referrals to service_role;

create function public.referral_window() returns interval
language sql immutable as $$ select interval '30 days' $$;

-- Save "p_profile was referred by the promoter behind p_code" for that code's shop.
-- p_refresh = true (a fresh link click or sign-in): the window restarts now.
-- p_refresh = false (a cookie arriving with a check-in): only saves it if new or a different promoter,
-- so re-sending the same cookie can't keep the 30 days rolling.
-- Returns the shop's id, or null if the code isn't an approved claim or is the member's own link.
create function public.record_referral(p_profile uuid, p_code text, p_refresh boolean default true) returns uuid
language plpgsql security definer set search_path = public as $$
declare v_claim uuid; v_promoter uuid; v_business uuid;
begin
  select c.id, c.promoter_id, pr.business_id into v_claim, v_promoter, v_business
    from public.promotion_claims c join public.promotions pr on pr.id = c.promotion_id
   where c.referral_code = p_code and c.status = 'approved';
  if not found or v_promoter = p_profile then
    return null;
  end if;
  if p_refresh then
    insert into public.referrals (member_id, business_id, claim_id) values (p_profile, v_business, v_claim)
      on conflict (member_id, business_id) do update set claim_id = excluded.claim_id, referred_at = now();
  else
    insert into public.referrals (member_id, business_id, claim_id) values (p_profile, v_business, v_claim)
      on conflict (member_id, business_id) do update set claim_id = excluded.claim_id, referred_at = now()
      where public.referrals.claim_id <> excluded.claim_id;
  end if;
  return v_business;
end $$;

-- For the shop page: the display name behind a link code for THIS shop (the visitor already has the code).
create function public.referrer_name(p_code text, p_business uuid) returns text
language sql stable security definer set search_path = public as $$
  select p.display_name
    from public.promotion_claims c
    join public.promotions pr on pr.id = c.promotion_id
    join public.profiles p on p.id = c.promoter_id
   where c.referral_code = p_code and c.status = 'approved' and pr.business_id = p_business;
$$;

-- For the shop page: who referred ME here, and until when my visits count for them.
create function public.my_referral(p_business uuid) returns table (promoter_name text, counts_until timestamptz)
language sql stable security definer set search_path = public as $$
  select p.display_name, r.referred_at + public.referral_window()
    from public.referrals r
    join public.promotion_claims c on c.id = r.claim_id
    join public.profiles p on p.id = c.promoter_id
   where r.member_id = auth.uid() and r.business_id = p_business and c.status = 'approved'
     and r.referred_at > now() - public.referral_window();
$$;

-- record_checkin: credit the member's saved referral instead of only the code sent with this request.
create or replace function public.record_checkin(
  p_profile uuid, p_business uuid, p_lat double precision, p_lng double precision, p_ref text
) returns jsonb
language plpgsql security definer set search_path = public as $$
declare
  v_checkin  uuid;
  v_program  public.reward_programs%rowtype;
  v_since    timestamptz;
  v_visits   int := 0;
  v_reward   uuid;
  v_cooldown int;
  v_last     timestamptz;
  v_claim    uuid;
  v_promoter uuid;
  v_promo    public.promotions%rowtype;
  v_refs     int;
  v_iou      uuid;
  v_code     text;
begin
  -- Serialize check-ins per member + business so two fast scans can't both pass the gap check.
  perform pg_advisory_xact_lock(hashtextextended(p_profile::text || ':' || p_business::text, 0));

  select checkin_cooldown_minutes into v_cooldown from public.businesses where id = p_business;
  if not found then
    return jsonb_build_object('ok', false, 'reason', 'no_business');
  end if;
  select max(created_at) into v_last from public.checkins
   where profile_id = p_profile and business_id = p_business;
  if v_last is not null and v_last > now() - make_interval(mins => v_cooldown) then
    return jsonb_build_object('ok', false, 'reason', 'too_soon',
      'wait_minutes', ceil(extract(epoch from (v_last + make_interval(mins => v_cooldown) - now())) / 60)::int);
  end if;

  -- A link that came with this check-in (the browser cookie) is saved to the member first,
  -- if it's for THIS shop. Then credit whoever referred this member here in the last 30 days,
  -- however they check in (app, another browser, another phone).
  if p_ref is not null then
    perform 1 from public.promotion_claims c join public.promotions pr on pr.id = c.promotion_id
     where c.referral_code = p_ref and pr.business_id = p_business;
    if found then
      perform public.record_referral(p_profile, p_ref, false);
    end if;
  end if;
  select c.id, c.promoter_id, c.referral_code into v_claim, v_promoter, v_code
    from public.referrals r join public.promotion_claims c on c.id = r.claim_id
   where r.member_id = p_profile and r.business_id = p_business
     and r.referred_at > now() - public.referral_window()
     and c.status = 'approved' and c.promoter_id <> p_profile;

  insert into public.checkins (profile_id, business_id, checkin_day, lat, lng, referral_code)
    values (p_profile, p_business, (now() at time zone 'utc')::date, p_lat, p_lng, v_code)
    returning id into v_checkin;

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

  -- In-kind promoter payout: one IOU every N referred visits on this claim.
  if v_claim is not null then
    select pr.* into v_promo from public.promotions pr
      join public.promotion_claims c on c.promotion_id = pr.id where c.id = v_claim;
    if v_promo.inkind_item is not null and v_promo.is_active
       and (v_promo.ends_at is null or v_promo.ends_at > now()) then
      select coalesce(max(issued_at), '-infinity') into v_since from public.rewards where claim_id = v_claim;
      select count(*) into v_refs from public.checkins
       where business_id = p_business and referral_code = v_code and created_at > v_since;
      if v_refs >= v_promo.inkind_visits then
        insert into public.rewards (kind, business_id, earned_by, owner_id, promotion_id, claim_id, checkin_id, title, details)
          values ('promoter_payout', p_business, v_promoter, v_promoter, v_promo.id, v_claim, v_checkin,
                  v_promo.inkind_item, v_promo.inkind_details)
          returning id into v_iou;
      end if;
    end if;
  end if;

  return jsonb_build_object(
    'ok', true, 'checkin_id', v_checkin, 'reward_id', v_reward,
    'visits', v_visits, 'visits_required', v_program.visits_required,
    'program_name', v_program.name, 'promoter_reward_id', v_iou, 'referred_by', v_promoter);
end $$;

revoke execute on function public.record_referral(uuid, text, boolean), public.referral_window(),
                           public.referrer_name(text, uuid), public.my_referral(uuid)
  from public, anon, authenticated;
grant execute on function public.referrer_name(text, uuid) to anon, authenticated;
grant execute on function public.my_referral(uuid) to authenticated;
grant execute on function public.record_referral(uuid, text, boolean) to service_role;
