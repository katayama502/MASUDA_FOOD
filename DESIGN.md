# 益田めし応援団 — サービス設計書

> 地域飲食店の食品ロス削減 × 固定収入確保 × コミュニティ応援の三位一体モデル

---

## 1. 課題の構造整理

| 主体 | 課題 |
|------|------|
| 飲食店 | コロナ借金 / 夜間客減 / 食品ロス / 廃棄コスト |
| 消費者 | 地元飲食店を応援したいが機会がない |
| 地域全体 | 飲食店の閉店連鎖 → まちの活力低下 |

**核心**: 食品ロスは「捨てるとコスト」→「渡せばゼロコスト＋関係構築」に転換できる

---

## 2. サービスコンセプト

**「益田めし応援団」**

月額サブスクで地元飲食店の"応援会員"になると、
余りものフードの受け取り権 ＋ 来店特典が得られる。
お店は廃棄ゼロ ＋ 固定収入 ＋ 常連コミュニティを手に入れる。

---

## 3. ビジネスモデル

### 3-1. 収益の流れ

```
応援会員（ユーザー）
    │ 月額会費 ¥800〜¥2,500
    ▼
益田めし応援団（プラットフォーム）
    │ 飲食店へ応援金を配分
    ▼
加盟飲食店（レストラン）
    │ 食品ロス情報を投稿 ＋ 特典提供
    ▼
応援会員が来店・受け取り
```

### 3-2. プラン設計

| プラン | 月額 | フードレスキュー | 来店特典 | 備考 |
|--------|------|-----------------|----------|------|
| **さんぽ** | ¥800 | 月2回まで | — | 気軽に応援 |
| **おなじみ** | ¥1,500 | 月5回まで | ワンドリンク×2 | メイン層 |
| **大将** | ¥2,500 | 無制限 | ワンドリンク無制限 + 優先通知 | コアサポーター |

### 3-3. 飲食店の取り分

```
プラットフォーム手数料: 20%
飲食店配分: 80%（利用実績に応じて按分）

例: 月間会員10人 × ¥1,500 = ¥15,000
  → 飲食店プール: ¥12,000
  → 利用回数ベースで各店へ分配
```

### 3-4. 協賛コミュニティモデル（理想形）

地域企業・個人事業主が「協賛会員」として参加：

```
協賛企業（月¥5,000〜）
    │ 協賛金
    ▼
プール → 飲食店への追加補助
    │
    ▼
協賛特典: 協賛ロゴ掲載 / 優先座席 / 会員への紹介
```

**ポイント**: クローズドコミュニティ内で完結させると、
信頼関係ベースの循環経済が成立しやすい。

---

## 4. ユーザー体験フロー

### 会員（食べる側）

```
LINEで友だち追加
    ↓
プラン選択 → Stripe決済
    ↓
通知受信「○○食堂に今夜 唐揚げ3人分余ってます」
    ↓
アプリ内で確保ボタン（先着）
    ↓
QRコード発行
    ↓
来店 → QR提示 → 受け取り
    ↓
今月の利用回数が自動カウント
```

### 飲食店（出す側）

```
管理画面にログイン（スマホブラウザ）
    ↓
「今日の余り物」を投稿
  - 品目 / 数量 / 受け取り時間帯 / 写真
    ↓
会員へプッシュ通知が自動送信
    ↓
来店者のQR読み取り → 利用記録
    ↓
月末に利用実績ベースで精算金受取
```

---

## 5. システム設計

### 5-1. アーキテクチャ全体図

```
┌─────────────────────────────────────────────┐
│                 クライアント層                │
│  LINE Mini App（会員用）  │ Web管理画面（店舗）│
└──────────────┬──────────────────────────────┘
               │ HTTPS / WebSocket
┌──────────────▼──────────────────────────────┐
│              Next.js (App Router)            │
│   /api/...  Edge Functions                   │
└──────────────┬──────────────────────────────┘
               │
┌──────────────▼──────────────────────────────┐
│                  Supabase                    │
│  PostgreSQL │ Auth │ Realtime │ Storage      │
└──────────────┬──────────────────────────────┘
               │
┌──────────────▼──────────────────────────────┐
│              外部サービス                     │
│  Stripe（課金） │ LINE API（通知） │ Resend  │
└─────────────────────────────────────────────┘
```

### 5-2. データモデル

```sql
-- 会員
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  line_user_id text UNIQUE,
  display_name text,
  plan_id text,          -- 'sanpo' | 'onajimi' | 'taisho'
  stripe_customer_id text,
  created_at timestamptz DEFAULT now()
);

-- 飲食店
CREATE TABLE restaurants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  owner_user_id uuid REFERENCES users(id),
  address text,
  genre text,
  stripe_account_id text,  -- Connect口座
  is_active bool DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- サブスク契約
CREATE TABLE subscriptions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  plan_id text NOT NULL,
  stripe_subscription_id text UNIQUE,
  status text,  -- 'active' | 'canceled' | 'past_due'
  current_period_start timestamptz,
  current_period_end timestamptz
);

-- フードレスキュー出品
CREATE TABLE food_listings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id uuid REFERENCES restaurants(id),
  title text NOT NULL,           -- 例: 「唐揚げ弁当」
  description text,
  quantity_total int NOT NULL,   -- 総数
  quantity_remaining int NOT NULL,
  receive_from timestamptz,
  receive_until timestamptz,
  image_url text,
  status text DEFAULT 'open',    -- 'open' | 'closed' | 'expired'
  created_at timestamptz DEFAULT now()
);

-- 予約・確保
CREATE TABLE reservations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  listing_id uuid REFERENCES food_listings(id),
  user_id uuid REFERENCES users(id),
  qr_token text UNIQUE DEFAULT gen_random_uuid()::text,
  status text DEFAULT 'pending', -- 'pending' | 'claimed' | 'expired'
  created_at timestamptz DEFAULT now(),
  claimed_at timestamptz
);

-- 月次利用カウント
CREATE TABLE monthly_usages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES users(id),
  year_month text,               -- 例: '2026-04'
  rescue_count int DEFAULT 0,
  drink_count int DEFAULT 0,
  UNIQUE(user_id, year_month)
);

-- 精算レコード
CREATE TABLE payouts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_id uuid REFERENCES restaurants(id),
  year_month text,
  total_uses int,
  amount_jpy int,
  stripe_payout_id text,
  paid_at timestamptz
);
```

