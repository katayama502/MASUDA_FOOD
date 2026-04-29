'use server';

import { z } from 'zod';
import { createClient } from '@/lib/supabase/server';
import { getStripe } from '@/lib/stripe/client';
import { PLANS } from '@/lib/stripe/products';
import type { PlanKind } from '@/lib/supabase/types';

type ActionResult<T = void> =
  | { ok: true; data: T }
  | { ok: false; error: string };

// ── selectPlan: Stripe Checkout Session を作成して URL を返す ─
export async function selectPlan(
  plan: PlanKind,
): Promise<ActionResult<{ checkoutUrl: string }>> {
  if (!PLANS[plan]) return { ok: false, error: '無効なプランです' };

  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'ログインが必要です' };

  const stripe = getStripe();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  // 既存の Stripe Customer を取得 or 作成
  const { data: profile } = await supabase
    .from('users')
    .select('stripe_customer_id, display_name, email')
    .eq('id', user.id)
    .single();

  let customerId = profile?.stripe_customer_id;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: profile?.email ?? user.email ?? undefined,
      name: profile?.display_name ?? undefined,
      metadata: { supabase_user_id: user.id },
    });
    customerId = customer.id;

    await supabase
      .from('users')
      .update({ stripe_customer_id: customerId })
      .eq('id', user.id);
  }

  // Checkout Session 作成
  const session = await stripe.checkout.sessions.create({
    mode: 'subscription',
    customer: customerId,
    line_items: [{ price: PLANS[plan].priceId, quantity: 1 }],
    success_url: `${siteUrl}/home?checkout=success`,
    cancel_url: `${siteUrl}/plans`,
    subscription_data: {
      metadata: { user_id: user.id, plan },
    },
  });

  if (!session.url) return { ok: false, error: '決済セッションの作成に失敗しました' };
  return { ok: true, data: { checkoutUrl: session.url } };
}

// ── createCustomerPortalSession: プラン変更・解約 ────────────
export async function createCustomerPortalSession(): Promise<ActionResult<{ portalUrl: string }>> {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) return { ok: false, error: 'ログインが必要です' };

  const { data: profile } = await supabase
    .from('users')
    .select('stripe_customer_id')
    .eq('id', user.id)
    .single();

  if (!profile?.stripe_customer_id) return { ok: false, error: '決済情報が見つかりません' };

  const stripe = getStripe();
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000';

  const session = await stripe.billingPortal.sessions.create({
    customer: profile.stripe_customer_id,
    return_url: `${siteUrl}/mypage`,
  });

  return { ok: true, data: { portalUrl: session.url } };
}
