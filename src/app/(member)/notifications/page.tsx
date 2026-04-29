import { AppHeader } from '@/components/shared/AppHeader';
import { SparkleIcon, TicketIcon, StorefrontIcon, CheckIcon } from '@/components/shared/Icons';

const NOTIFICATIONS = [
  { id: 'n1', title: 'やま田食堂に唐揚げ3人分が出ました', time: '5分前',  tag: '新着',    unread: true  },
  { id: 'n2', title: '今月の利用回数が4/5になりました',    time: '1時間前', tag: '利用',    unread: true  },
  { id: 'n3', title: '炭火 おりおりが新しく仲間入り',      time: '昨日',    tag: 'お知らせ', unread: false },
  { id: 'n4', title: 'QR読み取り完了。ありがとう！',       time: '2日前',   tag: '完了',    unread: false },
];

type Tag = '新着' | '利用' | 'お知らせ' | '完了';

function TagIcon({ tag }: { tag: Tag }) {
  if (tag === '新着')    return <SparkleIcon className="w-4 h-4" />;
  if (tag === '利用')    return <TicketIcon />;
  if (tag === 'お知らせ') return <StorefrontIcon />;
  return <CheckIcon />;
}

export default function NotificationsPage() {
  return (
    <div className="min-h-screen bg-kinari pb-24">
      <AppHeader title="お知らせ" backHref="/home" />

      <div className="px-4 py-2 flex flex-col gap-2.5">
        {NOTIFICATIONS.map((n, i) => (
          <div
            key={n.id}
            className="fade-up flex gap-3 rounded-l px-4 py-3.5 border"
            style={{
              animationDelay: `${i * 0.04}s`,
              background: n.unread ? '#FFF7F1' : '#FBF8F1',
              borderColor: n.unread ? '#E8B5AE' : '#DCD0B8',
            }}
          >
            {/* Icon dot */}
            <div
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0"
              style={{
                background: n.unread ? '#C8473C' : '#DCD0B8',
                color: n.unread ? '#fff' : '#3A332D',
              }}
            >
              <TagIcon tag={n.tag as Tag} />
            </div>

            {/* Text */}
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center mb-0.5">
                <span
                  className="text-[10px] font-bold tracking-[0.1em]"
                  style={{ color: n.unread ? '#C8473C' : '#9A8F84' }}
                >
                  {n.tag.toUpperCase()}
                </span>
                <span className="text-[11px] text-sumi-3">{n.time}</span>
              </div>
              <p
                className="text-[13px] leading-[1.5]"
                style={{ fontWeight: n.unread ? 600 : 500 }}
              >
                {n.title}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
