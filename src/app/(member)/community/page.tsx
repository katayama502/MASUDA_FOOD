import { AppHeader } from '@/components/shared/AppHeader';
import { HeartIcon, ShareIcon, PlusIcon } from '@/components/shared/Icons';
import Link from 'next/link';

const POSTS = [
  {
    id: 'c1', user: 'のぞみ', avatar: 'の', color: '#C8473C',
    restaurant: 'やま田食堂', item: '唐揚げ弁当', time: '30分前',
    text: '揚げたてサクサクで、ご飯おかわりしたくなる味でした。山田さんの笑顔つき◎',
    img: 'https://images.unsplash.com/photo-1569058242253-92a9c755a0ec?w=800&auto=format&fit=crop',
    likes: 12, comments: 3,
  },
  {
    id: 'c2', user: 'ケンタ', avatar: 'ケ', color: '#6B8E4E',
    restaurant: '炭火 おりおり', item: '焼き鳥盛り合わせ', time: '2時間前',
    text: '仕事帰りに寄ったら、ちょうど鳥串が余ってました。ビールも一杯いただいて満足。',
    img: null, likes: 8, comments: 1,
  },
  {
    id: 'c3', user: 'あおい', avatar: 'あ', color: '#D9A441',
    restaurant: 'パン工房 ことね', item: 'パン詰め合わせ', time: '昨日',
    text: '明日の朝食用に。クロワッサンが入っててテンション上がった！',
    img: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?w=800&auto=format&fit=crop',
    likes: 21, comments: 5,
  },
  {
    id: 'c4', user: 'みのる', avatar: 'み', color: '#2C5784',
    restaurant: '中華 福龍', item: '餃子セット', time: '2日前',
    text: '餃子8個！家族でわけて食べました。ありがとうございます。',
    img: null, likes: 15, comments: 2,
  },
];

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-kinari pb-24">
      <AppHeader
        title="みんなの食卓"
        backHref="/home"
        rightSlot={
          <Link
            href="/community/new"
            className="flex items-center gap-1.5 bg-akane text-shiro text-[12px] font-semibold px-3.5 py-2 rounded-pill cursor-pointer hover:bg-akane-deep transition-colors"
          >
            <PlusIcon className="w-3.5 h-3.5" />
            <span>投稿</span>
          </Link>
        }
      />

      <div className="px-4 py-2">
        <p className="text-[11px] text-sumi-3 mb-3 tracking-[0.06em]">「今日もおいしかった」を益田の仲間とシェア</p>

        <div className="flex flex-col gap-3">
          {POSTS.map((c, i) => (
            <article
              key={c.id}
              className="fade-up bg-shiro border border-kinari-3 rounded-l p-3.5"
              style={{ animationDelay: `${i * 0.04}s` }}
            >
              {/* User row */}
              <div className="flex items-center gap-2.5 mb-2.5">
                <div
                  className="w-[38px] h-[38px] rounded-full flex items-center justify-center font-display font-bold text-[16px] text-shiro flex-shrink-0"
                  style={{ background: c.color }}
                >
                  {c.avatar}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[13px]">{c.user} さん</p>
                  <p className="text-[11px] text-sumi-3 truncate">{c.restaurant} · {c.item} · {c.time}</p>
                </div>
              </div>

              {/* Body */}
              <p className="text-[13px] leading-[1.7] text-sumi-2 mb-2.5">{c.text}</p>

              {/* Photo */}
              {c.img && (
                <div
                  className="h-40 rounded-m mb-2.5"
                  style={{ background: `url(${c.img}) center/cover, #ddd` }}
                />
              )}

              {/* Actions */}
              <div className="flex gap-4 text-[12px] text-sumi-3">
                <button className="flex items-center gap-1 cursor-pointer hover:text-akane transition-colors">
                  <span className="text-akane"><HeartIcon /></span>
                  {c.likes}
                </button>
                <button className="flex items-center gap-1 cursor-pointer hover:text-sumi transition-colors">
                  <span>💬</span> {c.comments}
                </button>
                <button className="ml-auto cursor-pointer hover:text-sumi transition-colors">
                  <ShareIcon />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
