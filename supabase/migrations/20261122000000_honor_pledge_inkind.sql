-- In-kind promoter payouts (IOUs), the honor pledge, and the "unpaid IOU" badge.
--
-- A shop can pay promoters in sats, in kind (a meal, a haircut: an IOU the promoter
-- owns and can use or sell on the marketplace), or both. Every reward a shop issues,
-- punch-card rewards included, is an IOU. Before a shop can offer any, its owner
-- signs the honor pledge. If a holder reports that the shop refused an IOU and the
-- report stays open past the grace period, the shop carries a public badge until
-- the holder says it was made right (or LocalWorx dismisses the report).

-- ─────────────────────────────────────────────────────────────── honor pledge
alter table public.businesses add column honor_pledge_at timestamptz;
-- Deliberately not in the column grants: only sign_honor_pledge() sets it, and it can't be undone.

create function public.sign_honor_pledge(p_business uuid) returns timestamptz
language plpgsql security definer set search_path = public as $$
declare v timestamptz;
begin
  if not public.is_owner(p_business) then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  update public.businesses set honor_pledge_at = coalesce(honor_pledge_at, now())
   where id = p_business returning honor_pledge_at into v;
  return v;
end $$;

create function public.has_pledged(b uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.businesses where id = b and honor_pledge_at is not null);
$$;

-- No pledge, no IOUs: punch cards and promotions need it.
drop policy programs_staff_insert on public.reward_programs;
create policy programs_staff_insert on public.reward_programs for insert to authenticated
  with check (public.is_staff(business_id) and public.has_pledged(business_id));

-- ─────────────────────────────────────────────────────────────── in-kind promotions
alter table public.promotions
  add column inkind_item    text check (char_length(inkind_item) between 2 and 80),
  add column inkind_details text check (char_length(inkind_details) <= 500),
  add column inkind_visits  int not null default 1 check (inkind_visits between 1 and 100);

-- A new promotion must pay something: sats, an item, or both.
drop policy promotions_staff_insert on public.promotions;
create policy promotions_staff_insert on public.promotions for insert to authenticated
  with check (public.is_staff(business_id) and public.has_pledged(business_id)
              and (sats_per_visit > 0 or inkind_item is not null));

-- ─────────────────────────────────────────────────────────────── rewards become IOUs
-- A reward is either a filled punch card or a promoter's in-kind payout. Its title and
-- details are frozen when issued: changing the program or promotion later doesn't
-- change what an IOU already promises.
alter table public.rewards
  alter column program_id drop not null,
  add column kind         text not null default 'punch_card' check (kind in ('punch_card', 'promoter_payout')),
  add column promotion_id uuid references public.promotions(id),
  add column claim_id     uuid references public.promotion_claims(id),
  add column checkin_id   uuid references public.checkins(id),
  add column title        text,
  add column details      text;

update public.rewards r set title = p.name, details = nullif(p.description, '')
  from public.reward_programs p where p.id = r.program_id;

create function public.rewards_fill_title() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  if new.title is null and new.program_id is not null then
    select name, nullif(description, '') into new.title, new.details
      from public.reward_programs where id = new.program_id;
  end if;
  return new;
end $$;
create trigger rewards_fill_title before insert on public.rewards
  for each row execute function public.rewards_fill_title();

alter table public.rewards
  alter column title set not null,
  add constraint rewards_source check (
    (kind = 'punch_card' and program_id is not null)
    or (kind = 'promoter_payout' and promotion_id is not null and claim_id is not null));
create index rewards_claim_idx on public.rewards (claim_id) where claim_id is not null;

