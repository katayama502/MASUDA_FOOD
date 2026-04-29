"use client";
import { useState } from "react";

const faqs = [
  {
    q: "会員登録はどこからできますか？",
    a: "LINEの公式アカウントを友だち追加した後、トーク画面から「会員登録」をタップするだけです。クレジットカードがあれば5分で完了します。",
  },
  {
    q: "フードレスキューはどうやって使うの？",
    a: "飲食店がフードを登録すると、LINEにお知らせが届きます。確保ボタンを押すとQRコードが発行されるので、お店で提示して受け取ります。",
  },
  {
    q: "月の利用回数を超えたらどうなりますか？",
    a: "その月は追加利用ができなくなりますが、翌月1日にリセットされます。より多く使いたい場合は上位プランへの変更がおすすめです。",
  },
  {
    q: "飲食店はどうやって参加できますか？",
    a: "まずはお問い合わせフォームよりご連絡ください。ご説明の上、アカウントを発行します。登録・初期費用は無料です。",
  },
  {
    q: "解約はいつでもできますか？",
    a: "いつでも解約できます。解約後は当月末まで特典が利用できます。違約金等は一切かかりません。",
  },
  {
    q: "益田市外でも使えますか？",
    a: "現在は益田市内の加盟店のみ対象です。近隣地域への拡大も検討中ですので、お楽しみに。",
  },
];

export default function FaqAccordion() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {faqs.map((faq, i) => (
        <div
          key={i}
          className="border border-orange-100 rounded-xl overflow-hidden bg-white"
        >
          <button
            className="w-full text-left px-6 py-4 flex items-center justify-between gap-4 cursor-pointer hover:bg-orange-50 transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500"
            aria-expanded={openIndex === i}
            onClick={() => setOpenIndex(openIndex === i ? null : i)}
          >
            <span className="font-medium text-stone-800 text-base leading-relaxed">
              {faq.q}
            </span>
            <span
              className="flex-shrink-0 w-6 h-6 text-orange-500 transition-transform duration-200"
              style={{ transform: openIndex === i ? "rotate(45deg)" : "rotate(0deg)" }}
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                <line x1="12" y1="5" x2="12" y2="19" />
                <line x1="5" y1="12" x2="19" y2="12" />
              </svg>
            </span>
          </button>
          {openIndex === i && (
            <div className="px-6 pb-5 text-stone-600 text-sm leading-relaxed border-t border-orange-50">
              <p className="pt-4">{faq.a}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
