import Link from 'next/link';
import { AppHeader } from '@/components/shared/AppHeader';
import { SparkleIcon } from '@/components/shared/Icons';

const PLANS: Record<string, { name: string; price: number; desc: string }> = {
  sanpo:    { name: 'さんぽ',   price: 800,  desc: '気軽に応援したい方へ' },
  onajimi:  { name: 'おなじみ', price: 1500, desc: 'メイン層・常連さんに' },
  taisho:   { name: '大将',     price: 2500, desc: 'コアサポーター' },
};

export default async function CheckoutPage({
  searchParams,
}: {
  searchParams: Promise<{ plan_id?: string }>;
}) {
  const { plan_id } = await searchParams;
  const planId = plan_id ?? 'onajimi';
  const plan = PLANS[planId] ?? PLANS.onajimi;

  return (
    <div className="min-h-screen bg-kinari">
      <AppHeader
        title="お支払い"
        backHref="/plans"
        rightSlot={
          <span className="text-[11px] text-sumi-3">powered by Stripe</span>
        }
      />

      <div className="px-[22px] pb-8">
        {/* Order summary */}
        <div
          className="rounded-l p-4 mb-4 relative overflow-hidden text-shiro"
          style={{ background: '#1F1B17' }}
        >
          <div
            className="absolute -top-5 -right-5 w-24 h-24 rounded-full pointer-events-none"
            style={{ background: 'rgba(200,71,60,0.3)' }}
            aria-hidden="true"
          />
          <p className="text-[11px] text-shiro/60 tracking-[0.2em] relative">YOUR PLAN</p>
          <p className="font-display text-[26px] font-bold mt-1 relative">{plan.name}</p>
          <p className="text-[12px] text-shiro/70 mb-3.5 relative">{plan.desc}</p>
          <div className="flex justify-between text-[13px] pt-3 border-t border-dashed border-white/20 relative">
            <span>月額会費</span>
            <span className="font-display font-bold text-[18px]">¥{plan.price.toLocaleString()}/月</span>
          </div>
        </div>

        {/* Card form — Stripe Elements will replace this */}
        <h2 className="font-display text-[14px] font-bold mb-3">お支払い方法</h2>
        <div className="flex flex-col gap-3.5 mb-4">
          <div>
            <label className="block text-[11px] text-sumi-3 mb-1.5">カード番号</label>
            <input
              readOnly
              defaultValue="4242 4242 4242 4242"
              className="w-full bg-shiro border border-kinari-3 rounded-m px-3.5 py-3 text-[14px] tracking-wider outline-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <div>
              <label className="block text-[11px] text-sumi-3 mb-1.5">有効期限</label>
              <input
                readOnly
                defaultValue="12 / 28"
                className="w-full bg-shiro border border-kinari-3 rounded-m px-3.5 py-3 text-[14px] outline-none"
              />
            </div>
            <div>
              <label className="block text-[11px] text-sumi-3 mb-1.5">セキュリティコード</label>
              <input
                readOnly
                defaultValue="123"
                className="w-full bg-shiro border border-kinari-3 rounded-m px-3.5 py-3 text-[14px] outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-[11px] text-sumi-3 mb-1.5">カード名義</label>
            <input
              readOnly
              defaultValue="NOZOMI MASUDA"
              className="w-full bg-shiro border border-kinari-3 rounded-m px-3.5 py-3 text-[14px] tracking-wider outline-none"
            />
          </div>
        </div>

        {/* Info box */}
        <div className="bg-[#FFF7F1] border border-dashed border-akane-soft rounded-m px-3.5 py-3 flex gap-2.5 items-start mb-4">
          <span className="text-akane flex-shrink-0 mt-0.5"><SparkleIcon /></span>
          <p className="text-[12px] text-sumi-2 leading-[1.7]">
            <b>会費の80%は加盟店プールへ。</b><br />
            あなたが利用しなくても、お店の応援になります。いつでも解約OK。
          </p>
        </div>

        {/* Submit — will be wired to Stripe */}
        <Link
          href="/home"
          className="block w-full text-center bg-akane text-shiro font-semibold rounded-pill py-[15px] text-[15px] tracking-wide hover:bg-akane-deep transition-colors active:scale-[0.98] cursor-pointer"
        >
          ¥{plan.price.toLocaleString()} を支払って はじめる
        </Link>
        <p className="text-center text-[10px] text-sumi-3 mt-2.5 leading-[1.7]">
          🔒 Stripeにより暗号化通信で処理されます
        </p>
      </div>
    </div>
  );
}
