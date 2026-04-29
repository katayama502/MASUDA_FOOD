# 益田めし応援団 — デザインシステム

> このドキュメントはLPおよびアプリ画面を作成・改善するすべての人が参照するデザインの基準書です。
> コードを書く前に必ず読み、実装後にチェックリストを使って確認してください。

---

## 1. ブランドの世界観

### コンセプト

「**顔の見える地産地消**」

TABETEのような匿名マーケットではなく、
益田市という地域コミュニティの中で、お店と人が名前と顔を持って繋がるサービス。
デザインはその「温かさ・信頼・地元らしさ」を視覚言語に落とし込む。

### ブランドパーソナリティ

| 属性 | 表現 |
|------|------|
| **温かい** | 冷たいブルー系は避ける。オレンジ・クリーム・グリーンで食卓の温度感を表現 |
| **誠実** | 過度な煽り文句・誇大表現はNG。数字は正直に、言葉は丁寧に |
| **親しみやすい** | 難しい専門用語を避ける。敬語ベースだが堅すぎない「ですます」調 |
| **地域に根ざす** | 「益田」「地元」「まち」という言葉を自然に使う |
| **軽快** | 重厚さは不要。さらっと読めて、さらっと行動できる |

### ターゲットユーザー

- **会員（食べる側）**: 30〜50代の益田市在住者。地元愛があり、LINEを普段使いしている
- **飲食店**: 小規模な地域飲食店のオーナー・スタッフ。スマホ操作はできるがITリテラシーは平均的
- **協賛企業**: 地元の中小企業経営者。コミュニティ貢献に関心がある

---

## 2. カラーパレット

### ブランドカラー（コア）

```
Primary   #F97316  ── ウォームオレンジ
                       食欲・温かさ・エネルギーを表現
                       CTA、ロゴ、アクセント、強調テキストに使う

Secondary #16A34A  ── フォレストグリーン
                       自然・地域・持続可能性を表現
                       飲食店向けセクション、チェックマーク、バッジに使う

Accent    #D97706  ── アンバーゴールド
                       特別感・優先度の高い情報に使う
                       協賛バナー、「人気No.1」バッジ、警告的な情報

Background #FFFBEB ── クリームホワイト
                       ページ全体の地色。白より温かく、目が疲れない
```

### カラーサブシステム

```
オレンジ系（Primary）
  orange-50  #FFF7ED  ── プランカードの強調背景、ホバー背景
  orange-100 #FFEDD5  ── セクション区切り、バッジ背景
  orange-500 #F97316  ── ← Primary
  orange-600 #EA580C  ── ホバー時のPrimary（Darken 10%）
  orange-900 #7C2D12  ── テキストオーバーレイ

グリーン系（Secondary）
  green-50   #F0FDF4  ── 軽い背景（解決策セクション等）
  green-100  #DCFCE7  ── バッジ背景、チェック背景
  green-600  #16A34A  ── ← Secondary
  green-700  #15803D  ── 飲食店向けセクション背景（ダーク）
  green-200  #BBF7D0  ── ボーダー、ライトアクセント

ストーン系（テキスト・UI）
  stone-900  #1C1917  ── 本文テキスト（最高コントラスト）
  stone-800  #292524  ── 見出し
  stone-600  #57534E  ── サブテキスト、説明文
  stone-500  #78716C  ── プレースホルダー、キャプション
  stone-200  #E7E5E4  ── ボーダー、区切り線
  stone-100  #F5F5F4  ── 非活性な背景

クリーム系（背景）
  amber-50   #FFFBEB  ── ← Background（ページ地色）
  amber-100  #FEF3C7  ── 協賛バナー背景、協調色背景
  amber-200  #FDE68A  ── 強調ボーダー

特殊色
  LINE Green #00B900  ── LINE CTAボタン専用。他の用途には使わない
  LINE Hover #00A000  ── LINE CTAホバー状態専用
```

### コントラスト比ルール（WCAG AA必須）

| 組み合わせ | 比率 | 用途 |
|------------|------|------|
| stone-900 on amber-50 | 16.4:1 ✅ | 本文テキスト |
| white on orange-500 | 3.1:1 ⚠️ | ボタンのみ（太字で補完） |
| white on green-700 | 7.2:1 ✅ | 飲食店セクション本文 |
| stone-600 on white | 5.9:1 ✅ | カード内サブテキスト |
| orange-600 on white | 4.6:1 ✅ | 価格表示（太字） |

> **注意**: `orange-500`の白テキストはコントラスト不足のため、
> ボタン（太字）以外では使わない。テキスト用は`orange-600`以上を使うこと。

