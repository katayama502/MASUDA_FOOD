import FaqAccordion from "@/components/FaqAccordion";

// ── SVG Icons ──────────────────────────────────────────────
function LineIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63.346 0 .628.285.628.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.281.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314" />
    </svg>
  );
}

function CheckIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function LeafIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10z" />
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
  );
}

function ShoppingBagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}

function BellIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
      <path d="M13.73 21a2 2 0 0 1-3.46 0" />
    </svg>
  );
}

function QrIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <path d="M14 14h.01M18 14h.01M14 18h.01M18 18h.01M14 22h.01M22 14h.01M22 18h.01" />
    </svg>
  );
}

function StoreIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function CoinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8" x2="12" y2="16" />
      <line x1="9" y1="10" x2="15" y2="10" />
    </svg>
  );
}

function UsersIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

// ── LINE CTAボタン ──────────────────────────────────────────
function LineButton({ label = "LINEで友だち追加する", size = "default" }: { label?: string; size?: "default" | "large" }) {
  const baseClass = "inline-flex items-center gap-3 bg-[#00B900] hover:bg-[#00a000] active:bg-[#009000] text-white font-bold rounded-full transition-all duration-200 cursor-pointer shadow-lg hover:shadow-xl focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00B900]/50";
  const sizeClass = size === "large"
    ? "px-8 py-4 text-lg"
    : "px-6 py-3 text-base";
  return (
    <a href="#line" className={`${baseClass} ${sizeClass}`} aria-label="LINE公式アカウントを友だち追加する">
      <LineIcon className="w-6 h-6 flex-shrink-0" />
      <span>{label}</span>
    </a>
  );
}

// ── プランカード ──────────────────────────────────────────
type Plan = {
  name: string;
  price: string;
  rescue: string;
  drink: string;
  notify: string;
  features: string[];
  highlight?: boolean;
};

const plans: Plan[] = [
  {
    name: "さんぽ",
    price: "¥800",
    rescue: "月2回",
    drink: "なし",
    notify: "通常",
    features: ["フードレスキュー 月2回", "LINEで通知受信", "活動レポート閲覧"],
  },
  {
    name: "おなじみ",
    price: "¥1,500",
    rescue: "月5回",
    drink: "月2回",
    notify: "通常",
    highlight: true,
    features: ["フードレスキュー 月5回", "ワンドリンク無料 月2回", "LINEで通知受信", "活動レポート閲覧", "応援メッセージ送信"],
  },
  {
    name: "大将",
    price: "¥2,500",
    rescue: "無制限",
    drink: "無制限",
    notify: "優先",
    features: ["フードレスキュー 無制限", "ワンドリンク無料 無制限", "優先通知（5分早い）", "活動レポート閲覧", "応援メッセージ送信", "お名前を感謝ページに掲載"],
  },
];

function PlanCard({ plan }: { plan: Plan }) {
  return (
    <div
      className={`relative rounded-2xl p-6 flex flex-col gap-4 border-2 transition-all duration-200 ${
        plan.highlight
          ? "border-orange-500 bg-orange-50 shadow-xl scale-[1.02]"
          : "border-stone-200 bg-white shadow-md hover:shadow-lg"
      }`}
    >
      {plan.highlight && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2">
          <span className="bg-orange-500 text-white text-xs font-bold px-4 py-1 rounded-full whitespace-nowrap">
            人気No.1
          </span>
        </div>
      )}
      <div>
        <p className="text-sm font-medium text-stone-500 mb-1">プラン</p>
        <h3 className="text-2xl font-bold text-stone-800">{plan.name}</h3>
      </div>
      <div>
        <span className="text-4xl font-bold text-orange-600">{plan.price}</span>
        <span className="text-stone-500 text-sm ml-1">/月</span>
      </div>
      <ul className="space-y-2 flex-1">
        {plan.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-stone-700">
            <CheckIcon className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
            <span>{f}</span>
          </li>
        ))}
      </ul>
      <LineButton
        label="このプランで始める"
        size="default"
      />
    </div>
  );
}

