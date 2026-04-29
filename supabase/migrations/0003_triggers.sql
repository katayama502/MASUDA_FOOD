-- ============================================================
-- 0003_triggers.sql — 自動カウンタ・整合性トリガー
-- ============================================================

-- ── 予約作成時: qty_claimed インクリメント、満員で closed ─────
create or replace function public.on_reservation_created()
returns trigger language plpgsql as $$
begin
  update public.food_listings
  set
    qty_claimed = qty_claimed + 1,
    status = case
      when qty_claimed + 1 >= qty_total then 'closed'
      else status
    end
  where id = new.listing_id;
  return new;
end;
$$;

create trigger reservations_after_insert
  after insert on public.reservations
  for each row
  execute function public.on_reservation_created();

-- ── 予約キャンセル時: qty_claimed デクリメント、open に戻す ───
create or replace function public.on_reservation_canceled()
returns trigger language plpgsql as $$
begin
  if new.status = 'canceled' and old.status = 'claimed' then
    update public.food_listings
    set
      qty_claimed = greatest(0, qty_claimed - 1),
      status = case
        when status = 'closed' then 'open'
        else status
      end
    where id = new.listing_id
      and status in ('open', 'closed');
  end if;
  return new;
end;
$$;

create trigger reservations_after_cancel
  after update on public.reservations
  for each row
  when (old.status = 'claimed' and new.status = 'canceled')
  execute function public.on_reservation_canceled();

-- ── 受取完了時: restaurants.rescued_total インクリメント ──────
create or replace function public.on_reservation_redeemed()
returns trigger language plpgsql as $$
begin
  if new.status = 'redeemed' and old.status <> 'redeemed' then
    update public.restaurants
    set rescued_total = rescued_total + 1
    where id = (
      select restaurant_id from public.food_listings where id = new.listing_id
    );
  end if;
  return new;
end;
$$;

create trigger reservations_after_update
  after update on public.reservations
  for each row
  execute function public.on_reservation_redeemed();

-- ── auth.users INSERT 時に public.users プロファイルを自動作成 ─
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer as $$
begin
  insert into public.users (id, email, display_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- ── Supabase Storage バケット ────────────────────────────────
insert into storage.buckets (id, name, public)
values
  ('food-photos',        'food-photos',        true),
  ('store-applications', 'store-applications', false)
on conflict (id) do nothing;

-- food-photos: 認証済みなら誰でもアップロード可
create policy "food_photos_upload" on storage.objects
  for insert
  with check (
    bucket_id = 'food-photos'
    and auth.role() = 'authenticated'
  );

create policy "food_photos_read" on storage.objects
  for select
  using (bucket_id = 'food-photos');

-- store-applications: service_role のみ
create policy "store_applications_service" on storage.objects
  for all
  using (
    bucket_id = 'store-applications'
    and auth.role() = 'service_role'
  );
