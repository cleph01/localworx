-- Check-in rules per business, replacing "one check-in per day".
-- The rotating QR + GPS prove the member is at the shop; the gap stops a member
-- standing at the counter from filling a punch card (or a promoter's payouts)
-- by scanning again every 30 seconds.

alter table public.businesses
  add column checkin_cooldown_minutes int not null default 180
    check (checkin_cooldown_minutes between 15 and 1440),
  add column checkin_radius_m int not null default 60
    check (checkin_radius_m between 30 and 250);

grant update (checkin_cooldown_minutes, checkin_radius_m) on public.businesses to authenticated;

alter table public.checkins drop constraint checkins_profile_id_business_id_checkin_day_key;
create index checkins_member_business_time_idx on public.checkins (profile_id, business_id, created_at desc);

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

  return jsonb_build_object(
    'ok', true, 'checkin_id', v_checkin, 'reward_id', v_reward,
    'visits', v_visits, 'visits_required', v_program.visits_required,
    'program_name', v_program.name);
end $$;
