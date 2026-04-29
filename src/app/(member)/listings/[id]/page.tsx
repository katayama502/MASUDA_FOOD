import Link from 'next/link';
import { BackIcon, HeartIcon, ClockIcon, PinIcon, SparkleIcon } from '@/components/shared/Icons';

type Priority = '大将' | 'おなじみ' | '全員';

const PRIORITY_STYLE: Record<Priority, { bg: string; color: string; label: string }> = {
  '大将':     { bg: '#1F1B17', color: '#F5EFE4', label: '大将優先' },
  'おなじみ': { bg: '#D9A441', color: '#1F1B17', label: 'おなじみ〜' },
  '全員':     { bg: '#6B8E4E', color: '#fff',    label: '全員可' },
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

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] text-sumi-3 mb-0.5">{label}</p>
      <p className="text-[14px] font-semibold">{value}</p>
    </div>
  );
}

// Mock data — replace with Supabase fetch
const LISTINGS: Record<string, {
  id: string; restaurant: string; genre: string; title: string;
  description: string; qty: number; qtyTotal: number;
  from: string; until: string; distance: string; img: string;
  tags: string[]; priority: Priority;
}> = {
  l1: {
    id: 'l1', restaurant: 'やま田食堂', genre: '和定食',
    title: '唐揚げ弁当',
    description: '鶏もも肉の唐揚げ4個＋ご飯＋小鉢。揚げたてを19時に詰め直しました。',
    qty: 3, qtyTotal: 5, from: '19:30', until: '21:00', distance: '0.4km',
    img: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop',
    tags: ['夕食', 'ボリューム'], priority: '大将',
  },
  l2: {
    id: 'l2', restaurant: '炭火 おりおり', genre: '居酒屋',
    title: '焼き鳥盛り合わせ',
    description: 'もも・つくね・皮・ぼんじり 計6本。タレ・塩 半々。',
    qty: 2, qtyTotal: 4, from: '20:00', until: '22:00', distance: '0.8km',
    img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&auto=format&fit=crop',
    tags: ['夕食', 'おつまみ'], priority: 'おなじみ',
  },
  l3: {
    id: 'l3', restaurant: 'パン工房 ことね', genre: 'ベーカリー',
    title: '本日のパン詰め合わせ',
    description: 'クロワッサン・あんパン・カンパーニュ等を5〜6点。明日の朝食にどうぞ。',
    qty: 1, qtyTotal: 6, from: '18:00', until: '19:30', distance: '1.2km',
    img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop',
    tags: ['朝食', 'パン'], priority: '全員',
  },
};

export default async function ListingDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const listing = LISTINGS[id] ?? LISTINGS.l1;

  return (
    <div className="min-h-screen bg-kinari pb-24">
      {/* Hero image */}
      <div className="relative h-[300px]" style={{ background: `url(${listing.img}) center/cover, #ddd` }}>
        <Link
          href="/home"
          className="absolute top-4 left-4 w-10 h-10 rounded-full bg-shiro/95 flex items-center justify-center shadow-2 cursor-pointer"
          aria-label="戻る"
        >
          <BackIcon />
        </Link>
        <button
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-shiro/95 flex items-center justify-center shadow-2 text-akane cursor-pointer"
          aria-label="お気に入り"
        >
          <HeartIcon />
        </button>
        {/* Gradient fade */}
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-kinari to-transparent" />
      </div>

      {/* Content */}
      <div className="px-[22px] pb-6 -mt-5 relative">
        {/* Badges */}
        <div className="flex flex-wrap gap-1.5 mb-2">
          <PriorityBadge priority={listing.priority} />
          {listing.tags.map(t => (
            <span
              key={t}
              className="text-[10px] bg-shiro border border-kinari-3 px-2 py-0.5 rounded-pill text-sumi-2"
            >
              #{t}
            </span>
          ))}
        </div>

        {/* Restaurant link */}
        <Link
          href={`/restaurants/r1`}
          className="inline-flex items-center gap-1 text-[12px] text-akane font-semibold cursor-pointer"
        >
          {listing.restaurant} · {listing.genre} <span className="text-[10px]">→</span>
        </Link>

        <h1 className="font-display text-[28px] font-bold mt-1 mb-3 leading-tight">
          {listing.title}
        </h1>
        <p className="text-[14px] leading-[1.8] text-sumi-2 mb-4">{listing.description}</p>

        {/* Stats grid */}
        <div className="bg-shiro border border-kinari-3 rounded-l p-4 grid grid-cols-2 gap-3.5 mb-4">
          <Stat label="受け取り時間" value={`${listing.from} 〜 ${listing.until}`} />
          <Stat label="距離" value={listing.distance} />
          <Stat
            label="残り"
            value={
              <span>
                <b
                  className="font-display text-[18px]"
                  style={{ color: listing.qty <= 1 ? '#C8473C' : '#1F1B17' }}
                >
                  {listing.qty}
                </b>{' '}
                / {listing.qtyTotal}
              </span>
            }
          />
          <Stat label="今月の利用" value="3 / 5 回" />
        </div>

        {/* Tip box */}
        <div className="bg-[#FFF7F1] border border-dashed border-akane-soft rounded-m px-3.5 py-3 flex gap-2.5 items-start mb-5">
          <span className="text-akane mt-0.5 flex-shrink-0"><SparkleIcon /></span>
          <p className="text-[12px] text-sumi-2 leading-[1.6]">
            <b>受け取りのコツ：</b>会員QRコードをお店の方に提示してください。受け取り時間内にお越しください。
          </p>
        </div>

        {/* CTA */}
        <Link
          href="/qr/rsv-001"
          className="block w-full bg-akane text-shiro text-center font-sans font-semibold rounded-pill py-[15px] text-[15px] tracking-wide hover:bg-akane-deep transition-colors active:scale-[0.98] cursor-pointer"
        >
          確保する（QRを発行）
        </Link>
        <p className="text-center text-[11px] text-sumi-3 mt-2.5">
          確保すると今月の利用が1回カウントされます
        </p>
      </div>
    </div>
  );
}
