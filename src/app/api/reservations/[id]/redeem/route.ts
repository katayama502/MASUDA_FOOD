/**
 * POST /api/reservations/[id]/redeem
 * 店舗側のQRスキャン後、reservation を redeemed に更新
 */
import { NextRequest, NextResponse } from 'next/server';
import { redeemReservation } from '@/lib/actions/reservations';

export async function POST(
  _req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  const result = await redeemReservation(id);

  if (!result.ok) {
    return NextResponse.json({ error: result.error }, { status: 400 });
  }
  return NextResponse.json({ ok: true });
}
