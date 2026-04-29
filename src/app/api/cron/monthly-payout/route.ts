/**
 * GET /api/cron/monthly-payout
 * Vercel Cron（月末 23:55）: 月次精算データを生成（admin 承認後に Transfer 実行）
 */
import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';
import { startOfMonth, endOfMonth, subMonths, format } from 'date-fns';

const PLATFORM_FEE_RATE = 0.20; // 運営20%

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const admin = createAdminClient();
  const now = new Date();

  // 先月分を集計
  const targetMonth = subMonths(now, 1);
  const periodStart = startOfMonth(targetMonth).toISOString();
  const periodEnd   = endOfMonth(targetMonth).toISOString();
  const periodMonth = format(startOfMonth(targetMonth), 'yyyy-MM-dd'); // DB key

  // 先月の売上合計（アクティブなサブスク × プラン金額）
  // 簡易実装: サブスク数 × 平均単価（本番では Invoice を参照）
  const { data: activeSubs } = await admin
    .from('subscriptions')
    .select('plan, status')
    .eq('status', 'active');

  const PLAN_PRICES = { sanpo: 800, onajimi: 1500, taisho: 2500 };
  const totalRevenue = (activeSubs ?? []).reduce(
    (sum, s) => sum + (PLAN_PRICES[s.plan as keyof typeof PLAN_PRICES] ?? 0),
    0,
  );
  const storePool = Math.round(totalRevenue * (1 - PLATFORM_FEE_RATE));

  // 先月の redeemed 数を店舗別に集計
  const { data: redemptions } = await admin
    .from('reservations')
    .select('listing_id, food_listings(restaurant_id)')
    .eq('status', 'redeemed')
    .gte('redeemed_at', periodStart)
    .lte('redeemed_at', periodEnd);

  if (!redemptions || redemptions.length === 0) {
    return NextResponse.json({ ok: true, message: '精算対象なし', period: periodMonth });
  }

  // 店舗ごとのレスキュー数
  const counts: Record<string, number> = {};
  for (const r of redemptions) {
    const listing = Array.isArray(r.food_listings) ? r.food_listings[0] : r.food_listings;
    if (listing?.restaurant_id) {
      counts[listing.restaurant_id] = (counts[listing.restaurant_id] ?? 0) + 1;
    }
  }

  const totalRedeemed = Object.values(counts).reduce((s, c) => s + c, 0);

  // payout レコードを upsert（pending 状態で admin が承認するまで Transfer しない）
  const payoutRows = Object.entries(counts).map(([restaurantId, count]) => ({
    restaurant_id:  restaurantId,
    period_month:   periodMonth,
    rescue_count:   count,
    amount_jpy:     Math.round(storePool * (count / totalRedeemed)),
    status:         'pending',
  }));

  const { error } = await admin
    .from('payouts')
    .upsert(payoutRows, { onConflict: 'restaurant_id,period_month' });

  if (error) {
    console.error('[cron/monthly-payout] upsert error:', error);
    return NextResponse.json({ error: 'DB error' }, { status: 500 });
  }

  return NextResponse.json({
    ok: true,
    period: periodMonth,
    total_revenue: totalRevenue,
    store_pool: storePool,
    stores: payoutRows.length,
    total_redeemed: totalRedeemed,
  });
}
