import type { PlanKind } from '@/lib/supabase/types';

export const PLANS = {
  sanpo: {
    id: 'sanpo' as PlanKind,
    name: 'さんぽ',
    price: 800,
    priceId: process.env.STRIPE_PRICE_SANPO ?? '',
    rescue: 2,
    drink: 0,
    desc: '気軽に応援したい方へ',
  },
  onajimi: {
    id: 'onajimi' as PlanKind,
    name: 'おなじみ',
    price: 1500,
    priceId: process.env.STRIPE_PRICE_ONAJIMI ?? '',
    rescue: 5,
    drink: 2,
    desc: 'メイン層・常連さんに',
    featured: true,
  },
  taisho: {
    id: 'taisho' as PlanKind,
    name: '大将',
    price: 2500,
    priceId: process.env.STRIPE_PRICE_TAISHO ?? '',
    rescue: 12,
    drink: 4,
    desc: 'コアサポーター',
  },
} as const satisfies Record<PlanKind, {
  id: PlanKind;
  name: string;
  price: number;
  priceId: string;
  rescue: number;
  drink: number;
  desc: string;
  featured?: boolean;
}>;

export type Plan = typeof PLANS[PlanKind];

/** プランIDから月のレスキュー上限を返す */
export function getPlanRescueLimit(plan: PlanKind): number {
  return PLANS[plan].rescue;
}
