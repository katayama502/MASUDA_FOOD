import Link from 'next/link';
import { PlusIcon, ScanIcon, EditIcon } from '@/components/shared/Icons';

type PostStatus = 'open' | 'closed' | 'expired';

const POSTS = [
  { id: 'p1', title: '唐揚げ弁当',    qty: 5, qtyClaimed: 2, from: '19:30', until: '21:00', status: 'open'    as PostStatus, date: '今日' },
  { id: 'p2', title: '肉じゃが 小鉢', qty: 3, qtyClaimed: 3, from: '18:00', until: '20:00', status: 'closed'  as PostStatus, date: '昨日' },
  { id: 'p3', title: '鯖の塩焼き',    qty: 2, qtyClaimed: 1, from: '19:00', until: '21:00', status: 'expired' as PostStatus, date: '2日前' },
];

const STATUS_COLOR: Record<PostStatus, string> = {
  open:    '#6B8E4E',
  closed:  '#9A8F84',
  expired: '#C8473C',
};
const STATUS_LABEL: Record<PostStatus, string> = {
  open: '公開中', closed: '完了', expired: '期限切れ',
};

function KPI({ label, value, unit }: { label: string; value: string | number; unit: string }) {
  return (
    <div className="bg-white/[0.06] border border-white/10 rounded-m px-3 py-2.5">
      <p className="text-[10px] text-shiro/60">{label}</p>
      <p className="font-display text-[18px] font-bold text-shiro">
        {value}<span className="text-[11px] text-shiro/70 ml-0.5">{unit}</span>
      </p>
    </div>
  );
}

function PostRow({ post }: { post: typeof POSTS[0] }) {
  return (
    <Link
      href={`/store/posts/${post.id}/edit`}
      className="bg-shiro border border-kinari-3 rounded-m px-4 py-3.5 flex items-center gap-3 cursor-pointer hover:shadow-1 transition-shadow"
    >
      <div
        className="w-1.5 self-stretch rounded-full flex-shrink-0"
        style={{ background: STATUS_COLOR[post.status] }}
      />
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-center">
          <span className="font-semibold text-[14px]">{post.title}</span>
          <span
            className="text-[10px] font-bold tracking-[0.1em]"
            style={{ color: STATUS_COLOR[post.status] }}
          >
            {STATUS_LABEL[post.status]}
          </span>
        </div>
        <div className="flex gap-3 mt-1 text-[11px] text-sumi-3">
          <span>{post.date}</span>
          <span>{post.from}〜{post.until}</span>
          <span>確保 <b className="text-sumi">{post.qtyClaimed}</b>/{post.qty}</span>
        </div>
      </div>
      <span className="text-sumi-3 flex-shrink-0"><EditIcon /></span>
    </Link>
  );
}

const openPosts = POSTS.filter(p => p.status === 'open');
const pastPosts = POSTS.filter(p => p.status !== 'open');

export default function StoreDashboard() {
  return (
    <div className="min-h-screen bg-kinari pb-8">
      {/* Dark header */}
      <div className="bg-sumi text-shiro px-5 pt-5 pb-5">
        <div className="flex justify-between items-center mb-3.5">
          <div>
            <p className="text-[11px] text-shiro/60 tracking-[0.2em]">STORE ADMIN</p>
            <p className="font-display text-[20px] font-bold">やま田食堂</p>
          </div>
          <Link
            href="/home"
            className="bg-white/10 border border-white/20 text-shiro text-[11px] px-3 py-1.5 rounded-pill cursor-pointer hover:bg-white/20 transition-colors"
          >
            会員側
          </Link>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-3 gap-2.5">
          <KPI label="今月の利用" value="14" unit="回" />
          <KPI label="精算予定" value="¥18,200" unit="" />
          <KPI label="出品中" value={openPosts.length} unit="件" />
        </div>
      </div>

      <div className="px-5 pt-5 flex flex-col gap-4">
        {/* New post CTA */}
        <Link
          href="/store/posts/new"
          className="flex items-center gap-3.5 bg-akane text-shiro rounded-l px-5 py-4 cursor-pointer hover:bg-akane-deep transition-colors active:scale-[0.98]"
          style={{ boxShadow: '0 8px 22px rgba(200,71,60,0.25)' }}
        >
          <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center flex-shrink-0">
            <PlusIcon />
          </div>
          <div className="flex-1">
            <p className="font-display text-[17px] font-bold">今日の余り物を投稿</p>
            <p className="text-[11px] text-shiro/85 mt-0.5">30秒で会員にプッシュ通知</p>
          </div>
          <span className="text-[22px]">→</span>
        </Link>

        {/* Open posts */}
        <div>
          <div className="flex justify-between items-baseline mb-2">
            <h2 className="font-display text-[14px] font-bold">公開中</h2>
            <span className="text-[11px] text-sumi-3">{openPosts.length}件</span>
          </div>
          {openPosts.length === 0 ? (
            <div className="border border-dashed border-kinari-3 rounded-l py-5 text-center text-[13px] text-sumi-3">
              まだ出品はありません
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              {openPosts.map(p => <PostRow key={p.id} post={p} />)}
            </div>
          )}
        </div>

        {/* Past posts */}
        {pastPosts.length > 0 && (
          <div>
            <div className="flex justify-between items-baseline mb-2">
              <h2 className="font-display text-[14px] font-bold text-sumi-3">過去の投稿</h2>
              <span className="text-[11px] text-sumi-3">{pastPosts.length}件</span>
            </div>
            <div className="flex flex-col gap-2 opacity-65">
              {pastPosts.map(p => <PostRow key={p.id} post={p} />)}
            </div>
          </div>
        )}

        {/* Scan CTA */}
        <Link
          href="/store/scan"
          className="flex items-center gap-3 bg-shiro border border-kinari-3 rounded-l px-5 py-3.5 cursor-pointer hover:shadow-1 transition-shadow"
        >
          <div className="w-[38px] h-[38px] rounded-full bg-kinari-2 flex items-center justify-center flex-shrink-0 text-sumi">
            <ScanIcon />
          </div>
          <div className="flex-1">
            <p className="font-semibold text-[14px]">来店者のQRを読み取る</p>
            <p className="text-[11px] text-sumi-3">受け取り完了の記録に使います</p>
          </div>
          <span className="text-[18px] text-sumi-3">→</span>
        </Link>
      </div>
    </div>
  );
}
