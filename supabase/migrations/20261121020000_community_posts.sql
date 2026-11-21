-- Community posts: locals write about their town, sign the post with their own Nostr
-- key (so it also lives on the open Nostr network), and anyone can tip the author in
-- sats straight to the author's own wallet.
--
-- Anti-spam: a small posting fee, paid in sats (to LocalWorx's own Lightning address)
-- or by card (Stripe). While no payment method is configured (pilot), posting is free
-- but capped per day. Either way, posts are created ONLY by the server, after it has
-- checked the signature, the fee and the cap.

alter table public.posts
  add column status      text not null default 'published' check (status in ('awaiting_payment', 'published')),
  add column nostr_event jsonb,
  add column city        text check (char_length(city) <= 80),
  add column state       text check (char_length(state) <= 40),
  add column business_id uuid references public.businesses(id) on delete set null,
  add column tips_sats   bigint not null default 0,
  add column tips_count  int not null default 0,
  add column published_at timestamptz;

update public.posts set published_at = created_at where status = 'published';

create index posts_feed_idx on public.posts (published_at desc) where status = 'published' and not hidden;
create index posts_author_idx on public.posts (author_id, created_at desc);

-- Published + not hidden is public; authors also see their own drafts awaiting payment.
drop policy posts_read on public.posts;
create policy posts_read on public.posts for select
  using ((status = 'published' and not hidden) or author_id = auth.uid());

-- Only the server creates posts (fee + signature + cap checks). The signed Nostr event
-- can't be edited, so there are no column updates either. Authors may still delete.
drop policy posts_insert on public.posts;
drop policy posts_update on public.posts;
revoke insert, update on public.posts from anon, authenticated;

-- ── Posting fees ─────────────────────────────────────────────────────────────
create table public.post_payments (
  id                uuid primary key default gen_random_uuid(),
  post_id           uuid not null unique references public.posts(id) on delete cascade,
  payer_id          uuid not null references public.profiles(id),
  method            text not null check (method in ('sats', 'usd')),
  amount            int not null check (amount > 0), -- sats, or US cents
  invoice           text,
  payment_hash      text unique check (payment_hash ~ '^[0-9a-f]{64}$'),
  verify_url        text,
  stripe_session_id text unique,
  created_at        timestamptz not null default now(),
  paid_at           timestamptz,
  check ((method = 'sats' and invoice is not null and payment_hash is not null)
      or (method = 'usd'))
);
alter table public.post_payments enable row level security;
create policy post_payments_read on public.post_payments for select using (payer_id = auth.uid());
revoke insert, update, delete on public.post_payments from anon, authenticated;

-- ── Tips (Lightning, NIP-57 zap when the author's wallet supports it) ────────
create table public.post_tips (
  id           uuid primary key default gen_random_uuid(),
  post_id      uuid not null references public.posts(id) on delete cascade,
  tipper_id    uuid not null references public.profiles(id),
  amount_sats  int not null check (amount_sats between 1 and 10000000),
  invoice      text not null,
  payment_hash text not null unique check (payment_hash ~ '^[0-9a-f]{64}$'),
  verify_url   text,
  is_zap       boolean not null default false,
  created_at   timestamptz not null default now(),
  settled_at   timestamptz,
  preimage     text
);
create index post_tips_post_idx on public.post_tips (post_id) where settled_at is not null;
alter table public.post_tips enable row level security;
create policy post_tips_read on public.post_tips for select
  using (tipper_id = auth.uid()
         or exists (select 1 from public.posts p where p.id = post_id and p.author_id = auth.uid()));
revoke insert, update, delete on public.post_tips from anon, authenticated;

-- Mark a fee paid and publish its post. Idempotent.
create function public.mark_post_paid(p_payment uuid) returns void
language plpgsql security definer set search_path = public as $$
declare v_post uuid;
begin
  update public.post_payments set paid_at = coalesce(paid_at, now())
   where id = p_payment returning post_id into v_post;
  if v_post is null then raise exception 'payment not found'; end if;
  update public.posts set status = 'published', published_at = coalesce(published_at, now())
   where id = v_post;
end $$;

-- Record a settled tip once (proof checked by the server) and add it to the post's total.
create function public.settle_post_tip(p_tip uuid, p_preimage text) returns boolean
language plpgsql security definer set search_path = public as $$
declare v public.post_tips%rowtype;
begin
  update public.post_tips set settled_at = now(), preimage = p_preimage
   where id = p_tip and settled_at is null
   returning * into v;
  if not found then return false; end if;
  update public.posts set tips_sats = tips_sats + v.amount_sats, tips_count = tips_count + 1
   where id = v.post_id;
  return true;
end $$;

revoke execute on function public.mark_post_paid(uuid), public.settle_post_tip(uuid, text) from public, anon, authenticated;
grant execute on function public.mark_post_paid(uuid), public.settle_post_tip(uuid, text) to service_role;

grant all on public.post_payments, public.post_tips to service_role;
grant select on public.post_payments, public.post_tips to authenticated;