### 5-3. 主要API設計

| エンドポイント | メソッド | 説明 |
|--------------|---------|------|
| `/api/listings` | GET | 出品一覧（会員向け） |
| `/api/listings` | POST | 新規出品（店舗向け） |
| `/api/reservations` | POST | 確保ボタン |
| `/api/reservations/[token]/claim` | POST | QR読み取り完了 |
| `/api/subscriptions/checkout` | POST | Stripe Checkout開始 |
| `/api/webhooks/stripe` | POST | Stripe Webhook処理 |
| `/api/webhooks/line` | POST | LINE Webhook処理 |
| `/api/admin/payouts` | POST | 月次精算実行 |

### 5-4. リアルタイム通知フロー

```
飲食店が食品投稿
    ↓
Supabase DB INSERT
    ↓
Supabase Edge Function (trigger)
    ↓
対象プランの会員LINE IDを取得
    ↓
LINE Messaging API で push通知
  →「大将プランの方に優先通知」→ 5分後「おなじみプラン」→ 10分後「さんぽプラン」
```

---

## 6. 技術スタック

| 領域 | 技術 | 理由 |
|------|------|------|
| フロントエンド | Next.js 15 (App Router) | フルスタック、Vercel相性 |
| スタイリング | Tailwind CSS + shadcn/ui | 開発速度 |
| バックエンド | Supabase (PG + Edge Functions) | BaaS、Realtime標準搭載 |
| 認証 | LINE Login + Supabase Auth | 地方ユーザーはLINE普及率高い |
| 課金 | Stripe Billing + Connect | サブスク+飲食店精算が同時対応可 |
| 通知 | LINE Messaging API | ユーザーが使い慣れた導線 |
| メール | Resend | 飲食店向けレポートメール |
| ホスティング | Vercel | Edge対応、CI/CD簡単 |
| QRコード | qrcode.react | 予約QR生成 |

---

## 7. 収益シミュレーション

### 初期フェーズ（3ヶ月後想定）

| 項目 | 数値 |
|------|------|
| 会員数 | 50名 |
| 平均プラン | おなじみ ¥1,500 |
| 月次売上 | ¥75,000 |
| プラットフォーム収益(20%) | ¥15,000 |
| 飲食店プール(80%) | ¥60,000 |
| 加盟店数 | 5店 |
| 1店あたり平均配分 | ¥12,000 |

### 成熟フェーズ（1年後想定）

| 項目 | 数値 |
|------|------|
| 会員数 | 300名 |
| 月次売上 | ¥420,000 |
| プラットフォーム収益 | ¥84,000 |
| 飲食店プール | ¥336,000 |
| 加盟店数 | 20店 |
| 協賛企業 | 10社（+¥50,000/月） |
| **合計月次売上** | **¥470,000** |

---

## 8. ロードマップ

### Phase 1 — MVP（〜2ヶ月）

- [ ] LINE Login + Supabase認証
- [ ] サブスク（Stripe Billing）
- [ ] 飲食店管理画面（食品投稿）
- [ ] 会員向けリスト + 確保ボタン
- [ ] QRコード生成・読み取り
- [ ] 利用回数カウント

### Phase 2 — コミュニティ強化（〜4ヶ月）

- [ ] プラン優先通知（段階リリース）
- [ ] 協賛会員機能
- [ ] 飲食店精算自動化（Stripe Connect）
- [ ] 月次レポート（飲食店向けメール）

### Phase 3 — 益田エコシステム（〜8ヶ月）

- [ ] 地域通貨的ポイント（余り物を受け取るとポイント→地元で使える）
- [ ] 複数店舗スタンプラリー連携
- [ ] 地域SNS機能（「今日もおいしかった」投稿）
- [ ] 他地方への展開テンプレート化

---

## 9. クローズドコミュニティ運用案

TABETEのようなオープンマーケットではなく、
**招待制または審査制**にすることで信頼ベースの循環が生まれる：

```
招待モデル:
  既存会員が知人を招待 → 招待コードで登録
  → 会員同士の顔が見える関係 → トラブル激減

協賛コミュニティ内完結:
  協賛企業の従業員 → 全員無料または割引で会員資格
  → 地域企業が連帯して飲食店を支える構造
```

---

## 10. 差別化ポイント（TABETEとの違い）

| 項目 | TABETE | 益田めし応援団 |
|------|--------|---------------|
| 対象エリア | 全国 | 益田市限定 |
| 課金モデル | 食品単価 | 月額サブスク |
| 関係性 | 匿名マーケット | 顔の見えるコミュニティ |
| 飲食店収入 | 不安定（売れた分） | 固定収入（サブスク按分） |
| 特典 | 食品のみ | 食品 + ドリンク + 来店促進 |
| 運営 | 東京スタートアップ | 地元主体 |

---

*設計者: 益田地域活性化プロジェクト*
*最終更新: 2026-04-29*
