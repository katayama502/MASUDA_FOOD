'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AppHeader } from '@/components/shared/AppHeader';
import { BrushUnderline } from '@/components/shared/BrushUnderline';
import { Hanko } from '@/components/shared/Hanko';

const PLANS = [
  { id: 'sanpo',   name: 'さんぽ',   price: 800,  rescue: '月2回まで' },
  { id: 'onajimi', name: 'おなじみ', price: 1500, rescue: '月5回まで' },
  { id: 'taisho',  name: '大将',     price: 2500, rescue: '無制限' },
];

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[11px] text-sumi-3 mb-0.5">{label}</p>
      <p className="text-[14px] font-semibold">{value}</p>
    </div>
  );
}

export default function PlanChangePage() {
  const [step, setStep] = useState<'select' | 'confirm-cancel' | 'done'>('select');
  const [pick, setPick] = useState('taisho');

  if (step === 'confirm-cancel') {
    return (
      <div className="min-h-screen bg-kinari">
        <AppHeader title="解約のご確認" backHref="/plan-change" />
        <div className="px-[22px] pb-8 flex flex-col gap-4">
          <div className="bg-shiro border border-kinari-3 rounded-l p-5">
            <p className="font-display text-[22px] font-bold leading-[1.4] mb-2.5">
              本当に応援を<br />
              <BrushUnderline>やめてしまう？</BrushUnderline>
            </p>
            <p className="text-[13px] leading-[1.8] text-sumi-2">
              あなたの会費の80%は、これまで12軒のお店の支えになってきました。一度立ち止まって考えてみてください。
            </p>
          </div>

          <div className="bg-[#FFF7F1] border border-dashed border-akane-soft rounded-m p-3.5">
            <p className="text-[11px] font-bold text-akane tracking-[0.1em] mb-2">YOUR FOOTPRINT</p>
            <div className="grid grid-cols-3 gap-2">
              <Stat label="累計応援"     value="¥4,500" />
              <Stat label="レスキュー"   value="12回" />
              <Stat label="出会ったお店" value="6軒" />
            </div>
          </div>

          <div className="flex flex-col gap-2.5">
            <Link
              href="/mypage"
              className="block w-full text-center bg-akane text-shiro font-semibold rounded-pill py-[15px] text-[15px] tracking-wide cursor-pointer"
            >
              応援を続ける
            </Link>
            <button
              onClick={() => setStep('done')}
              className="w-full text-center text-[13px] text-sumi-3 py-3 cursor-pointer"
            >
              それでも解約する →
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (step === 'done') {
    return (
      <div className="min-h-screen bg-kinari flex flex-col items-center px-7 pt-14 text-center">
        <Hanko size="md" className="mb-6">感謝</Hanko>
        <p className="font-display text-[26px] font-bold mb-2">ありがとう<br />ございました</p>
        <p className="text-[13px] text-sumi-2 leading-[1.8] mb-6">
          解約手続きが完了しました。<br />
          5月1日まではご利用いただけます。<br />
          またいつでも、戻ってきてください。
        </p>
        <Link
          href="/home"
          className="w-full block text-center bg-akane text-shiro font-semibold rounded-pill py-[15px] text-[15px] tracking-wide cursor-pointer"
        >
          ホームへ
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-kinari">
      <AppHeader title="プラン変更" backHref="/mypage" />

      <div className="px-5 pb-8">
        <p className="text-[12px] text-sumi-3 mb-3.5 leading-[1.7]">
          現在のプラン：<b className="text-sumi">おなじみ ¥1,500/月</b><br />
          変更は次回更新日（5/1）から適用されます
        </p>

        <div className="flex flex-col gap-3 mb-4">
          {PLANS.map(p => (
            <button
              key={p.id}
              onClick={() => setPick(p.id)}
              className={[
                'relative rounded-l border-[1.5px] p-4 text-left transition-all duration-[0.18s] cursor-pointer',
                pick === p.id
                  ? 'border-akane bg-[#FFF7F1]'
                  : 'border-kinari-3 bg-shiro hover:border-akane',
              ].join(' ')}
            >
              {pick === p.id && (
                <span className="absolute top-3.5 right-3.5 w-5 h-5 rounded-full bg-akane text-white flex items-center justify-center">
                  <svg viewBox="0 0 24 24" className="w-3 h-3" fill="none">
                    <path d="M5 12l4 4 10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                </span>
              )}
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-display font-bold text-[18px]">{p.name}</p>
                  <p className="text-[11px] text-sumi-3">{p.rescue}</p>
                </div>
                <div className="font-display font-bold text-[18px]">
                  ¥{p.price.toLocaleString()}
                  <span className="text-[10px] text-sumi-3">/月</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <Link
          href="/mypage"
          className="block w-full text-center bg-akane text-shiro font-semibold rounded-pill py-[15px] text-[15px] tracking-wide mb-3 cursor-pointer"
        >
          このプランに変更
        </Link>
        <button
          onClick={() => setStep('confirm-cancel')}
          className="w-full text-center text-[12px] text-sumi-3 py-3 underline cursor-pointer"
        >
          応援を解約する
        </button>
      </div>
    </div>
  );
}
