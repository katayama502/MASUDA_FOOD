/**
 * POST /api/stripe/customer-portal
 * Stripe Customer Portal セッションを発行してリダイレクト
 */
import { NextRequest, NextResponse } from 'next/server';
import { createCustomerPortalSession } from '@/lib/actions/stripe';

export async function POST(_req: NextRequest) {
  const result = await createCustomerPortalSession();
  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({ url: result.data.portalUrl });
}
