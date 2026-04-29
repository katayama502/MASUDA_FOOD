'use server';

import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';

type ActionResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: string };

const upsertListingSchema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(1).max(100),
  description: z.string().max(500).optional(),
  qty_total: z.number().int().min(1).max(20),
  pickup_from: z.string().datetime(),
  pickup_until: z.string().datetime(),
  photo_url: z.string().url().optional().nullable(),
  tags: z.array(z.string()).optional(),
});

export async function upsertListing(
  raw: unknown,
): Promise<ActionResult<{ id: string }>> {
  const parse = upsertListingSchema.safeParse(raw);
  if (!parse.success) {
    return { ok: false, error: parse.error.issues[0]?.message ?? '入力が不正です' };
  }
  const input = parse.data;

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'ログインが必要です' };

  // 自分の店舗を取得
  const { data: restaurant } = await supabase
    .from('restaurants')
    .select('id')
    .eq('owner_id', user.id)
    .single();

  if (!restaurant) return { ok: false, error: '加盟店情報が見つかりません' };

  if (input.id) {
    // 更新
    const { data, error } = await supabase
      .from('food_listings')
      .update({ ...input })
      .eq('id', input.id)
      .select('id')
      .single();
    if (error || !data) return { ok: false, error: '更新に失敗しました' };
    return { ok: true, data: { id: data.id } };
  } else {
    // 新規作成
    const { data, error } = await supabase
      .from('food_listings')
      .insert({ ...input, restaurant_id: restaurant.id })
      .select('id')
      .single();
    if (error || !data) return { ok: false, error: '投稿に失敗しました' };
    return { ok: true, data: { id: data.id } };
  }
}

export async function closeListing(listingId: string): Promise<ActionResult> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'ログインが必要です' };

  const { error } = await supabase
    .from('food_listings')
    .update({ status: 'closed' })
    .eq('id', listingId);

  if (error) return { ok: false, error: '更新に失敗しました' };
  return { ok: true, data: undefined };
}
