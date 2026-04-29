/**
 * GET /api/cron/expire-reservations
 * Vercel Cron（30分おき）: pickup_until を過ぎた未受取予約を expired に更新
 */
import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function GET(req: NextRequest) {
  const auth = req.headers.get('authorization');
  if (auth !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const admin = createAdminClient();
  const now = new Date().toISOString();

  // pickup_until を過ぎた claimed の予約を取得
  const { data: overdueReservations } = await admin
    .from('reservations')
    .select('id, listing_id')
    .eq('status', 'claimed');

  if (!overdueReservations || overdueReservations.length === 0) {
    return NextResponse.json({ ok: true, expired: 0 });
  }

  // 各予約の listing.pickup_until を確認
  const expiredIds: string[] = [];

  for (const rsv of overdueReservations) {
    const { data: listing } = await admin
      .from('food_listings')
      .select('pickup_until')
      .eq('id', rsv.listing_id)
      .single();

    if (listing && listing.pickup_until < now) {
      expiredIds.push(rsv.id);
    }
  }

  if (expiredIds.length === 0) {
    return NextResponse.json({ ok: true, expired: 0 });
  }

  // バッチ更新
  await admin
    .from('reservations')
    .update({ status: 'expired' })
    .in('id', expiredIds);

  // qty_claimed を戻す（trigger がないため手動）
  // 実装: 各 listing ごとに expired 数を集計して qty_claimed を減算
  // MVP では trigger に任せる設計に変更可

  return NextResponse.json({ ok: true, expired: expiredIds.length });
}
