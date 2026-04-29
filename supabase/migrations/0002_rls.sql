-- ============================================================
-- 0002_rls.sql — Row Level Security
-- ============================================================

-- 全テーブルでRLSをON
alter table public.users enable row level security;
alter table public.restaurants enable row level security;
alter table public.store_applications enable row level security;
alter table public.subscriptions enable row level security;
alter table public.food_listings enable row level security;
alter table public.reservations enable row level security;
alter table public.notifications enable row level security;
alter table public.community_posts enable row level security;
alter table public.payouts enable row level security;
alter table public.processed_stripe_events enable row level security;

-- ── helper: 現在のユーザーロール ─────────────────────────────
create or replace function public.get_user_role()
returns user_role language sql stable security definer as $$
  select role from public.users where id = auth.uid()
$$;

-- ── users ────────────────────────────────────────────────────
-- 自分のレコードのみ読み書き
create policy users_self on public.users
  for all
  using (id = auth.uid())
  with check (id = auth.uid());

-- admin は全件読み書き
create policy users_admin on public.users
  for all
  using (public.get_user_role() = 'admin');

-- ── restaurants ──────────────────────────────────────────────
-- active なら全員読める。自分のオーナーレコード or admin は always
create policy restaurants_read on public.restaurants
  for select
  using (
    active = true
    or owner_id = auth.uid()
    or public.get_user_role() = 'admin'
  );

-- オーナーのみ更新
create policy restaurants_owner_update on public.restaurants
  for update
  using (owner_id = auth.uid());

-- admin は全操作
create policy restaurants_admin on public.restaurants
  for all
  using (public.get_user_role() = 'admin');

-- ── store_applications ────────────────────────────────────────
-- 申請者は自分の申請を読める。admin は全件
create policy store_apps_read on public.store_applications
  for select
  using (
    applicant_email = (select email from public.users where id = auth.uid())
    or public.get_user_role() = 'admin'
  );

-- 未認証でも INSERT 可（申請フォームはログイン不要）
create policy store_apps_insert on public.store_applications
  for insert
  with check (true);

-- admin のみ status 変更
create policy store_apps_admin on public.store_applications
  for update
  using (public.get_user_role() = 'admin');

-- ── subscriptions ─────────────────────────────────────────────
create policy subs_self on public.subscriptions
  for select
  using (user_id = auth.uid());

create policy subs_admin on public.subscriptions
  for all
  using (public.get_user_role() = 'admin');

-- ── food_listings ─────────────────────────────────────────────
-- open/closed なら全会員が読める
create policy listings_read on public.food_listings
  for select
  using (
    status in ('open', 'closed')
    or exists (
      select 1 from public.restaurants r
      where r.id = restaurant_id
        and (r.owner_id = auth.uid() or public.get_user_role() = 'admin')
    )
  );

-- オーナーが自店の出品を書き込み
create policy listings_owner_write on public.food_listings
  for all
  using (
    exists (
      select 1 from public.restaurants r
      where r.id = restaurant_id and r.owner_id = auth.uid()
    )
  );

create policy listings_admin on public.food_listings
  for all
  using (public.get_user_role() = 'admin');

-- ── reservations ─────────────────────────────────────────────
-- 自分の予約。店舗オーナーは自店宛の予約を読める
create policy reservations_self on public.reservations
  for select
  using (
    user_id = auth.uid()
    or exists (
      select 1 from public.food_listings l
      join public.restaurants r on r.id = l.restaurant_id
      where l.id = listing_id and r.owner_id = auth.uid()
    )
    or public.get_user_role() = 'admin'
  );

-- 会員が自分の予約を作成
create policy reservations_create on public.reservations
  for insert
  with check (user_id = auth.uid());

-- UPDATE は service_role 経由のみ (redeemReservation Server Action)
-- RLS のポリシーを設けないことでユーザー側からは更新不可

-- ── notifications ─────────────────────────────────────────────
create policy notif_self on public.notifications
  for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy notif_admin on public.notifications
  for all
  using (public.get_user_role() = 'admin');

-- ── community_posts ──────────────────────────────────────────
-- 全会員が読める
create policy community_read on public.community_posts
  for select
  using (true);

-- 自分の投稿のみ作成/削除
create policy community_self on public.community_posts
  for all
  using (user_id = auth.uid())
  with check (user_id = auth.uid());

create policy community_admin on public.community_posts
  for all
  using (public.get_user_role() = 'admin');

-- ── payouts ───────────────────────────────────────────────────
-- オーナーは自店分を読める
create policy payouts_owner on public.payouts
  for select
  using (
    exists (
      select 1 from public.restaurants r
      where r.id = restaurant_id and r.owner_id = auth.uid()
    )
  );

create policy payouts_admin on public.payouts
  for all
  using (public.get_user_role() = 'admin');

-- ── processed_stripe_events ──────────────────────────────────
-- service_role のみアクセス（RLSでユーザーからブロック）
-- no policy = deny all for authenticated users
