import Link from 'next/link';
import { Hanko } from '@/components/shared/Hanko';

// ── アイコン ──────────────────────────────────────────────
function BellIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-[22px] h-[22px]" aria-hidden="true">
      <path d="M6 17v-5a6 6 0 1112 0v5l1.5 2H4.5L6 17z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round"/>
      <path d="M10 20a2 2 0 004 0" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5" aria-hidden="true">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6"/>
      <path d="M12 7v5l3 2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"/>
    </svg>
  );
}

// ── 優先度バッジ ──────────────────────────────────────────
type Priority = '大将' | 'おなじみ' | '全員';
const PRIORITY_STYLE: Record<Priority, { bg: string; color: string; label: string }> = {
  '大将':   { bg: '#1F1B17', color: '#F5EFE4', label: '大将優先' },
  'おなじみ': { bg: '#D9A441', color: '#1F1B17', label: 'おなじみ〜' },
  '全員':   { bg: '#6B8E4E', color: '#fff',    label: '全員可' },
};

function PriorityBadge({ priority }: { priority: Priority }) {
  const s = PRIORITY_STYLE[priority];
  return (
    <span
      className="text-[10px] font-bold px-2 py-0.5 rounded-pill tracking-wider"
      style={{ background: s.bg, color: s.color }}
    >
      {s.label}
    </span>
  );
}

// ── モックデータ（実装時はSupabaseから取得） ──────────────
const LISTINGS = [
  {
    id: 'l1',
    restaurant: 'やま田食堂',
    genre: '和定食',
    title: '唐揚げ弁当',
    qty: 3,
    qtyTotal: 5,
    from: '19:30',
    until: '21:00',
    distance: '0.4km',
    img: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop',
    priority: '大将' as Priority,
  },
  {
    id: 'l2',
    restaurant: '炭火 おりおり',
    genre: '居酒屋',
    title: '焼き鳥盛り合わせ',
    qty: 2,
    qtyTotal: 4,
    from: '20:00',
    until: '22:00',
    distance: '0.8km',
    img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop',
    priority: 'おなじみ' as Priority,
  },
  {
    id: 'l3',
    restaurant: 'パン工房 ことね',
    genre: 'ベーカリー',
    title: '本日のパン詰め合わせ',
    qty: 1,
    qtyTotal: 6,
    from: '18:00',
    until: '19:30',
    distance: '1.2km',
    img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop',
    priority: '全員' as Priority,
  },
];

export default function HomePage() {
  const month = '4月';
  const used = 3;
  const max = 5;

  return (
    <div className="min-h-screen bg-kinari pb-24">
      {/* ── 挨拶ヘッダー ── */}
      <div className="px-5 pt-5 pb-2">
        <div className="flex justify-between items-center mb-3.5">
          <div>
            <p className="text-[12px] text-sumi-3">こんばんは、</p>
            <p className="font-display text-[20px] font-bold">のぞみ さん</p>
          </div>
          <Link
            href="/notifications"
            className="relative w-10 h-10 flex items-center justify-center rounded-full bg-shiro border border-kinari-3 cursor-pointer hover:bg-kinari-2 transition-colors"
            aria-label="通知を見る"
          >
            <BellIcon />
            {/* 未読ドット */}
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-akane" aria-label="未読あり" />
          </Link>
        </div>

        {/* 利用回数バナー */}
        <div
          className="relative rounded-l px-4.5 py-4 flex items-center gap-3.5 overflow-hidden"
          style={{ background: 'linear-gradient(120deg, #1F1B17 0%, #2D2620 100%)' }}
        >
          {/* 装飾円 */}
          <div
            className="absolute -right-5 -top-5 w-[110px] h-[110px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(200,71,60,0.5) 0%, transparent 70%)' }}
            aria-hidden="true"
          />
          <Hanko size="sm" className="flex-shrink-0">会員</Hanko>
          <div className="flex-1 relative">
            <p className="text-[11px] text-shiro/70 tracking-wider">おなじみプラン · {month}</p>
            <p className="font-display text-[18px] font-bold text-shiro mt-0.5">
              レスキュー{' '}
              <span className="text-akane-soft">{used}</span>
              {' '}/ {max}
            </p>
          </div>
          <Link
            href="/mypage"
            className="relative text-shiro text-[12px] px-3 py-2 rounded-pill border border-white/20 bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
          >
            詳細
          </Link>
        </div>
      </div>

      {/* ── セクションヘッダー ── */}
      <div className="px-5 pt-4 pb-2 flex justify-between items-baseline">
        <div>
          <p className="text-[11px] font-bold text-akane tracking-widest">NOW OPEN · 今夜</p>
          <h2 className="font-display text-[22px] font-bold mt-0.5">
            {LISTINGS.length}件 のレスキュー
          </h2>
        </div>
        <Link href="/community" className="text-[12px] text-akane font-semibold cursor-pointer">
          みんなの食卓 →
        </Link>
      </div>

      {/* ── 出品カード一覧 ── */}
      <div className="px-5 flex flex-col gap-3.5">
        {LISTINGS.map((listing, i) => (
          <Link
            key={listing.id}
            href={`/listings/${listing.id}`}
            className="fade-up block bg-shiro rounded-l overflow-hidden shadow-1 hover:-translate-y-0.5 hover:shadow-2 transition-all duration-[0.18s]"
            style={{ animationDelay: `${i * 0.04}s` }}
          >
            {/* 画像 */}
            <div
              className="relative h-40"
              style={{ background: `url(${listing.img}) center/cover, #ddd` }}
            >
              <div className="absolute top-3 left-3 flex gap-1.5">
                <PriorityBadge priority={listing.priority} />
              </div>
              <div
                className="absolute bottom-3 right-3 flex items-center gap-1 text-[11px] text-white px-2.5 py-1 rounded-pill"
                style={{ background: 'rgba(31,27,23,0.85)' }}
              >
                <ClockIcon />
                <span>{listing.from}–{listing.until}</span>
              </div>
            </div>

            {/* テキスト */}
            <div className="px-4 pt-3.5 pb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-[11px] text-sumi-3 tracking-wide">
                  {listing.restaurant} · {listing.genre}
                </span>
                <span className="text-[11px] text-sumi-3">{listing.distance}</span>
              </div>
              <p className="font-display font-bold text-[18px] leading-tight">
                {listing.title}
              </p>
              <div className="flex justify-between items-center mt-2.5">
                <p className="text-[12px] text-sumi-3">
                  残り{' '}
                  <span
                    className="font-display font-bold text-[18px]"
                    style={{ color: listing.qty <= 1 ? '#C8473C' : '#1F1B17' }}
                  >
                    {listing.qty}
                  </span>
                  /{listing.qtyTotal}
                </p>
                <span className="text-[12px] text-akane font-semibold">確保する →</span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
