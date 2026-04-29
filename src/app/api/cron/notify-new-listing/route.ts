/**
 * GET /api/cron/notify-new-listing
 * Vercel Cron（2分おき）: 未通知の新規出品を LINE でプッシュ
 */
import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/supabase/admin';

function verifyCronSecret(req: NextRequest): boolean {
  const auth = req.headers.get('authorization');
  return auth === `Bearer ${process.env.CRON_SECRET}`;
}

// プランの優先順位（大将 → おなじみ → さんぽ）
const PLAN_DELAY: Record<string, number> = {
  taisho:  0,
  onajimi: 5 * 60 * 1000,   // 5分後
  sanpo:   10 * 60 * 1000,  // 10分後
};

export async function GET(req: NextRequest) {
  if (!verifyCronSecret(req)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const admin = createAdminClient();
  const now = new Date();

  // 未通知の open 出品を取得
  const { data: listings } = await admin
    .from('food_listings')
    .select('id, title, pickup_from, pickup_until, restaurants(name)')
    .eq('status', 'open')
    .is('notified_at', null)
    .lte('created_at', now.toISOString());

  if (!listings || listings.length === 0) {
    return NextResponse.json({ ok: true, notified: 0 });
  }

  let notified = 0;

  for (const listing of listings) {
    const restaurant = Array.isArray(listing.restaurants)
      ? listing.restaurants[0]
      : listing.restaurants;
    const restaurantName = restaurant?.name ?? '加盟店';

    // アクティブ会員の line_user_id を取得（プラン優先順）
    const { data: members } = await admin
      .from('subscriptions')
      .select('user_id, plan, users(line_user_id, display_name)')
      .eq('status', 'active');

    if (!members) continue;

    // 優先順にグループ化
    const grouped: Record<string, { line_user_id: string; display_name: string }[]> = {
      taisho: [], onajimi: [], sanpo: [],
    };

    for (const m of members) {
      const user = Array.isArray(m.users) ? m.users[0] : m.users;
      if (user?.line_user_id) {
        grouped[m.plan]?.push({
          line_user_id: user.line_user_id,
          display_name: user.display_name ?? '会員',
        });
      }
    }

    // LINE Messaging API でプッシュ（プラン別遅延送信は本実装ではQueue推奨）
    // MVP: 全員に即時送信（遅延はv1.1で実装）
    const allTargets = [
      ...grouped.taisho,
      ...grouped.onajimi,
      ...grouped.sanpo,
    ].filter(u => u.line_user_id);

    if (allTargets.length === 0) continue;

    const message = {
      type: 'text',
      text: `🍱 ${restaurantName}から「${listing.title}」が出ました！\n受け取り: ${listing.pickup_from.slice(11, 16)}〜${listing.pickup_until.slice(11, 16)}\n益田めし応援団アプリで確保→`,
    };

    // LINE multicast（50人以下なら multicast、それ以上は narrows broadcast）
    const lineIds = allTargets.map(u => u.line_user_id);
    try {
      await fetch('https://api.line.me/v2/bot/message/multicast', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${process.env.LINE_MESSAGING_CHANNEL_ACCESS_TOKEN}`,
        },
        body: JSON.stringify({ to: lineIds, messages: [message] }),
      });
    } catch (e) {
      console.error('[cron/notify] LINE push failed:', e);
    }

    // notified_at を記録
    await admin
      .from('food_listings')
      .update({ notified_at: now.toISOString() })
      .eq('id', listing.id);

    notified++;
  }

  return NextResponse.json({ ok: true, notified });
}
