import Link from 'next/link';
import { AppHeader } from '@/components/shared/AppHeader';

type Status = 'pending' | 'approved' | 'rejected';

const APPLICATIONS: {
  id: string; restaurant: string; genre: string; owner: string;
  email: string; date: string; status: Status;
}[] = [
  { id: 'a1', restaurant: 'ふくふく茶屋',       genre: 'カフェ',  owner: '佐藤 久美', email: 'fukufuku@example.jp', date: '4/27', status: 'pending'  },
  { id: 'a2', restaurant: 'ラーメン 鶏白湯ノ介', genre: '中華',   owner: '田中 大輔', email: 'ramen@example.jp',    date: '4/26', status: 'pending'  },
  { id: 'a3', restaurant: 'そば処 さくら',       genre: '和食',   owner: '鈴木 真希', email: 'soba@example.jp',     date: '4/24', status: 'pending'  },
  { id: 'a4', restaurant: 'やま田食堂',          genre: '和定食', owner: '山田 健一', email: 'yamada@example.jp',   date: '4/10', status: 'approved' },
  { id: 'a5', restaurant: 'オーガニックキッチン', genre: '洋食',   owner: '中村 葵',  email: 'organic@example.jp',  date: '4/05', status: 'rejected' },
];

const STATUS_COLOR: Record<Status, string> = {
  pending:  '#D9A441',
  approved: '#6B8E4E',
  rejected: '#9A8F84',
};
const STATUS_LABEL: Record<Status, string> = {
  pending: '審査中', approved: '承認済', rejected: '却下',
};

export default function ApplicationsPage() {
  const pending  = APPLICATIONS.filter(a => a.status === 'pending');
  const resolved = APPLICATIONS.filter(a => a.status !== 'pending');

  return (
    <div className="min-h-screen bg-kinari pb-8">
      <AppHeader title="加盟申請" backHref="/admin" />

      <div className="px-5 flex flex-col gap-4">
        {/* Pending */}
        <section>
          <div className="flex justify-between items-baseline mb-2">
            <h2 className="font-display text-[14px] font-bold">審査待ち</h2>
            <span className="bg-akane text-shiro text-[10px] font-bold px-2 py-0.5 rounded-pill">{pending.length}件</span>
          </div>
          <div className="flex flex-col gap-2">
            {pending.map(a => (
              <div key={a.id} className="bg-shiro border border-kinari-3 rounded-l px-4 py-3.5">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <p className="font-bold text-[15px]">{a.restaurant}</p>
                    <p className="text-[11px] text-sumi-3">{a.genre} · {a.owner} · {a.date}</p>
                  </div>
                  <span
                    className="text-[10px] font-bold px-2 py-0.5 rounded-pill"
                    style={{ background: STATUS_COLOR[a.status], color: '#fff' }}
                  >
                    {STATUS_LABEL[a.status]}
                  </span>
                </div>
                <p className="text-[12px] text-sumi-3 mb-3">{a.email}</p>
                <div className="flex gap-2">
                  <button className="flex-1 bg-wakana text-white text-[13px] font-semibold py-2 rounded-pill cursor-pointer hover:opacity-90 transition-opacity">
                    承認する
                  </button>
                  <button className="flex-1 border border-kinari-3 text-sumi-2 text-[13px] py-2 rounded-pill cursor-pointer hover:bg-kinari-2 transition-colors">
                    却下する
                  </button>
                  <button className="px-4 border border-kinari-3 text-sumi-2 text-[13px] py-2 rounded-pill cursor-pointer hover:bg-kinari-2 transition-colors">
                    詳細
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Resolved */}
        <section>
          <h2 className="font-display text-[14px] font-bold mb-2 text-sumi-3">処理済み</h2>
          <div className="flex flex-col gap-2 opacity-75">
            {resolved.map(a => (
              <div key={a.id} className="bg-shiro border border-kinari-3 rounded-m px-4 py-3 flex items-center gap-3">
                <div className="flex-1">
                  <p className="font-semibold text-[14px]">{a.restaurant}</p>
                  <p className="text-[11px] text-sumi-3">{a.owner} · {a.date}</p>
                </div>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-pill"
                  style={{ background: STATUS_COLOR[a.status], color: '#fff' }}
                >
                  {STATUS_LABEL[a.status]}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
