'use client';

import { useEffect, useState } from 'react';
import { AppHeader } from '@/components/shared/AppHeader';
import { CheckIcon } from '@/components/shared/Icons';
import Link from 'next/link';

export default function StoreScanPage() {
  const [done, setDone] = useState(false);

  // Simulate scan (replace with html5-qrcode library)
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 3000);
    return () => clearTimeout(t);
  }, []);

  return (
    <div className="min-h-screen bg-sumi text-shiro">
      <AppHeader title="QRを読み取り" backHref="/store/dashboard" dark />

      {!done && (
        <div className="px-7 py-5">
          {/* Viewfinder */}
          <div className="relative aspect-square max-w-[280px] mx-auto my-5 bg-black/80 rounded-l overflow-hidden flex items-center justify-center">
            {/* Corner brackets */}
            {[
              ['top-4 left-4',    'border-t-[3px] border-l-[3px]'],
              ['top-4 right-4',   'border-t-[3px] border-r-[3px]'],
              ['bottom-4 left-4', 'border-b-[3px] border-l-[3px]'],
              ['bottom-4 right-4','border-b-[3px] border-r-[3px]'],
            ].map(([pos, border], i) => (
              <div
                key={i}
                className={`absolute w-8 h-8 rounded border-akane ${pos} ${border}`}
              />
            ))}
            {/* Scanning line */}
            <div
              className="pulse w-[70%] h-0.5 bg-akane"
              style={{ boxShadow: '0 0 12px #C8473C' }}
            />
            <p className="absolute -bottom-7 inset-x-0 text-center text-[12px] text-shiro/70">
              QRをカメラに向けてください
            </p>
          </div>
          <p className="text-center text-[13px] text-shiro/70 mt-14 leading-[1.7]">
            会員のスマホ画面にあるQRを読み取ると、<br />利用回数が自動で記録されます。
          </p>
        </div>
      )}

      {done && (
        <div className="scale-in px-7 py-10 flex flex-col items-center">
          <div className="w-[88px] h-[88px] rounded-full bg-wakana flex items-center justify-center mb-4">
            <CheckIcon className="w-12 h-12 text-white" />
          </div>
          <p className="font-display text-[26px] font-bold">受け取り完了！</p>
          <p className="text-[13px] text-shiro/70 mt-1 mb-6">のぞみさん · 唐揚げ弁当</p>

          <div className="bg-white/[0.06] border border-white/10 rounded-m px-4 py-3.5 w-full mb-6">
            <div className="flex justify-between text-[12px] mb-1.5">
              <span className="text-shiro/70">本日の累計</span>
              <span className="font-display font-bold">3 / 5 件</span>
            </div>
            <div className="flex justify-between text-[12px]">
              <span className="text-shiro/70">今月の精算予定</span>
              <span className="font-display font-bold">¥18,200 → ¥19,500</span>
            </div>
          </div>

          <Link
            href="/store/dashboard"
            className="block w-full text-center bg-akane text-shiro font-semibold rounded-pill py-[15px] text-[15px] tracking-wide cursor-pointer"
          >
            続けて読み取る
          </Link>
        </div>
      )}
    </div>
  );
}
