import Link from 'next/link';
import { BrushUnderline } from '@/components/shared/BrushUnderline';

const PLANS = [
  {
    id: 'sanpo',
    name: 'さんぽ',
    price: 800,
    rescue: '月2回まで',
    drink: '—',
    desc: '気軽に応援したい方へ',
    featured: false,
  },
  {
    id: 'onajimi',
    name: 'おなじみ',
    price: 1500,
    rescue: '月5回まで',
    drink: 'ワンドリンク × 2',
    desc: 'メイン層・常連さんに',
    featured: true,
  },
  {
    id: 'taisho',
    name: '大将',
    price: 2500,
    rescue: '無制限',
    drink: 'ワンドリンク無制限 + 優先通知',
    desc: 'コアサポーター',
    featured: false,
  },
];

function BackIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-5 h-5" aria-hidden="true">
      <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-xs">
      <span className="text-sumi-3">{label}</span>
      <span className="font-semibold text-sumi">{value}</span>
    </div>
  );
}

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-kinari">
      {/* Header */}
      <header className="flex items-center gap-3 px-4 h-[52px]">
        <Link
          href="/onboarding"
          className="w-9 h-9 flex items-center justify-center rounded-full bg-sumi/[0.04] hover:bg-sumi/[0.08] transition-colors cursor-pointer"
          aria-label="戻る"
        >
          <BackIcon />
        </Link>
        <h1 className="font-display text-[17px] font-semibold tracking-wider">
          プランをえらぶ
        </h1>
      </header>

      <div className="px-5 pb-10">
        {/* Step indicator + headline */}
        <div className="mb-5">
          <p className="text-[11px] font-bold text-akane tracking-widest mb-1.5">
            STEP 2 / 2
          </p>
          <h2 className="font-display text-2xl leading-[1.4] mb-2">
            あなたは{' '}
            <BrushUnderline>どの応援</BrushUnderline>
            <br />
            がしたい？
          </h2>
          <p className="text-sumi-3 text-[13px] leading-[1.7]">
            月額会費は加盟店プールへ。利用がなくても、お店の応援になります。
          </p>
        </div>

        {/* Plan cards */}
        <div className="flex flex-col gap-3.5">
          {PLANS.map((plan) => (
            <Link
              key={plan.id}
              href={`/checkout?plan_id=${plan.id}`}
              className={[
                'relative rounded-l border-[1.5px] p-[18px_20px] block transition-all duration-[0.18s]',
                plan.featured
                  ? 'border-akane bg-[#FFF7F1]'
                  : 'border-kinari-3 bg-shiro hover:border-akane',
              ].join(' ')}
            >
              {plan.featured && (
                <span className="absolute -top-[10px] right-4 bg-akane text-shiro text-[10px] font-bold px-3 py-1 rounded-pill tracking-wider">
                  おすすめ
                </span>
              )}
              <div className="flex justify-between items-start mb-2.5">
                <div>
                  <p className="font-display font-bold text-[22px] leading-tight">{plan.name}</p>
                  <p className="text-[12px] text-sumi-3 mt-0.5">{plan.desc}</p>
                </div>
                <div className="text-right">
                  <span className="font-display font-bold text-2xl">
                    ¥{plan.price.toLocaleString()}
                  </span>
                  <span className="text-[11px] text-sumi-3 ml-0.5">/月</span>
                </div>
              </div>
              <div className="flex flex-col gap-1.5 pt-2.5 border-t border-dashed border-kinari-3">
                <Row label="フードレスキュー" value={plan.rescue} />
                <Row label="来店ドリンク" value={plan.drink} />
              </div>
            </Link>
          ))}
        </div>

        <p className="text-center text-[11px] text-sumi-3 mt-4 leading-[1.6]">
          いつでも変更・解約OK / Stripeで安全に決済
        </p>
      </div>
    </div>
  );
}