---

## 3. タイポグラフィ

### フォントファミリー

```css
見出し（h1〜h4）: 'Noto Serif JP', serif
  重厚感・品格を出しながら日本語の読みやすさを保つ
  主にセクション見出し、キャッチコピーに使用

本文・UI: 'Noto Sans JP', sans-serif
  モダンで清潔。説明文、ボタン、ナビ、カードに使用
```

### フォントスケール

| 用途 | サイズ | ウェイト | クラス例 |
|------|--------|----------|---------|
| Hero見出し | 36〜60px | 700 | `text-4xl sm:text-5xl md:text-6xl font-bold` |
| セクション見出し | 28〜36px | 700 | `text-3xl sm:text-4xl font-bold` |
| カード見出し | 20〜24px | 700 | `text-xl font-bold` |
| 本文（主） | 16〜18px | 400 | `text-base sm:text-lg` |
| 本文（副） | 14px | 400 | `text-sm` |
| キャプション | 12px | 400〜500 | `text-xs` |
| ラベル（セクション上部） | 14px | 500 | `text-sm font-medium` |

### ラインハイト

```
本文: line-height 1.7（globals.css で body に設定済み）
見出し: leading-tight（1.25）〜 leading-snug（1.375）
キャプション: leading-normal（1.5）
```

### 文字幅の制限

```
本文段落: max-w-2xl（672px）または max-w-prose
見出し: max-w-4xl まで許容
1行の文字数: 65〜75文字が理想（スマホでは自動調整される）
```

---

## 4. スペーシング・レイアウト

### コンテナ幅

```
最大幅（通常コンテンツ）: max-w-6xl（1152px）
最大幅（テキスト重視）:   max-w-4xl（896px）
最大幅（狭いコンテンツ）: max-w-2xl（672px）
サイドパディング: px-4 sm:px-6
```

### セクション縦余白

```
セクション上下: py-20（80px）
  └ ナロウセクション: py-12（48px）（バナーやインラインCTA等）

見出し下の余白: mb-12〜mb-14
項目間（グリッド）: gap-6
項目間（リスト）: space-y-3〜space-y-4
```

### Zインデックス体系

```
z-50: Navbar（sticky header）
z-10: モーダル背景（将来実装時）
z-20: モーダル本体（将来実装時）
```

---

## 5. コンポーネントカタログ

### 5-1. LINEボタン（最重要CTA）

```tsx
// サイズ: large（Hero・Footer用） / default（Navbar・カード用）
<a
  href="[LINE公式アカウントURL]"
  className="inline-flex items-center gap-3 bg-[#00B900] hover:bg-[#00a000]
             active:bg-[#009000] text-white font-bold rounded-full
             transition-all duration-200 cursor-pointer shadow-lg
             hover:shadow-xl focus:outline-none
             focus-visible:ring-4 focus-visible:ring-[#00B900]/50
             px-8 py-4 text-lg"   // large
  aria-label="LINE公式アカウントを友だち追加する"
>
  <LineIcon className="w-6 h-6 flex-shrink-0" />
  <span>LINEで友だち追加する</span>
</a>
```

**ルール**:
- LINE公式カラー`#00B900`以外の色にしない
- アイコンは必ずLINEロゴSVGを使う
- ラベルは「LINEで友だち追加する」を基本とし、短縮形は「友だち追加」まで
- `aria-label`は必ず付ける

---

### 5-2. セクションラベル（眉ラベル）

各セクション見出しの上に置く小さなラベル。セクションのカテゴリを示す。

```tsx
// 背景が明るいセクション（白・クリーム系）
<p className="text-orange-500 text-sm font-medium mb-2">課題提起</p>

// 背景が暗いセクション（stone-800・green-700）
<p className="text-orange-300 text-sm font-medium mb-2">解決策</p>
<p className="text-green-300 text-sm font-medium mb-2">飲食店の方へ</p>
```

**ルール**: 常に見出しの直前。1〜4文字の名詞で完結させる。

---

### 5-3. セクション見出し

```tsx
// 基本
<h2 className="text-3xl sm:text-4xl font-bold text-stone-900 mb-6 leading-snug">
  食品ロスを<span className="text-green-600">「縁」</span>に変える
</h2>

// 白背景セクションの中央揃え
<div className="text-center mb-14">
  <p className="text-orange-500 text-sm font-medium mb-2">ラベル</p>
  <h2 className="text-3xl sm:text-4xl font-bold text-stone-900">見出し</h2>
</div>
```

**強調ルール**: キーワードに `<span className="text-orange-500">` または `<span className="text-green-600">` を当てる。
アンダーラインや太字だけでなく、色で意味を付与する。

