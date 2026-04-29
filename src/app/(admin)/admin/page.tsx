import Link from 'next/link';

const STATS = {
  members: 187, restaurants: 12, monthRevenue: 268000, monthRescues: 412,
  growthMembers: '+24', growthRestaurants: '+2', growthRevenue: '+18%',
};

const PENDING = [
  { id: 'a1', restaurant: 'ふくふく茶屋',       owner: '佐藤 久美', date: '4/27' },
  { id: 'a2', restaurant: 'ラーメン 鶏白湯ノ介', owner: '田中 大輔', date: '4/26' },
  { id: 'a3', restaurant: 'そば処 さくら',       owner: '鈴木 真希', date: '4/24' },
];

const TOP = [
  { rank: 1, name: 'やま田食堂',    count: 42, payout: 28400 },
  { rank: 2, name: '炭火 おりおり', count: 36, payout: 24600 },
  { rank: 3, name: 'パン工房 ことね',count: 28, payout: 19200 },
  { rank: 4, name: '中華 福龍',     count: 24, payout: 16400 },
];

function BigKPI({ label, value, unit, growth }: { label: string; value: string | number; unit: string; growth?: string }) {
  return (
    <div className="bg-white/[0.06] border border-white/10 rounded-m px-3 py-2.5">
      <p className="text-[10px] text-shiro/60">{label}</p>
      <p className="font-display text-[20px] font-bold text-shiro">
        {value}<span className="text-[10px] text-shiro/70 ml-0.5">{unit}</span>
      </p>
      {growth && <p className="text-[10px] text-akane-soft mt-0.5">↗ {growth}</p>}
    </div>
  );
}

function RevenueRow({ label, value, emphasis }: { label: string; value: string; emphasis?: boolean }) {
  return (
    <div className="flex justify-between py-1.5 text-[13px]">
      <span style={{ color: emphasis ? '#C8473C' : '#3A332D', fontWeight: emphasis ? 700 : 500 }}>{label}</span>
      <span className="font-display font-bold" style={{ color: emphasis ? '#C8473C' : '#1F1B17' }}>{value}</span>
    </div>
  );
}

export default function AdminPage() {
  return (
    <div className="min-h-screen bg-kinari pb-8">
      {/* Dark header */}
      <div className="bg-sumi text-shiro px-5 pt-5 pb-5">
        <div className="flex justify-between items-center mb-3.5">
          <div>
            <p className="text-[11px] text-shiro/60 tracking-[0.2em]">ADMIN · OPERATOR</p>
            <p className="font-display text-[20px] font-bold">運営ダッシュボード</p>
          </div>
          <div className="w-[38px] h-[38px] rounded-full bg-akane flex items-center justify-center font-display font-bold text-shiro">
            運
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          <BigKPI label="会員数"     value={STATS.members}     unit="名" growth={STATS.growthMembers} />
          <BigKPI label="加盟店"     value={STATS.restaurants} unit="軒" growth={STATS.growthRestaurants} />
          <BigKPI label="今月の売上" value={`¥${STATS.monthRevenue.toLocaleString()}`} unit="" growth={STATS.growthRevenue} />
          <BigKPI label="レスキュー食" value={STATS.monthRescues} unit="食" />
        </div>
      </div>

      <div className="px-5 pt-5 flex flex-col gap-5">
        {/* Pending applications */}
        <section>
          <div className="flex justify-between items-baseline mb-2.5">
            <h2 className="font-display text-[15px] font-bold">加盟申請の審査</h2>
            <span className="bg-akane text-shiro text-[10px] font-bold px-2 py-0.5 rounded-pill">
              {PENDING.length}件 未対応
            </span>
          </div>
          <div className="flex flex-col gap-2">
            {PENDING.map(a => (
              <div key={a.id} className="bg-shiro border border-kinari-3 rounded-m px-3.5 py-3 flex items-center gap-3">
                <div className="flex-1">
                  <p className="font-bold text-[14px]">{a.restaurant}</p>
                  <p className="text-[11px] text-sumi-3">{a.owner} · {a.date}</p>
                </div>
                <button className="bg-wakana text-white text-[11px] font-semibold px-3 py-1.5 rounded-pill cursor-pointer hover:opacity-90 transition-opacity">
                  承認
                </button>
                <button className="border border-kinari-3 text-sumi-2 text-[11px] px-2.5 py-1.5 rounded-pill cursor-pointer hover:bg-kinari-2 transition-colors">
                  確認
                </button>
              </div>
            ))}
          </div>
          <Link href="/admin/applications" className="block text-center text-[12px] text-akane font-semibold mt-2 cursor-pointer">
            すべて見る →
          </Link>
        </section>

        {/* Revenue breakdown */}
        <section>
          <h2 className="font-display text-[15px] font-bold mb-2.5">今月の収支</h2>
          <div className="bg-shiro border border-kinari-3 rounded-l p-4">
            <RevenueRow label="サブスク売上 (187名)"   value="¥268,000" />
            <RevenueRow label="プラットフォーム収益 (20%)" value="¥53,600"  emphasis />
            <RevenueRow label="加盟店プール (80%)"     value="¥214,400" />
            {/* Bar */}
            <div className="h-2 rounded overflow-hidden bg-kinari-2 mt-2 flex">
              <div className="w-[20%] h-full bg-akane" />
              <div className="w-[80%] h-full bg-wakana" />
            </div>
            <div className="flex justify-between text-[10px] text-sumi-3 mt-1.5">
              <span>運営 20%</span>
              <span>加盟店 80%</span>
            </div>
          </div>
        </section>

        {/* Top performers */}
        <section>
          <h2 className="font-display text-[15px] font-bold mb-2.5">レスキュー上位店</h2>
          <div className="bg-shiro border border-kinari-3 rounded-l overflow-hidden">
            {TOP.map((r, i) => (
              <div
                key={i}
                className={`flex items-center gap-3 px-3.5 py-3 ${i < TOP.length - 1 ? 'border-b border-kinari-3' : ''}`}
              >
                <span
                  className="font-display font-bold text-[16px] w-5 flex-shrink-0"
                  style={{ color: r.rank <= 3 ? '#C8473C' : '#9A8F84' }}
                >
                  {r.rank}
                </span>
                <div className="flex-1">
                  <p className="text-[13px] font-semibold">{r.name}</p>
                  <p className="text-[11px] text-sumi-3">{r.count}回レスキュー</p>
                </div>
                <span className="font-display font-bold text-[14px]">¥{r.payout.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Payout action */}
        <Link
          href="/admin/payouts"
          className="block w-full text-center border border-sumi-3/30 rounded-pill py-[13px] text-[14px] font-medium text-sumi-2 hover:bg-kinari-2 transition-colors cursor-pointer"
        >
          月次精算を実行（4月分）
        </Link>
      </div>
    </div>
  );
}