// ── メインページ ─────────────────────────────────────────────
export default function Home() {
  return (
    <div className="bg-amber-50 min-h-screen">

      {/* ── Navbar ── */}
      <header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-orange-100">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
          <a href="#" className="flex items-center gap-2 cursor-pointer" aria-label="益田めし応援団 トップへ">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center flex-shrink-0">
              <LeafIcon className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-stone-800 text-lg leading-none">
              益田めし<span className="text-orange-500">応援団</span>
            </span>
          </a>
          <nav className="hidden md:flex items-center gap-6 text-sm text-stone-600">
            <a href="#how-it-works" className="hover:text-orange-500 transition-colors duration-200 cursor-pointer">使い方</a>
            <a href="#plans" className="hover:text-orange-500 transition-colors duration-200 cursor-pointer">プラン</a>
            <a href="#restaurant" className="hover:text-orange-500 transition-colors duration-200 cursor-pointer">飲食店の方へ</a>
            <a href="#faq" className="hover:text-orange-500 transition-colors duration-200 cursor-pointer">よくある質問</a>
          </nav>
          <LineButton label="友だち追加" />
        </div>
      </header>

      <main>
        {/* ── Hero ── */}
        <section className="relative overflow-hidden bg-gradient-to-b from-orange-50 to-amber-50 pt-16 pb-24 px-4 sm:px-6">
          {/* 装飾円 */}
          <div className="absolute -top-32 -right-32 w-96 h-96 bg-orange-100 rounded-full opacity-60" aria-hidden="true" />
          <div className="absolute -bottom-16 -left-16 w-64 h-64 bg-green-100 rounded-full opacity-60" aria-hidden="true" />

          <div className="relative max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 bg-orange-100 text-orange-700 text-sm font-medium px-4 py-1.5 rounded-full mb-6">
              <LeafIcon className="w-4 h-4" />
              <span>益田市の飲食店を、地域みんなで支える</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-stone-900 leading-tight mb-6">
              余り物を、
              <span className="text-orange-500">おいしい縁</span>
              に。
            </h1>
            <p className="text-lg sm:text-xl text-stone-600 max-w-2xl mx-auto leading-relaxed mb-4">
              月額サブスクで地元の飲食店の<strong className="text-stone-800">応援会員</strong>になると、
              余り物フードの受け取り権と来店特典が手に入ります。
              食品ロスを減らしながら、まちの食文化を一緒に守りましょう。
            </p>
            <p className="text-sm text-stone-500 mb-10">LINEで完結 · クレジットカード決済 · いつでも解約OK</p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <LineButton label="LINEで友だち追加する" size="large" />
              <a href="#plans" className="text-sm text-stone-600 underline underline-offset-4 hover:text-orange-500 transition-colors cursor-pointer">
                プランを見る
              </a>
            </div>

            {/* 実績数字 */}
            <div className="mt-16 grid grid-cols-3 gap-6 max-w-lg mx-auto">
              {[
                { num: "20+", label: "加盟飲食店" },
                { num: "300+", label: "応援会員" },
                { num: "1,200", label: "食品ロス削減（食）" },
              ].map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl font-bold text-orange-600">{s.num}</div>
                  <div className="text-xs text-stone-500 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Problem ── */}
        <section className="bg-stone-800 text-white py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-orange-300 text-sm font-medium mb-2">現状の課題</p>
              <h2 className="text-3xl sm:text-4xl font-bold leading-snug">
                益田の飲食店が、<br className="sm:hidden" />今直面していること
              </h2>
            </div>
            <div className="grid sm:grid-cols-3 gap-6">
              {[
                {
                  icon: <CoinIcon className="w-8 h-8" />,
                  title: "コロナ融資の返済",
                  body: "コロナ禍で抱えた借金の返済が始まり、キャッシュフローが圧迫されています。",
                },
                {
                  icon: <UsersIcon className="w-8 h-8" />,
                  title: "夜の客足が戻らない",
                  body: "2次会・3次会の文化が薄れ、夜の売上が以前の水準に届かない状態が続いています。",
                },
                {
                  icon: <LeafIcon className="w-8 h-8" />,
                  title: "食品ロスが止まらない",
                  body: "売れ残った食材を廃棄するコストも負担。家族に食べさせるにも限界があります。",
                },
              ].map((item) => (
                <div key={item.title} className="bg-stone-700 rounded-xl p-6">
                  <div className="text-orange-400 mb-3">{item.icon}</div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-stone-300 text-sm leading-relaxed">{item.body}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-stone-400 text-sm mt-10">
              「お店がなくなると、まちが寂しくなる」——地域みんなで支える仕組みが必要です。
            </p>
          </div>
        </section>

        {/* ── Solution ── */}
        <section className="bg-green-50 py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-green-700 text-sm font-medium mb-2">解決策</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-6 leading-snug">
              食品ロスを<span className="text-green-600">「縁」</span>に変える、<br className="hidden sm:block" />
              地域応援サブスク
            </h2>
            <p className="text-stone-600 max-w-2xl mx-auto leading-relaxed mb-12">
              益田めし応援団は、月額会費をプールして加盟飲食店へ安定収入として届けます。
              会員は余り物フードや来店特典を享受し、飲食店は廃棄ゼロ＋固定収入＋常連関係を手に入れます。
            </p>
            <div className="grid sm:grid-cols-2 gap-6 text-left">
              {[
                {
                  icon: <HeartIcon className="w-6 h-6" />,
                  title: "飲食店に固定収入が届く",
                  body: "売れた分だけではなく、月額会費から安定した収入が毎月精算されます。",
                  color: "text-orange-500 bg-orange-100",
                },
                {
                  icon: <LeafIcon className="w-6 h-6" />,
                  title: "食品ロスがゼロになる",
                  body: "余った食材を捨てず、会員に渡すことで廃棄コストと罪悪感の両方を解消。",
                  color: "text-green-600 bg-green-100",
                },
                {
                  icon: <UsersIcon className="w-6 h-6" />,
                  title: "常連コミュニティが生まれる",
                  body: "顔の見える関係で、お店とお客さんが応援し合うコミュニティが自然にできます。",
                  color: "text-blue-600 bg-blue-100",
                },
                {
                  icon: <CoinIcon className="w-6 h-6" />,
                  title: "地域経済が循環する",
                  body: "益田市内でお金が回り続けることで、まち全体の活力維持につながります。",
                  color: "text-amber-600 bg-amber-100",
                },
              ].map((item) => (
                <div key={item.title} className="bg-white rounded-xl p-5 shadow-sm border border-stone-100 flex gap-4">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${item.color}`}>
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-stone-800 mb-1">{item.title}</h3>
                    <p className="text-stone-600 text-sm leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── How it works ── */}
        <section id="how-it-works" className="bg-amber-50 py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-orange-500 text-sm font-medium mb-2">使い方</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-900">3ステップで始められる</h2>
            </div>
            <div className="relative">
              {/* 繋ぎ線 */}
              <div className="hidden md:block absolute top-12 left-[calc(16.66%-1px)] right-[calc(16.66%-1px)] h-0.5 bg-orange-200" aria-hidden="true" />
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    step: "01",
                    icon: <LineIcon className="w-8 h-8" />,
                    title: "LINEで友だち追加",
                    body: "公式アカウントを友だち追加してプランを選択。5分で会員登録完了。",
                    color: "bg-[#00B900] text-white",
                  },
                  {
                    step: "02",
                    icon: <BellIcon className="w-8 h-8" />,
                    title: "通知を受け取る",
                    body: "加盟店が余り物を登録すると、LINEにお知らせが届きます。先着順で確保ボタンをタップ。",
                    color: "bg-orange-500 text-white",
                  },
                  {
                    step: "03",
                    icon: <QrIcon className="w-8 h-8" />,
                    title: "来店してQR提示",
                    body: "発行されたQRコードをお店で見せるだけ。フードや特典を受け取ってください。",
                    color: "bg-green-600 text-white",
                  },
                ].map((step) => (
                  <div key={step.step} className="flex flex-col items-center text-center gap-4">
                    <div className={`relative w-24 h-24 rounded-full flex items-center justify-center shadow-lg ${step.color}`}>
                      {step.icon}
                      <span className="absolute -top-2 -right-2 w-7 h-7 bg-white border-2 border-current rounded-full flex items-center justify-center text-xs font-bold text-stone-700">
                        {step.step}
                      </span>
                    </div>
                    <h3 className="font-bold text-stone-800 text-lg">{step.title}</h3>
                    <p className="text-stone-600 text-sm leading-relaxed max-w-xs">{step.body}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ── Plans ── */}
        <section id="plans" className="bg-white py-20 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-14">
              <p className="text-orange-500 text-sm font-medium mb-2">料金プラン</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-900">応援の大きさを選ぼう</h2>
              <p className="text-stone-500 text-sm mt-3">いつでもプラン変更・解約できます</p>
            </div>
            <div className="grid md:grid-cols-3 gap-6 items-start">
              {plans.map((plan) => (
                <PlanCard key={plan.name} plan={plan} />
              ))}
            </div>
            <p className="text-center text-stone-400 text-xs mt-8">
              * 価格は全て税込。毎月1日にリセットされます。
            </p>
          </div>
        </section>

        {/* ── Restaurant benefits ── */}
        <section id="restaurant" className="bg-green-700 text-white py-20 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-green-300 text-sm font-medium mb-2">飲食店の方へ</p>
              <h2 className="text-3xl sm:text-4xl font-bold leading-snug">
                参加するメリット
              </h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-6 mb-12">
              {[
                {
                  icon: <CoinIcon className="w-7 h-7" />,
                  title: "毎月、固定収入が届く",
                  body: "会員の利用実績に応じて月末に精算。廃棄物を出しても出さなくても、安定したサポートが入ります。",
                },
                {
                  icon: <LeafIcon className="w-7 h-7" />,
                  title: "廃棄コストがゼロに",
                  body: "余った食材を会員に渡すだけ。ゴミ袋代も手間も減り、罪悪感なく食材を活かせます。",
                },
                {
                  icon: <UsersIcon className="w-7 h-7" />,
                  title: "常連が自然に増える",
                  body: "受け取りで来店した会員が「通常」の客として戻ってくるサイクルが生まれます。",
                },
                {
                  icon: <ShoppingBagIcon className="w-7 h-7" />,
                  title: "初期費用・登録料ゼロ",
                  body: "システムの導入費用、月額利用料は一切かかりません。スマホ一台あれば今日から始められます。",
                },
              ].map((item) => (
                <div key={item.title} className="flex gap-4">
                  <div className="w-12 h-12 bg-green-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                    <p className="text-green-200 text-sm leading-relaxed">{item.body}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center">
              <a
                href="#line"
                className="inline-flex items-center gap-3 bg-white text-green-700 font-bold px-8 py-4 rounded-full shadow-lg hover:bg-green-50 transition-colors duration-200 cursor-pointer text-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
              >
                <StoreIcon className="w-6 h-6" />
                <span>飲食店として参加申し込み</span>
              </a>
              <p className="text-green-300 text-xs mt-4">お問い合わせから最短2日で利用開始できます</p>
            </div>
          </div>
        </section>

        {/* ── Community banner ── */}
        <section className="bg-amber-100 border-y border-amber-200 py-12 px-4 sm:px-6">
          <div className="max-w-4xl mx-auto flex flex-col sm:flex-row items-center gap-6 text-center sm:text-left">
            <div className="w-16 h-16 bg-amber-500 rounded-2xl flex items-center justify-center flex-shrink-0">
              <HeartIcon className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-stone-800 text-xl mb-1">協賛・地域企業の方へ</h3>
              <p className="text-stone-600 text-sm leading-relaxed">
                地域企業として協賛会員になることで、従業員の福利厚生として全員に会員権を提供できます。
                協賛ロゴの掲載、優先座席など特典もご用意。まちの食文化を守る活動を一緒に作りましょう。
              </p>
            </div>
            <a
              href="#line"
              className="flex-shrink-0 inline-flex items-center gap-2 bg-amber-500 hover:bg-amber-600 text-white font-bold px-6 py-3 rounded-full transition-colors duration-200 cursor-pointer whitespace-nowrap text-sm focus:outline-none focus-visible:ring-4 focus-visible:ring-amber-500/50"
            >
              協賛について聞く
            </a>
          </div>
        </section>

        {/* ── FAQ ── */}
        <section id="faq" className="bg-white py-20 px-4 sm:px-6">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-orange-500 text-sm font-medium mb-2">よくある質問</p>
              <h2 className="text-3xl sm:text-4xl font-bold text-stone-900">FAQ</h2>
            </div>
            <FaqAccordion />
          </div>
        </section>

        {/* ── Footer CTA ── */}
        <section id="line" className="bg-gradient-to-br from-orange-500 to-orange-600 py-20 px-4 sm:px-6 text-white text-center">
          <div className="max-w-2xl mx-auto">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <LeafIcon className="w-9 h-9 text-white" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              一緒に、まちを守ろう。
            </h2>
            <p className="text-orange-100 mb-8 leading-relaxed">
              まずはLINEで友だち追加するだけ。<br />
              無料で情報を受け取りながら、始められるタイミングで会員登録できます。
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#"
                className="inline-flex items-center gap-3 bg-[#00B900] hover:bg-[#00a000] text-white font-bold px-8 py-4 rounded-full shadow-lg transition-all duration-200 cursor-pointer text-lg focus:outline-none focus-visible:ring-4 focus-visible:ring-white/50"
              >
                <LineIcon className="w-7 h-7" />
                <span>LINEで友だち追加する</span>
              </a>
            </div>
            <p className="text-orange-200 text-xs mt-6">
              強引な勧誘は一切しません。いつでもブロックできます。
            </p>
          </div>
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className="bg-stone-900 text-stone-400 py-10 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 bg-orange-500 rounded-md flex items-center justify-center">
              <LeafIcon className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-sm">益田めし応援団</span>
          </div>
          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-xs">
            <a href="#" className="hover:text-white transition-colors cursor-pointer">プライバシーポリシー</a>
            <a href="#" className="hover:text-white transition-colors cursor-pointer">利用規約</a>
            <a href="#" className="hover:text-white transition-colors cursor-pointer">特定商取引法に基づく表記</a>
            <a href="#" className="hover:text-white transition-colors cursor-pointer">お問い合わせ</a>
          </nav>
          <p className="text-xs">© 2026 益田めし応援団</p>
        </div>
      </footer>
    </div>
  );
}
