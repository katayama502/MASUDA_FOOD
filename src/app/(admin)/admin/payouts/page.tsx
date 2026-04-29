import { AppHeader } from '@/components/shared/AppHeader';

const STORES = [
  { id: 's1', name: 'やま田食堂',    rescues: 42, rate: 0.8, revenue: 28400 },
  { id: 's2', name: '炭火 おりおり', rescues: 36, rate: 0.8, revenue: 24600 },
  { id: 's3', name: 'パン工房 ことね',rescues: 28, rate: 0.8, revenue: 19200 },
  { id: 's4', name: '中華 福龍',     rescues: 24, rate: 0.8, revenue: 16400 },
  { id: 's5', name: '洋食 カンパーニュ',rescues: 18, rate: 0.8, revenue: 12200 },
];

const TOTAL = STORES.reduce((s, r) => s + r.revenue, 0);

export default function PayoutsPage() {
  return (
    <div className="min-h-screen bg-kinari pb-8">
      <AppHeader title="月次精算（4月分）" backHref="/admin" />

      <div className="px-5 flex flex-col gap-4">
        {/* Summary */}
        <div
          className="rounded-l p-4 relative overflow-hidden text-shiro"
          style={{ background: '#1F1B17' }}
        >
          <div
            className="absolute -top-7 -right-7 w-36 h-36 rounded-full pointer-events-none"
            style={{ background: 'rgba(200,71,60,0.3)' }}
            aria-hidden="true"
          />
          <p className="text-[11px] text-shiro/60 tracking-[0.2em] relative">APRIL PAYOUT</p>
          <p className="font-display text-[32px] font-bold mt-1 relative">
            ¥{TOTAL.toLocaleString()}
          </p>
          <p className="text-[12px] text-shiro/70 mb-4 relative">5店舗 · 148回レスキュー合計</p>
          <div className="flex justify-between text-[13px] pt-3 border-t border-dashed border-white/20 relative">
            <span>Stripe Transfer 実行日</span>
            <span className="font-display font-bold">5月1日 00:00</span>
          </div>
        </div>

        {/* Payout table */}
        <section>
          <h2 className="font-display text-[15px] font-bold mb-2.5">精算内訳</h2>
          <div className="bg-shiro border border-kinari-3 rounded-l overflow-hidden">
            {STORES.map((s, i) => (
              <div
                key={s.id}
                className={`px-4 py-3.5 flex items-center gap-3 ${i < STORES.length - 1 ? 'border-b border-kinari-3' : ''}`}
              >
                <div className="flex-1">
                  <p className="font-semibold text-[14px]">{s.name}</p>
                  <p className="text-[11px] text-sumi-3">{s.rescues}回レスキュー · 手数料 {Math.round((1 - s.rate) * 100)}%</p>
                </div>
                <div className="text-right">
                  <p className="font-display font-bold text-[16px]">¥{s.revenue.toLocaleString()}</p>
                  <p className="text-[10px] text-sumi-3">振込予定</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Action */}
        <div className="flex flex-col gap-2.5">
          <button className="w-full bg-akane text-shiro font-semibold rounded-pill py-[15px] text-[15px] tracking-wide cursor-pointer hover:bg-akane-deep transition-colors active:scale-[0.98]">
            ¥{TOTAL.toLocaleString()} を一括振込する
          </button>
          <p className="text-center text-[11px] text-sumi-3">
            実行するとStripe Transferが各加盟店のConnectアカウントへ送金されます
          </p>
        </div>
      </div>
    </div>
  );
}