---

### 5-4. プランカード

```tsx
// ハイライトあり（推奨プラン）
<div className="relative rounded-2xl p-6 flex flex-col gap-4
                border-2 border-orange-500 bg-orange-50 shadow-xl scale-[1.02]">
  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
    <span className="bg-orange-500 text-white text-xs font-bold
                     px-4 py-1 rounded-full whitespace-nowrap">
      人気No.1
    </span>
  </div>
  ...
</div>

// 通常プラン
<div className="rounded-2xl p-6 flex flex-col gap-4
                border-2 border-stone-200 bg-white shadow-md hover:shadow-lg
                transition-all duration-200">
  ...
</div>
```

**価格表示ルール**: 価格は `text-4xl font-bold text-orange-600`、`/月` は `text-stone-500 text-sm`。

---

### 5-5. メリット一覧カード（アイコン付き）

```tsx
<div className="flex gap-4">
  <div className="w-10 h-10 rounded-lg flex items-center justify-center
                  flex-shrink-0 text-orange-500 bg-orange-100">
    <IconComponent className="w-6 h-6" />
  </div>
  <div>
    <h3 className="font-bold text-stone-800 mb-1">タイトル</h3>
    <p className="text-stone-600 text-sm leading-relaxed">説明文</p>
  </div>
</div>
```

**アイコンカラー割当**:
- オレンジ系: 収入・報酬・価値に関するもの
- グリーン系: 環境・食品ロス・持続可能性
- ブルー系: コミュニティ・人間関係
- アンバー系: 経済・循環・地域

---

### 5-6. ステップカード（How it works）

```tsx
<div className="flex flex-col items-center text-center gap-4">
  <div className="relative w-24 h-24 rounded-full flex items-center
                  justify-center shadow-lg bg-orange-500 text-white">
    <IconComponent className="w-8 h-8" />
    <span className="absolute -top-2 -right-2 w-7 h-7 bg-white border-2
                     border-orange-500 rounded-full flex items-center justify-center
                     text-xs font-bold text-stone-700">
      01
    </span>
  </div>
  <h3 className="font-bold text-stone-800 text-lg">ステップタイトル</h3>
  <p className="text-stone-600 text-sm leading-relaxed max-w-xs">説明</p>
</div>
```

**色割当**: ステップ1=LINE Green、ステップ2=Orange、ステップ3=Green

---

### 5-7. FAQアコーディオン

```tsx
// FaqAccordion.tsx（クライアントコンポーネント）
// アコーディオンはopen/close時に +アイコンを45度回転させる
// transform: rotate(45deg) でXアイコン的に見せる
// 背景: bg-white、ホバー: hover:bg-orange-50、ボーダー: border-orange-100
```

---

### 5-8. Navbar

```tsx
<header className="sticky top-0 z-50 bg-white/90 backdrop-blur border-b border-orange-100">
  <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
    {/* ロゴ */}
    {/* ナビリンク（md以上で表示） */}
    {/* LINE CTA（default size） */}
  </div>
</header>
```

**ルール**: 高さは`h-16`固定。スクロール時に内容が裏に隠れないよう、後続のmain要素にpadding不要（stickyのため）。

---

## 6. セクション別デザインパターン

各セクションの背景色は意図的に交互変化させ、スクロール時に視覚的メリハリをつける。

```
Navbar      → bg-white/90 backdrop-blur（sticky）
Hero        → bg-gradient-to-b from-orange-50 to-amber-50
Problem     → bg-stone-800（暗背景＝課題の重さを表現）
Solution    → bg-green-50（明るい＝希望・解決）
How it works→ bg-amber-50（ページ地色に戻す＝中立・説明）
Plans       → bg-white（清潔・比較しやすい）
Restaurant  → bg-green-700（暗緑＝飲食店向けの別世界感）
Community   → bg-amber-100 border-y border-amber-200（バナー感）
FAQ         → bg-white
Footer CTA  → bg-gradient-to-br from-orange-500 to-orange-600
Footer      → bg-stone-900
```

**原則**: 
- 暗いセクションはテキストを白系に
- 課題提起は重さを表現するために暗背景を使う
- CTAセクションはブランドカラーで締める

---

## 7. アイコンシステム

### 使用ルール

- **必ずインラインSVGを使う**。絵文字（🍚🎉）はUIアイコンとして使わない
- アイコンの`viewBox`は`0 0 24 24`（24pxベース）に統一
- `aria-hidden="true"`は必須（スクリーンリーダーはテキストで情報を得る）
- アイコン単体のボタンには`aria-label`を必ず付ける

