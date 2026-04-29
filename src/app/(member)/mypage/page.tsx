import Link from 'next/link';
import { AppHeader } from '@/components/shared/AppHeader';
import { CheckIcon } from '@/components/shared/Icons';

function ProgressBar({ value, max, color }: { value: number; max: number; color: string }) {
  const pct = Math.round((value / max) * 100);
  return (
    <div className="h-1.5 rounded-full overflow-hidden bg-white/15">
      <div className="h-full rounded-full transition-all" style={{ width: `${pct}%`, background: color }} />
    </div>
  );
}

const HISTORY = [
  { date: '4/26', restaurant: 'やま田食堂',     title: '唐揚げ弁当' },
  { date: '4/22', restaurant: '炭火 おりおり',  title: '焼き鳥3本' },
  { date: '4/18', restaurant: 'パン工房 ことね', title: 'パン詰め合わせ' },
];

export default function MyPage() {
  return (
    <div className="min-h-screen bg-kinari pb-24">
      <AppHeader title="マイページ" backHref="/home" />

      <div className="px-5 pb-4 flex flex-col gap-4">
        {/* Profile card */}
        <div className="bg-shiro border border-kinari-3 rounded-l p-4 flex items-center gap-3.5">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center font-display text-[22px] font-bold text-shiro flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #C8473C, #D9A441)' }}
          >
            の
          </div>
          <div>
            <p className="font-display text-[18px] font-bold">のぞみ さん</p>
            <p className="text-[11px] text-sumi-3">会員ID: MS-08821 · 2026年4月加入</p>
          </div>
        </div>

        {/* Plan card */}
        <div
          className="rounded-l p-5 relative overflow-hidden text-shiro"
          style={{ background: '#1F1B17' }}
        >
          {/* Decorative circle */}
          <div
            className="absolute -top-7 -right-7 w-36 h-36 rounded-full pointer-events-none"
            style={{ background: 'rgba(200,71,60,0.3)' }}
            aria-hidden="true"
          />
          <p className="text-[11px] text-shiro/60 tracking-[0.2em] relative">CURRENT PLAN</p>
          <p className="font-display text-[32px] font-bold mt-1 relative">おなじみ</p>
          <p className="text-[12px] text-shiro/70 mb-4 relative">¥1,500/月 · 次回更新 5/1</p>

          {/* Food rescue progress */}
          <div className="mb-3.5 relative">
            <div className="flex justify-between text-[11px] mb-1.5">
              <span className="text-shiro/70">フードレスキュー</span>
              <span className="font-display font-bold">3 / 5 回</span>
            </div>
            <ProgressBar value={3} max={5} color="#C8473C" />
          </div>

          {/* Drink progress */}
          <div className="relative">
            <div className="flex justify-between text-[11px] mb-1.5">
              <span className="text-shiro/70">ワンドリンク</span>
              <span className="font-display font-bold">1 / 2 回</span>
            </div>
            <ProgressBar value={1} max={2} color="#D9A441" />
          </div>
        </div>

        {/* Activity history */}
        <div>
          <h2 className="font-display text-[15px] font-bold mb-2.5">応援の足あと</h2>
          <div className="bg-shiro border border-kinari-3 rounded-l overflow-hidden">
            {HISTORY.map((a, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-3.5 py-3 ${i < HISTORY.length - 1 ? 'border-b border-kinari-3' : ''}`}
              >
                <span className="font-display text-[13px] text-sumi-3 w-9 flex-shrink-0">{a.date}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-[13px] font-semibold truncate">{a.title}</p>
                  <p className="text-[11px] text-sumi-3">{a.restaurant}</p>
                </div>
                <span className="text-wakana flex-shrink-0">
                  <CheckIcon />
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Plan change CTA */}
        <Link
          href="/plan-change"
          className="block w-full text-center border border-sumi-3/30 rounded-pill py-[13px] text-[14px] font-medium text-sumi-2 hover:bg-kinari-2 transition-colors cursor-pointer"
        >
          プランを変更する
        </Link>
      </div>
    </div>
  );
}
