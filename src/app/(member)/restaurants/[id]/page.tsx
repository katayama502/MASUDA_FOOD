import Link from 'next/link';
import { BackIcon, HeartIcon, PinIcon, CheckIcon } from '@/components/shared/Icons';

function Stat({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div>
      <p className="text-[11px] text-sumi-3 mb-0.5">{label}</p>
      <p className="text-[14px] font-semibold">{value}</p>
    </div>
  );
}

// Mock — replace with Supabase fetch
const RESTAURANT = {
  id: 'r1',
  name: 'やま田食堂', genre: '和定食', joined: '2026年2月加入',
  hero: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop',
  address: '島根県益田市本町5-12',
  hours: '11:30〜14:00 / 17:30〜21:30', closed: '日曜定休',
  desc: '三代続く家庭の味。地元の野菜と石見和牛を使った定食が看板。余り物がでるのは主に夜営業の終盤。',
  owner: '山田 健一さん', rescued: 42,
  menu: [
    { name: '唐揚げ定食',         price: 980  },
    { name: '石見和牛コロッケ定食', price: 1200 },
    { name: '鯖の塩焼き定食',      price: 880  },
    { name: '本日の煮物 小鉢',     price: 380  },
  ],
  history: [
    { date: '4/26', title: '唐揚げ弁当',    qty: 5, claimed: 5 },
    { date: '4/22', title: '肉じゃが 小鉢', qty: 3, claimed: 3 },
    { date: '4/18', title: '鯖の塩焼き',    qty: 2, claimed: 2 },
    { date: '4/14', title: '親子丼',        qty: 4, claimed: 4 },
  ],
};

export default function RestaurantPage() {
  const r = RESTAURANT;

  return (
    <div className="min-h-screen bg-kinari pb-24">
      {/* Hero */}
      <div className="relative h-[220px]" style={{ background: `url(${r.hero}) center/cover, #ddd` }}>
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
        <div className="absolute bottom-0 inset-x-0 h-20 bg-gradient-to-t from-kinari to-transparent" />
      </div>

      {/* Content */}
      <div className="px-[22px] pb-6 -mt-6 relative">
        <p className="text-[11px] text-sumi-3 tracking-[0.06em]">{r.genre} · {r.joined}</p>
        <h1 className="font-display text-[28px] font-bold mt-0.5 mb-1">{r.name}</h1>
        <div className="flex items-center gap-1.5 text-[12px] text-sumi-2 mb-3.5">
          <PinIcon /><span>{r.address}</span>
        </div>
        <p className="text-[13px] leading-[1.8] text-sumi-2 mb-4">{r.desc}</p>

        {/* Stats */}
        <div className="bg-shiro border border-kinari-3 rounded-l p-4 grid grid-cols-2 gap-3.5 mb-5">
          <Stat label="営業時間" value={r.hours} />
          <Stat label="定休日"   value={r.closed} />
          <Stat label="店主"     value={r.owner} />
          <Stat
            label="累計レスキュー"
            value={<span><b className="font-display text-[18px]">{r.rescued}</b> 食</span>}
          />
        </div>

        {/* Menu */}
        <h2 className="font-display text-[16px] font-bold mb-2.5">看板メニュー</h2>
        <div className="bg-shiro border border-kinari-3 rounded-l overflow-hidden mb-5">
          {r.menu.map((m, i) => (
            <div
              key={i}
              className={`flex justify-between px-4 py-3.5 ${i < r.menu.length - 1 ? 'border-b border-kinari-3' : ''}`}
            >
              <span className="text-[14px]">{m.name}</span>
              <span className="font-display font-bold text-[14px]">¥{m.price.toLocaleString()}</span>
            </div>
          ))}
        </div>

        {/* History */}
        <h2 className="font-display text-[16px] font-bold mb-2.5">過去の出品</h2>
        <div className="flex flex-col gap-2">
          {r.history.map((h, i) => (
            <div key={i} className="bg-shiro border border-kinari-3 rounded-m px-3.5 py-2.5 flex items-center gap-3">
              <span className="font-display text-[12px] text-sumi-3 w-9 flex-shrink-0">{h.date}</span>
              <span className="flex-1 text-[13px] font-semibold">{h.title}</span>
              <span className="text-[11px] text-sumi-3">{h.claimed}/{h.qty} 確保</span>
              <span className="text-wakana flex-shrink-0"><CheckIcon /></span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