### サイズ規約

| 用途 | サイズクラス |
|------|-------------|
| ナビ・小アイコン | `w-4 h-4` |
| カード内アイコン | `w-5 h-5` 〜 `w-6 h-6` |
| ステップ円内 | `w-8 h-8` |
| ヒーロー装飾 | `w-9 h-9` 〜 `w-10 h-10` |
| ロゴ内（小） | `w-4 h-4` 〜 `w-5 h-5` |

### アイコン一覧（現在使用中）

| アイコン名 | 用途 |
|------------|------|
| `LeafIcon` | ブランドロゴ、食品ロス・環境テーマ |
| `HeartIcon` | 応援・コミュニティ・協賛 |
| `LineIcon` | LINEボタン専用 |
| `CheckIcon` | プラン特典リスト |
| `BellIcon` | 通知ステップ |
| `QrIcon` | QR来店ステップ |
| `StoreIcon` | 飲食店向けCTA |
| `CoinIcon` | 収入・精算・費用 |
| `UsersIcon` | コミュニティ・会員 |
| `ShoppingBagIcon` | 参加・登録 |

---

## 8. トーン＆マナー（ライティングガイド）

### 基本の声のトーン

| NG | OK |
|----|-----|
| 「今すぐ登録！急いで！」 | 「始められるタイミングで会員登録できます」 |
| 「圧倒的なコスパ」 | 「月800円から、地元の飲食店を応援できます」 |
| 「〜の方はいますか？」 | 「〜の方はこちら」 |
| 「最強」「激安」「絶対」 | 数字や事実で語る |
| 「本サービスにご登録いただき」 | 「登録して」 |

### ヘッドラインの書き方

良いヘッドラインは「読者が得るもの」か「共感できる現状」を語る。

```
✅ 「余り物を、おいしい縁に。」      ← 詩的・余韻がある
✅ 「食品ロスを『縁』に変える」      ← 問題→解決の転換
✅ 「一緒に、まちを守ろう。」        ← 呼びかけ・連帯感
✅ 「3ステップで始められる」         ← 具体的・ハードル低い

❌ 「革新的な地域活性化サービス」    ← 抽象的・自己中心的
❌ 「今すぐ始めよう！」             ← 命令形・圧力感
❌ 「食品ロス問題を解決する」        ← 機能的で冷たい
```

### セクション眉ラベルの書き方

```
現状の課題 / 解決策 / 使い方 / 料金プラン / よくある質問 / 飲食店の方へ
```

短く、漢字+ひらがなのバランスを意識する。カタカナ多用は避ける。

### 数字の見せ方

```
✅ 「月800円から」（読みやすい）
✅ 「20店以上が参加」（具体性）
✅ 「1,200食の廃棄を削減」（実績感）
❌ 「¥800/月（税込）〜〜」（読みにくい）
```

### 飲食店向けの言葉

飲食店オーナーは「IT・デジタル」という言葉に距離感を持つ場合がある。

```
✅ 「スマホ一台で」「今日から始められる」「操作は簡単」
✅ 「廃棄ゼロ」「毎月、固定収入が届く」「常連が増える」
❌ 「プラットフォームに登録」「ダッシュボード」「KPI」
```

---

## 9. インタラクション・アニメーション

### トランジション標準

```css
/* ホバー・フォーカス変化（色・影） */
transition-colors duration-200

/* 影の変化 */
transition-shadow duration-200 （または transition-all duration-200）

/* NG: レイアウト変化を伴うアニメーション */
/* hover:scale-105 などでレイアウトシフトが起きる場合は使わない */
/* プランカードの scale-[1.02] はデフォルト状態で適用（hover時ではない） */
```

### ホバー時のフィードバック原則

すべてのクリック可能要素に `cursor-pointer` を付け、視覚変化も提供する。

| 要素 | ホバー変化 |
|------|-----------|
| LINEボタン | 色 dark + shadow 増加 |
| ナビリンク | `text-orange-500` に変色 |
| カード | shadow 増加 |
| FAQアコーディオン | 背景 `bg-orange-50` |
| 白地CTAボタン | 背景 `bg-green-50`/`bg-amber-600` |

### Reduced Motion対応

`globals.css`に設定済み。アニメーションを追加するときは必ず効くことを確認する。

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## 10. アクセシビリティ要件

### 必須項目

- [ ] すべてのインタラクティブ要素に `focus-visible:ring` を設定
- [ ] アイコン単体ボタンには `aria-label` を必ず付ける
- [ ] 装飾SVGには `aria-hidden="true"`
- [ ] 画像には意味のある `alt` テキスト（装飾画像は `alt=""`）
- [ ] フォームラベルは `<label>` タグで明示
- [ ] タブ順序が視覚的な順序と一致している

