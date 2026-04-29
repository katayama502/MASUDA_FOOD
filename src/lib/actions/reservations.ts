'use server';

import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { getPlanRescueLimit } from '@/lib/stripe/products';
import type { PlanKind } from '@/lib/supabase/types';
import { startOfMonth, endOfMonth } from 'date-fns';

type ActionResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: string };

// ── createReservation ─────────────────────────────────────────
const createReservationSchema = z.object({
  listingId: z.string().uuid(),
});

export async function createReservation(
  listingId: string,
): Promise<ActionResult<{ reservationId: string }>> {
  const parse = createReservationSchema.safeParse({ listingId });
  if (!parse.success) return { ok: false, error: '入力が不正です' };

  const supabase = await createClient();

  // 認証確認
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'ログインが必要です' };

  // 出品の存在・status 確認
  const { data: listing, error: listingErr } = await supabase
    .from('food_listings')
    .select('id, status, qty_total, qty_claimed')
    .eq('id', listingId)
    .single();

  if (listingErr || !listing) return { ok: false, error: '出品が見つかりません' };
  if (listing.status !== 'open') return { ok: false, error: 'この出品はすでに終了しています' };
  if (listing.qty_claimed >= listing.qty_total) return { ok: false, error: '残り枠がありません' };

  // 今月の利用回数確認
  const { data: subscription } = await supabase
    .from('subscriptions')
    .select('plan, status')
    .eq('user_id', user.id)
    .eq('status', 'active')
    .single();

  if (!subscription) return { ok: false, error: 'アクティブなプランがありません' };

  const limit = getPlanRescueLimit(subscription.plan as PlanKind);
  const now = new Date();
  const { count: usedCount } = await supabase
    .from('reservations')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .in('status', ['claimed', 'redeemed'])
    .gte('created_at', startOfMonth(now).toISOString())
    .lte('created_at', endOfMonth(now).toISOString());

  if ((usedCount ?? 0) >= limit) {
    return { ok: false, error: `今月の利用上限（${limit}回）に達しました` };
  }

  // 予約作成（trigger が qty_claimed をインクリメント）
  const { data: reservation, error: reserveErr } = await supabase
    .from('reservations')
    .insert({ user_id: user.id, listing_id: listingId })
    .select('id')
    .single();

  if (reserveErr || !reservation) {
    if (reserveErr?.code === '23505') {
      return { ok: false, error: 'すでに確保済みです' };
    }
    return { ok: false, error: '予約の作成に失敗しました' };
  }

  return { ok: true, data: { reservationId: reservation.id } };
}

// ── redeemReservation (店舗側・service_role 経由) ────────────
const redeemSchema = z.object({
  reservationId: z.string().uuid(),
});

export async function redeemReservation(
  reservationId: string,
): Promise<ActionResult> {
  const parse = redeemSchema.safeParse({ reservationId });
  if (!parse.success) return { ok: false, error: '入力が不正です' };

  // 店舗オーナーの認証確認（通常クライアントで）
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'ログインが必要です' };

  // service_role で予約を取得し、オーナー確認
  const admin = createAdminClient();
  const { data: reservation } = await admin
    .from('reservations')
    .select('id, status, listing_id, food_listings(restaurant_id, restaurants(owner_id))')
    .eq('id', reservationId)
    .single();

  if (!reservation) return { ok: false, error: '予約が見つかりません' };
  if (reservation.status !== 'claimed') return { ok: false, error: 'この予約は受取済みまたは無効です' };

  // オーナー確認
  const listing = Array.isArray(reservation.food_listings)
    ? reservation.food_listings[0]
    : reservation.food_listings;
  const restaurant = listing && (Array.isArray(listing.restaurants) ? listing.restaurants[0] : listing.restaurants);
  if (!restaurant || restaurant.owner_id !== user.id) {
    return { ok: false, error: '権限がありません' };
  }

  // 受取完了に更新（trigger が rescued_total をインクリメント）
  const { error: updateErr } = await admin
    .from('reservations')
    .update({
      status: 'redeemed',
      redeemed_at: new Date().toISOString(),
      redeemed_by: user.id,
    })
    .eq('id', reservationId);

  if (updateErr) return { ok: false, error: '更新に失敗しました' };

  return { ok: true, data: undefined };
}
