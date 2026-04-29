'use client';

import Link from 'next/link';
import { BackIcon, CheckIcon } from '@/components/shared/Icons';
import { Hanko } from '@/components/shared/Hanko';
import { useMemo, useState, useEffect } from 'react';
import { createClient } from '@/lib/supabase/client';

function FakeQR({ claimed }: { claimed: boolean }) {
  const cells = useMemo(() => {
    const arr: number[][] = [];
    for (let y = 0; y < 21; y++) {
      const row: number[] = [];
      for (let x = 0; x < 21; x++) {
        row.push(((x * 31 + y * 17 + 7 * (x + y)) % 7) > 3 ? 1 : 0);
      }
      arr.push(row);
    }
    const placeMarker = (cx: number, cy: number) => {
      for (let y = 0; y < 7; y++)
        for (let x = 0; x < 7; x++) {
          const isBorder = x === 0 || y === 0 || x === 6 || y === 6;
          const isCenter = x >= 2 && x <= 4 && y >= 2 && y <= 4;
          arr[cy + y][cx + x] = isBorder || isCenter ? 1 : 0;
        }
    };
    placeMarker(0, 0); placeMarker(14, 0); placeMarker(0, 14);
    return arr;
  }, []);

  return (
    <div
      className="relative w-full aspect-square grid"
      style={{
        gridTemplateColumns: 'repeat(21, 1fr)',
        gridTemplateRows: 'repeat(21, 1fr)',
        gap: 1,
        filter: claimed ? 'blur(2px) opacity(0.4)' : 'none',
        transition: 'filter 0.5s',
      }}
    >
      {cells.flat().map((c, i) => (
        <div key={i} style={{ background: c ? '#1F1B17' : 'transparent', borderRadius: 1 }} />
      ))}
      {claimed && (
        <div className="absolute inset-0 flex items-center justify-center">
          <span
            className="bg-akane text-shiro font-display font-bold text-[18px] px-4 py-2 rounded-pill tracking-wider"
            style={{ transform: 'rotate(-8deg)' }}
          >
            使用済み
          </span>
        </div>
      )}
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] text-sumi-3 mb-0.5">{label}</p>
      <p className="text-[14px] font-semibold">{value}</p>
    </div>
  );
}

export default function QRPage({ params: paramsPromise }: { params: Promise<{ reservationId: string }> }) {
  const [reservationId, setReservationId] = useState<string | null>(null);
  const [claimed, setClaimed] = useState(false);

  // Resolve params
  useEffect(() => {
    paramsPromise.then(p => setReservationId(p.reservationId));
  }, [paramsPromise]);

  // Supabase Realtime: reservation が redeemed に変わったら即時反映
  useEffect(() => {
    if (!reservationId) return;

    const supabase = createClient();
    const channel = supabase
      .channel(`reservation:${reservationId}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'reservations',
          filter: `id=eq.${reservationId}`,
        },
        payload => {
          if (payload.new && payload.new.status === 'redeemed') {
            setClaimed(true);
          }
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [reservationId]);

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: 'linear-gradient(180deg, #1F1B17 0%, #3A332D 100%)' }}
    >
      {/* Header */}
      <header className="flex items-center gap-3 px-4 h-[52px]">
        <Link
          href="/home"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-white/10 text-shiro cursor-pointer"
          aria-label="戻る"
        >
          <BackIcon />
        </Link>
        <h1 className="font-display text-[17px] font-semibold text-shiro tracking-wider">受け取りQR</h1>
      </header>

      <div className="px-7 py-5 flex flex-col items-center">
        {/* Status heading */}
        {!claimed ? (
          <>
            <p className="font-display text-[14px] text-akane-soft tracking-[0.2em] mb-1">OEN-DAN PASS</p>
            <p className="font-display text-[22px] font-bold text-shiro mb-4">お店で見せてください</p>
          </>
        ) : (
          <div className="flex flex-col items-center mb-4 scale-in">
            <div className="w-20 h-20 rounded-full bg-wakana flex items-center justify-center mb-4">
              <CheckIcon className="w-11 h-11 text-white" />
            </div>
            <p className="font-display text-[26px] font-bold text-shiro mb-1">受け取り完了</p>
            <p className="text-[13px] text-shiro/70">ありがとうございました</p>
          </div>
        )}

        {/* QR ticket card */}
        <div
          className="paper w-full rounded-l px-[22px] py-[26px] text-sumi relative"
          style={{ boxShadow: '0 18px 40px rgba(0,0,0,0.4)' }}
        >
          <div className="flex justify-between items-start mb-3">
            <div>
              <p className="text-[11px] text-sumi-3">やま田食堂</p>
              <p className="font-display font-bold text-[17px]">唐揚げ弁当</p>
            </div>
            <Hanko size="sm">応援</Hanko>
          </div>

          {/* QR code */}
          <div className="border border-kinari-3 rounded-m p-3">
            <FakeQR claimed={claimed} />
          </div>

          <div className="flex justify-between mt-3.5 pt-3.5 border-t border-dashed border-kinari-3">
            <Stat label="受け取り時間" value="19:30 - 21:00" />
            <Stat label="会員ID" value="MS-08821" />
          </div>
        </div>

        {/* Footer text / CTA */}
        {!claimed ? (
          <p className="text-[12px] text-shiro/65 mt-4 text-center leading-[1.7]">
            このQRコードはお店の方が読み取ります<br />
            有効時間：21:00まで
          </p>
        ) : (
          <Link
            href="/home"
            className="mt-5 w-full block text-center bg-akane text-shiro font-semibold rounded-pill py-[15px] text-[15px] tracking-wide cursor-pointer"
          >
            ホームへ戻る
          </Link>
        )}
      </div>
    </div>
  );
}
