import { AppHeader } from '@/components/shared/AppHeader';
import { CheckIcon } from '@/components/shared/Icons';

type StoreStatus = 'active' | 'suspended';

const STORES: {
  id: string; name: string; genre: string; owner: string;
  joined: string; rescues: number; status: StoreStatus;
}[] = [
  { id: 's1', name: 'やま田食堂',       genre: '和定食', owner: '山田 健一', joined: '2026/2',  rescues: 42, status: 'active'    },
  { id: 's2', name: '炭火 おりおり',    genre: '居酒屋', owner: '折原 誠',  joined: '2026/2',  rescues: 36, status: 'active'    },
  { id: 's3', name: 'パン工房 ことね',   genre: 'ベーカリー', owner: 'ことね',  joined: '2026/3',  rescues: 28, status: 'active'    },
  { id: 's4', name: '中華 福龍',        genre: '中華',   owner: '福本 龍太', joined: '2026/3',  rescues: 24, status: 'active'    },
  { id: 's5', name: '洋食 カンパーニュ', genre: '洋食',   owner: '西村 明美', joined: '2026/4',  rescues: 18, status: 'suspended' },
];

const STATUS_COLOR: Record<StoreStatus, string> = {
  active:    '#6B8E4E',
  suspended: '#9A8F84',
};
const STATUS_LABEL: Record<StoreStatus, string> = {
  active: '稼働中', suspended: '停止中',
};

export default function StoresPage() {
  return (
    <div className="min-h-screen bg-kinari pb-8">
      <AppHeader title="加盟店一覧" backHref="/admin" />

      <div className="px-5">
        <p className="text-[12px] text-sumi-3 mb-3">
          全 {STORES.length} 店舗 · アクティブ {STORES.filter(s => s.status === 'active').length} 店舗
        </p>

        <div className="flex flex-col gap-2.5">
          {STORES.map(s => (
            <div
              key={s.id}
              className="bg-shiro border border-kinari-3 rounded-l px-4 py-3.5"
            >
              <div className="flex justify-between items-start mb-1.5">
                <div>
                  <p className="font-bold text-[15px]">{s.name}</p>
                  <p className="text-[11px] text-sumi-3">{s.genre} · {s.owner} · {s.joined}加入</p>
                </div>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-pill text-white"
                  style={{ background: STATUS_COLOR[s.status] }}
                >
                  {STATUS_LABEL[s.status]}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-[12px] text-sumi-3">
                  累計レスキュー <b className="text-sumi">{s.rescues}食</b>
                </p>
                <div className="flex gap-2">
                  {s.status === 'active' ? (
                    <button className="text-[11px] border border-kinari-3 text-sumi-2 px-3 py-1.5 rounded-pill cursor-pointer hover:bg-kinari-2 transition-colors">
                      停止
                    </button>
                  ) : (
                    <button className="text-[11px] bg-wakana text-white px-3 py-1.5 rounded-pill cursor-pointer hover:opacity-90 transition-opacity">
                      再開
                    </button>
                  )}
                  <button className="text-[11px] border border-kinari-3 text-sumi-2 px-3 py-1.5 rounded-pill cursor-pointer hover:bg-kinari-2 transition-colors">
                    詳細
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
