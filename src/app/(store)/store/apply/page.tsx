'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AppHeader } from '@/components/shared/AppHeader';
import { Hanko } from '@/components/shared/Hanko';

const RECEIPT_NO = Math.floor(Math.random() * 9000 + 1000);

function Field({
  label, children,
}: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="block text-[11px] text-sumi-3 mb-1.5">{label}</label>
      {children}
    </div>
  );
}

const inputCls =
  'w-full bg-shiro border border-kinari-3 rounded-m px-3.5 py-3 text-[14px] outline-none focus:border-akane transition-colors';

export default function StoreApplyPage() {
  const [step, setStep] = useState(1);

  if (step === 4) {
    return (
      <div className="min-h-screen paper flex flex-col px-7 pt-10 pb-7">
        <Hanko size="md" className="mb-6">受付</Hanko>
        <h1 className="font-display text-[28px] font-bold leading-[1.3] mb-2.5">
          申請を<br />受け付けました
        </h1>
        <p className="text-[13px] text-sumi-2 leading-[1.8] mb-7">
          運営チームで内容を確認後、3営業日以内にご登録のメールアドレスへご連絡します。<br /><br />
          ようこそ、益田めし応援団へ。
        </p>
        <div className="bg-[#FFF7F1] border border-dashed border-akane-soft rounded-m p-3.5 text-[12px] text-sumi-2 leading-[1.7] mb-6">
          <b>受付番号：</b>MS-APP-{RECEIPT_NO}
        </div>
        <Link
          href="/store/login"
          className="block w-full text-center bg-akane text-shiro font-semibold rounded-pill py-[15px] text-[15px] tracking-wide cursor-pointer"
        >
          ログイン画面へ戻る
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-kinari">
      <AppHeader
        title="加盟店申請"
        backHref={step > 1 ? '#' : '/store/login'}
        rightSlot={<span className="text-[11px] text-sumi-3">{step}/3</span>}
      />

      {/* Progress bar */}
      <div className="px-[22px] mb-4">
        <div className="h-1 bg-kinari-3 rounded overflow-hidden">
          <div
            className="h-full bg-akane transition-all duration-300 rounded"
            style={{ width: `${step * 33.33}%` }}
          />
        </div>
      </div>

      <div className="px-[22px] pb-10 flex flex-col gap-3.5">
        {step === 1 && (
          <>
            <h2 className="font-display text-[22px] font-bold">お店のこと</h2>
            <p className="text-[12px] text-sumi-3 -mt-1">会員のみなさんに最初に届く情報です</p>
            <Field label="店舗名">
              <input className={inputCls} placeholder="例: やま田食堂" />
            </Field>
            <Field label="ジャンル">
              <select className={inputCls}>
                <option>和定食</option>
                <option>居酒屋</option>
                <option>中華</option>
                <option>洋食</option>
                <option>ベーカリー</option>
                <option>カフェ</option>
              </select>
            </Field>
            <Field label="住所（益田市内）">
              <input className={inputCls} placeholder="島根県益田市..." />
            </Field>
            <Field label="営業時間">
              <input className={inputCls} placeholder="11:30〜14:00 / 17:30〜21:30" />
            </Field>
          </>
        )}

        {step === 2 && (
          <>
            <h2 className="font-display text-[22px] font-bold">店主さまのこと</h2>
            <p className="text-[12px] text-sumi-3 -mt-1">連絡用です。会員には公開されません</p>
            <Field label="お名前">
              <input className={inputCls} placeholder="山田 健一" />
            </Field>
            <Field label="メールアドレス">
              <input type="email" className={inputCls} placeholder="info@yamada-shokudo.jp" />
            </Field>
            <Field label="電話番号">
              <input type="tel" className={inputCls} placeholder="0856-XX-XXXX" />
            </Field>
            <Field label="振込口座（精算用）">
              <input className={inputCls} placeholder="銀行名・支店・口座番号" />
            </Field>
          </>
        )}

        {step === 3 && (
          <>
            <h2 className="font-display text-[22px] font-bold">応援の意気込み</h2>
            <p className="text-[12px] text-sumi-3 -mt-1">会員紹介ページに掲載します（任意）</p>
            <Field label="お店からひとこと">
              <textarea
                className={`${inputCls} min-h-[120px] resize-none`}
                placeholder="三代続く家庭の味。地元の野菜と石見和牛を使った定食が看板です。"
              />
            </Field>
            <div className="bg-shiro border border-kinari-3 rounded-m p-3.5 flex gap-2.5 text-[12px] text-sumi-2 leading-[1.7]">
              <input type="checkbox" defaultChecked className="accent-akane mt-0.5 flex-shrink-0" />
              <span>規約・プライバシーポリシーに同意します。手数料20%・月末精算の仕組みを理解しました。</span>
            </div>
          </>
        )}

        <button
          onClick={() => setStep(s => s + 1)}
          className="mt-2 w-full bg-akane text-shiro font-semibold rounded-pill py-[15px] text-[15px] tracking-wide hover:bg-akane-deep transition-colors cursor-pointer"
        >
          {step === 3 ? '申請する' : '次へ'}
        </button>
      </div>
    </div>
  );
}
