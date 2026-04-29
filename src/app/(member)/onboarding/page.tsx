import Link from 'next/link';
import { Hanko } from '@/components/shared/Hanko';

// LINE SVG icon
function LineIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 flex-shrink-0" aria-hidden="true">
      <path d="M12 3C6.48 3 2 6.58 2 11c0 2.86 1.85 5.36 4.62 6.78-.13.5-.83 3.07-.95 3.59-.15.66.24.65.5.47.21-.14 3.31-2.25 4.65-3.16.39.05.78.07 1.18.07 5.52 0 10-3.58 10-8s-4.48-8-10-8z" />
    </svg>
  );
}

export default function OnboardingPage() {
  return (
    <div
      className="min-h-screen flex flex-col px-7 pt-8 pb-7 relative overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #F5EFE4 0%, #ECE0CA 100%)',
      }}
    >
      {/* 装飾円（茜色） */}
      <div
        className="absolute rounded-full"
        style={{
          top: 60, right: -70,
          width: 280, height: 280,
          background: 'radial-gradient(circle, #E8B5AE 0%, #C8473C 70%)',
          opacity: 0.85,
        }}
        aria-hidden="true"
      />
      <div
        className="absolute rounded-full"
        style={{
          top: 110, right: 30,
          width: 180, height: 180,
          background: 'rgba(245,239,228,0.5)',
        }}
        aria-hidden="true"
      />

      {/* ロゴ行 */}
      <div className="flex items-center gap-2 relative z-10">
        <Hanko size="sm">応援</Hanko>
        <span
          className="font-display text-sumi-3 tracking-superwide"
          style={{ fontSize: 12 }}
        >
          MASUDA · SHIMANE
        </span>
      </div>

      {/* メインコピー */}
      <div className="flex-1 flex flex-col justify-end relative z-10">
        <h1
          className="font-display font-bold leading-[1.05] mb-1"
          style={{ fontSize: 56, letterSpacing: '-0.01em' }}
        >
          益田めし<br />応援団
        </h1>
        <p
          className="font-display text-akane-deep tracking-superwide mb-6"
          style={{ fontSize: 14 }}
        >
          MASUDA-MESHI ŌEN-DAN
        </p>
        <p className="text-sumi-2 leading-[1.8] mb-9" style={{ fontSize: 15, maxWidth: 280 }}>
          まちの飲食店の<br />
          余りものをすくい、<br />
          まちのごはんを未来へつなぐ。
        </p>

        {/* LINEログインCTA */}
        <Link
          href="/plans"
          className="flex items-center justify-center gap-2 rounded-pill font-sans font-semibold text-shiro tracking-wider transition-all active:scale-[0.98] mb-3"
          style={{
            height: 52,
            background: '#06C755',
            fontSize: 15,
            letterSpacing: '0.04em',
          }}
        >
          <LineIcon />
          <span>LINEで はじめる</span>
        </Link>

        <div className="flex justify-center items-center gap-2 text-sumi-3" style={{ fontSize: 12 }}>
          すでに会員の方は{' '}
          <Link href="/home" className="text-akane font-semibold">
            こちら
          </Link>
        </div>
      </div>
    </div>
  );
}
