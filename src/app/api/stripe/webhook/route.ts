/**
 * POST /api/stripe/webhook
 * Stripe イベントを受信し、DB を同期する
 */
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { getStripe } from '@/lib/stripe/client';
import { createAdminClient } from '@/lib/supabase/admin';
import type { PlanKind, SubscriptionStatus } from '@/lib/supabase/types';

// Next.js で raw body を受け取るために bodyParser を無効化
export const runtime = 'nodejs';

function stripeStatusToDb(status: Stripe.Subscription.Status): SubscriptionStatus {
  const map: Record<string, SubscriptionStatus> = {
    trialing:        'trialing',
    active:          'active',
    past_due:        'past_due',
    canceled:        'canceled',
    incomplete:      'incomplete',
    incomplete_expired: 'canceled',
    unpaid:          'past_due',
  };
  return map[status] ?? 'incomplete';
}

async function upsertSubscription(sub: Stripe.Subscription) {
  const admin = createAdminClient();
  const userId = sub.metadata?.user_id;
  const plan   = sub.metadata?.plan as PlanKind | undefined;

  if (!userId || !plan) {
    console.warn('[webhook] subscription missing metadata:', sub.id);
    return;
  }

  await admin.from('subscriptions').upsert({
    stripe_subscription_id: sub.id,
    stripe_customer_id:     sub.customer as string,
    user_id:                userId,
    plan:                   plan,
    status:                 stripeStatusToDb(sub.status),
    current_period_start:   new Date((sub as Stripe.Subscription & { current_period_start: number }).current_period_start * 1000).toISOString(),
    current_period_end:     new Date((sub as Stripe.Subscription & { current_period_end: number }).current_period_end * 1000).toISOString(),
    cancel_at_period_end:   sub.cancel_at_period_end,
  }, { onConflict: 'stripe_subscription_id' });
}

export async function POST(req: NextRequest) {
  const rawBody = await req.text();
  const signature = req.headers.get('stripe-signature');

  if (!signature) {
    return NextResponse.json({ error: 'No signature' }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = getStripe().webhooks.constructEvent(
      rawBody,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!,
    );
  } catch (err) {
    console.error('[webhook] signature verification failed:', err);
    return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
  }

  const admin = createAdminClient();

  // 冪等性チェック
  const { data: alreadyProcessed } = await admin
    .from('processed_stripe_events')
    .select('id')
    .eq('id', event.id)
    .single();

  if (alreadyProcessed) {
    return NextResponse.json({ ok: true, duplicate: true });
  }

  try {
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        if (session.mode === 'subscription' && session.subscription) {
          const sub = await getStripe().subscriptions.retrieve(
            session.subscription as string,
          );
          await upsertSubscription(sub);
        }
        break;
      }

      case 'customer.subscription.created':
      case 'customer.subscription.updated': {
        const sub = event.data.object as Stripe.Subscription;
        await upsertSubscription(sub);
        break;
      }

      case 'customer.subscription.deleted': {
        const sub = event.data.object as Stripe.Subscription;
        await admin
          .from('subscriptions')
          .update({ status: 'canceled' })
          .eq('stripe_subscription_id', sub.id);
        break;
      }

      case 'invoice.payment_failed': {
        const invoice = event.data.object as Stripe.Invoice;
        if (invoice.subscription) {
          await admin
            .from('subscriptions')
            .update({ status: 'past_due' })
            .eq('stripe_subscription_id', invoice.subscription as string);
        }
        // TODO: 会員へ通知を送る
        break;
      }

      case 'account.updated': {
        // Stripe Connect オンボーディング完了を検出
        const account = event.data.object as Stripe.Account;
        if (account.charges_enabled) {
          await admin
            .from('restaurants')
            .update({ stripe_connect_account_id: account.id })
            .eq('stripe_connect_account_id', account.id);
        }
        break;
      }

      default:
        // 未処理のイベントは無視
        break;
    }

    // 処理済みとして記録
    await admin
      .from('processed_stripe_events')
      .insert({ id: event.id });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[webhook] handler error:', err);
    return NextResponse.json({ error: 'Handler failed' }, { status: 500 });
  }
}
