-- ============================================================
-- 0001_init.sql — コアテーブル
-- ============================================================

-- ── enums ────────────────────────────────────────────────────
create type plan_kind as enum ('sanpo', 'onajimi', 'taisho');
create type subscription_status as enum ('trialing','active','past_due','canceled','incomplete');
create type listing_status as enum ('draft','open','closed','expired');
create type reservation_status as enum ('claimed','redeemed','expired','canceled');
create type application_status as enum ('pending','approved','rejected');
create type user_role as enum ('member','store_owner','admin');

-- ── users (auth.users を拡張するプロファイル) ─────────────────
create table public.users (
  id               uuid        primary key references auth.users(id) on delete cascade,
  role             user_role   not null default 'member',
  display_name     text,
  line_user_id     text        unique,
  email            text,
  phone            text,
  stripe_customer_id text,
  created_at       timestamptz default now()
);
create index on public.users(line_user_id);

-- ── restaurants ────────────────────────────────────────────
create table public.restaurants (
  id                        uuid    primary key default gen_random_uuid(),
  owner_id                  uuid    references public.users(id) on delete restrict,
  name                      text    not null,
  genre                     text,
  address                   text    not null,
  hours                     text,
  closed_days               text,
  description               text,
  hero_url                  text,
  stripe_connect_account_id text,   -- Stripe Express
  active                    boolean default true,
  rescued_total             int     default 0,
  created_at                timestamptz default now()
);

-- ── store_applications ─────────────────────────────────────
create table public.store_applications (
  id               uuid              primary key default gen_random_uuid(),
  applicant_email  text              not null,
  restaurant_name  text              not null,
  genre            text,
  address          text,
  owner_name       text,
  phone            text,
  bank_info        text,
  pitch            text,
  status           application_status default 'pending',
  reviewed_by      uuid              references public.users(id),
  reviewed_at      timestamptz,
  created_at       timestamptz       default now()
);

-- ── subscriptions ─────────────────────────────────────────
create table public.subscriptions (
  id                      uuid                primary key default gen_random_uuid(),
  user_id                 uuid                references public.users(id) on delete cascade,
  plan                    plan_kind           not null,
  stripe_customer_id      text                not null,
  stripe_subscription_id  text                unique not null,
  status                  subscription_status not null,
  current_period_start    timestamptz,
  current_period_end      timestamptz,
  cancel_at_period_end    boolean             default false,
  created_at              timestamptz         default now()
);
create index on public.subscriptions(user_id);
create index on public.subscriptions(stripe_subscription_id);

-- ── food_listings ─────────────────────────────────────────
create table public.food_listings (
  id             uuid           primary key default gen_random_uuid(),
  restaurant_id  uuid           references public.restaurants(id) on delete cascade,
  title          text           not null,
  description    text,
  qty_total      int            not null check (qty_total > 0),
  qty_claimed    int            not null default 0,
  pickup_from    timestamptz    not null,
  pickup_until   timestamptz    not null,
  photo_url      text,
  tags           text[],
  status         listing_status not null default 'open',
  notified_at    timestamptz,   -- プッシュ通知済みタイムスタンプ
  created_at     timestamptz    default now(),
  check (pickup_until > pickup_from)
);
create index on public.food_listings(status, pickup_until);
create index on public.food_listings(restaurant_id);

-- ── reservations ──────────────────────────────────────────
create table public.reservations (
  id           uuid               primary key default gen_random_uuid(),
  user_id      uuid               references public.users(id) on delete restrict,
  listing_id   uuid               references public.food_listings(id) on delete restrict,
  status       reservation_status not null default 'claimed',
  redeemed_at  timestamptz,
  redeemed_by  uuid               references public.users(id),   -- 店舗側ユーザー
  created_at   timestamptz        default now()
);
create unique index reservations_user_listing
  on public.reservations(user_id, listing_id)
  where status in ('claimed','redeemed');

-- ── notifications ─────────────────────────────────────────
create table public.notifications (
  id         uuid        primary key default gen_random_uuid(),
  user_id    uuid        references public.users(id) on delete cascade,
  kind       text        not null,   -- 'new_listing'|'usage_milestone'|'onboarding'|'redeemed'
  title      text        not null,
  body       text,
  payload    jsonb,
  read_at    timestamptz,
  created_at timestamptz default now()
);
create index on public.notifications(user_id, created_at desc);

-- ── community_posts ───────────────────────────────────────
create table public.community_posts (
  id             uuid        primary key default gen_random_uuid(),
  user_id        uuid        references public.users(id) on delete cascade,
  reservation_id uuid        references public.reservations(id),
  body           text        not null,
  photo_url      text,
  likes          int         default 0,
  created_at     timestamptz default now()
);
create index on public.community_posts(created_at desc);

-- ── payouts (月次精算) ─────────────────────────────────────
create table public.payouts (
  id                 uuid        primary key default gen_random_uuid(),
  restaurant_id      uuid        references public.restaurants(id),
  period_month       date        not null,   -- 例: 2026-04-01
  rescue_count       int         not null,
  amount_jpy         int         not null,
  stripe_transfer_id text,
  status             text        not null default 'pending',  -- pending|sent|failed
  created_at         timestamptz default now(),
  unique(restaurant_id, period_month)
);

-- ── processed_stripe_events (冪等化) ─────────────────────
create table public.processed_stripe_events (
  id           text primary key,   -- Stripe event.id
  processed_at timestamptz default now()
);