### フォーカスリング標準

```tsx
// ブランドカラーに合わせたフォーカスリング
focus:outline-none focus-visible:ring-2 focus-visible:ring-orange-500

// LINE CTAボタン
focus:outline-none focus-visible:ring-4 focus-visible:ring-[#00B900]/50
```

---

## 11. レスポンシブ設計

### ブレークポイント使用方針

```
モバイルファースト（Tailwindのデフォルト）
sm: 640px  ── 横並びレイアウト開始、テキストサイズアップ
md: 768px  ── ナビ表示、グリッド3列
lg: 1024px ── ほぼPC表示（max-w-6xl コンテナが効き始める）
```

### モバイル時の注意点

```
グリッド: grid-cols-1 → sm:grid-cols-2 → md:grid-cols-3
テキスト: text-center → sm:text-left（状況による）
ボタン: 幅いっぱい (w-full) → sm:w-auto
タッチターゲット: min-h-[44px] min-w-[44px] を守る
横スクロール: overflow-x-hidden を親に設定
```

---

## 12. 実装チェックリスト

新しいページやコンポーネントを追加・変更したら、以下を確認してください。

### ビジュアル品質

- [ ] 絵文字をUIアイコンとして使っていない（SVGを使う）
- [ ] テキストのコントラスト比が 4.5:1 以上
- [ ] ホバー状態がすべてのインタラクティブ要素にある
- [ ] `cursor-pointer` がすべてのクリック可能要素に付いている
- [ ] カラーパレット外の色を使っていない

### タイポグラフィ

- [ ] 本文は 16px 以上
- [ ] 見出しは Noto Serif JP（`font-serif`クラスまたはh要素）
- [ ] ラインハイト 1.7 が本文に適用されている

### アクセシビリティ

- [ ] `aria-hidden="true"` が装飾SVGに付いている
- [ ] アイコンボタンに `aria-label` がある
- [ ] フォーカスリングが見えている（Tab キーで確認）
- [ ] alt テキストが意味のあるものになっている

### レスポンシブ

- [ ] 375px（iPhone SE）で横スクロールが出ない
- [ ] 768px（タブレット）で崩れていない
- [ ] タッチターゲットが 44px 以上

### トーン＆ライティング

- [ ] 煽り文句・誇大表現を使っていない
- [ ] 飲食店向けセクションでIT用語を使っていない
- [ ] 数字は根拠があるものだけ使っている

---

## 13. NGパターン（やってはいけないこと）

| カテゴリ | NG | 理由 |
|----------|-----|------|
| アイコン | `🍚🎉` などの絵文字をUIアイコンとして使う | 環境によって表示が異なる、サイズ制御できない |
| カラー | `orange-500`のテキストを白背景に使う | コントラスト不足（3.1:1） |
| カラー | LINE Greenをブランドカラー以外に流用 | LINEブランドの混乱 |
| アニメ | `hover:scale-110`などで他要素がずれる | レイアウトシフト、UX劣化 |
| タイポ | ヒーローの見出しを`font-sans`にする | 冷たい印象、ブランドから外れる |
| ライティング | 「今すぐ」「急いで」「限定」などの煽り | ブランドの誠実さと矛盾 |
| コンポーネント | LINEボタンをオレンジや他の色にする | LINEのブランドガイドライン違反 |
| レイアウト | コンテナ幅が統一されていない | 視覚的ノイズ・不整列感 |
| コントラスト | `stone-400`（灰色）を説明文に使う | 読みにくい |

---

## 14. ファイル構造

```
src/
├── app/
│   ├── globals.css      ← カラートークン・フォント定義（ここを変更してブランドカラーを管理）
│   ├── layout.tsx       ← メタデータ・HTMLルート
│   └── page.tsx         ← LPメインページ（全セクション）
└── components/
    └── FaqAccordion.tsx ← インタラクティブなFAQ（クライアントコンポーネント）
```

### globals.css でカラーを変更する方法

```css
@theme inline {
  --color-primary: #F97316;   /* ← ここを変えるとPrimaryカラー全体が変わる */
  --color-secondary: #16A34A; /* ← ここを変えるとSecondaryカラー全体が変わる */
}
```

ただし、Tailwindのユーティリティクラス（`bg-orange-500`等）は直接色名を指定しているため、
カスタムトークンを使ったクラスへの段階的移行が将来の課題。

---

*最終更新: 2026-04-29*
*対象: LP（`/`）および今後追加するすべてのページ・コンポーネント*