-- ─────────────────────────────────────────────────────────────── check-ins issue promoter IOUs
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

  -- Resolve the referral: an approved claim on a live promotion of THIS shop, and never your own link.
  if p_ref is not null then
    select c.id, c.promoter_id into v_claim, v_promoter
      from public.promotion_claims c join public.promotions pr on pr.id = c.promotion_id
     where c.referral_code = p_ref and c.status = 'approved' and pr.business_id = p_business;
    if not found or v_promoter = p_profile then
      p_ref := null; v_claim := null;
    end if;
  end if;

  insert into public.checkins (profile_id, business_id, checkin_day, lat, lng, referral_code)
    values (p_profile, p_business, (now() at time zone 'utc')::date, p_lat, p_lng, p_ref)
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
       where business_id = p_business and referral_code = p_ref and created_at > v_since;
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
    'program_name', v_program.name, 'promoter_reward_id', v_iou);
end $$;

-- ─────────────────────────────────────────────────────────────── honor reports
create table public.honor_reports (
  id          uuid primary key default gen_random_uuid(),
  reward_id   uuid not null references public.rewards(id),
  business_id uuid not null references public.businesses(id),
  reporter_id uuid not null references public.profiles(id),
  note        text not null default '' check (char_length(note) <= 500),
  created_at  timestamptz not null default now(),
  resolved_at timestamptz,
  resolution  text check (resolution in ('made_right', 'dismissed')),
  check ((resolved_at is null) = (resolution is null))
);
create unique index one_open_report_per_reward on public.honor_reports (reward_id) where resolved_at is null;
create index honor_reports_business_open_idx on public.honor_reports (business_id) where resolved_at is null;
alter table public.honor_reports enable row level security;
create policy honor_reports_read on public.honor_reports for select
  using (reporter_id = auth.uid() or public.is_staff(business_id));
-- Writes only through the functions below; LocalWorx (service role) can dismiss a false report.
revoke insert, update, delete on public.honor_reports from anon, authenticated;
grant select on public.honor_reports to authenticated;
grant all on public.honor_reports to service_role;

-- The holder of an unused IOU says the shop wouldn't honor it.
create function public.report_unhonored(p_reward uuid, p_note text) returns uuid
language plpgsql security definer set search_path = public as $$
declare v public.rewards%rowtype; v_id uuid;
begin
  select * into v from public.rewards where id = p_reward for update;
  if not found or v.owner_id <> auth.uid() then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if v.status <> 'earned' then
    raise exception 'reward is %', v.status using errcode = 'P0001';
  end if;
  begin
    insert into public.honor_reports (reward_id, business_id, reporter_id, note)
      values (p_reward, v.business_id, auth.uid(), left(coalesce(p_note, ''), 500))
      returning id into v_id;
  exception when unique_violation then
    raise exception 'already reported' using errcode = 'P0001';
  end;
  return v_id;
end $$;

-- Only the person who reported it can say the shop made it right. Staff marking the
-- reward used does NOT close a report, so a shop can't clear its badge on its own.
create function public.close_honor_report(p_report uuid) returns void
language plpgsql security definer set search_path = public as $$
declare r public.honor_reports%rowtype;
begin
  select * into r from public.honor_reports where id = p_report for update;
  if not found or r.reporter_id <> auth.uid() then
    raise exception 'not allowed' using errcode = '42501';
  end if;
  if r.resolved_at is not null then return; end if;
  update public.honor_reports set resolved_at = now(), resolution = 'made_right' where id = p_report;
end $$;

-- Public: shops with a report still open after the grace period (7 days) carry the badge.
create function public.unhonored_businesses() returns table (business_id uuid, open_reports int, oldest timestamptz)
language sql stable security definer set search_path = public as $$
  select business_id, count(*)::int, min(created_at)
    from public.honor_reports
   where resolved_at is null and created_at < now() - interval '7 days'
   group by business_id;
$$;

-- ─────────────────────────────────────────────────────────────── function grants
revoke execute on function public.sign_honor_pledge(uuid), public.has_pledged(uuid),
                           public.report_unhonored(uuid, text), public.close_honor_report(uuid),
                           public.unhonored_businesses(), public.rewards_fill_title()
  from public, anon, authenticated;
grant execute on function public.has_pledged(uuid), public.unhonored_businesses() to anon, authenticated;
grant execute on function public.sign_honor_pledge(uuid), public.report_unhonored(uuid, text),
                          public.close_honor_report(uuid)
  to authenticated;
