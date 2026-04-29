/**
 * Supabase Database型定義（手動）
 * `supabase gen types typescript --local` で自動生成後に置き換える。
 */

export type PlanKind = 'sanpo' | 'onajimi' | 'taisho';
export type SubscriptionStatus = 'trialing' | 'active' | 'past_due' | 'canceled' | 'incomplete';
export type ListingStatus = 'draft' | 'open' | 'closed' | 'expired';
export type ReservationStatus = 'claimed' | 'redeemed' | 'expired' | 'canceled';
export type ApplicationStatus = 'pending' | 'approved' | 'rejected';
export type UserRole = 'member' | 'store_owner' | 'admin';

// ── Row shapes ────────────────────────────────────────────────
export interface UserRow {
  id: string;
  role: UserRole;
  display_name: string | null;
  line_user_id: string | null;
  email: string | null;
  phone: string | null;
  stripe_customer_id: string | null;
  created_at: string;
}

export interface RestaurantRow {
  id: string;
  owner_id: string | null;
  name: string;
  genre: string | null;
  address: string;
  hours: string | null;
  closed_days: string | null;
  description: string | null;
  hero_url: string | null;
  stripe_connect_account_id: string | null;
  active: boolean;
  rescued_total: number;
  created_at: string;
}

export interface SubscriptionRow {
  id: string;
  user_id: string;
  plan: PlanKind;
  stripe_customer_id: string;
  stripe_subscription_id: string;
  status: SubscriptionStatus;
  current_period_start: string | null;
  current_period_end: string | null;
  cancel_at_period_end: boolean;
  created_at: string;
}

export interface FoodListingRow {
  id: string;
  restaurant_id: string;
  title: string;
  description: string | null;
  qty_total: number;
  qty_claimed: number;
  pickup_from: string;
  pickup_until: string;
  photo_url: string | null;
  tags: string[] | null;
  status: ListingStatus;
  notified_at: string | null;
  created_at: string;
}

export interface ReservationRow {
  id: string;
  user_id: string;
  listing_id: string;
  status: ReservationStatus;
  redeemed_at: string | null;
  redeemed_by: string | null;
  created_at: string;
}

export interface NotificationRow {
  id: string;
  user_id: string;
  kind: string;
  title: string;
  body: string | null;
  payload: Record<string, unknown> | null;
  read_at: string | null;
  created_at: string;
}

export interface StoreApplicationRow {
  id: string;
  applicant_email: string;
  restaurant_name: string;
  genre: string | null;
  address: string | null;
  owner_name: string | null;
  phone: string | null;
  bank_info: string | null;
  pitch: string | null;
  status: ApplicationStatus;
  reviewed_by: string | null;
  reviewed_at: string | null;
  created_at: string;
}

export interface PayoutRow {
  id: string;
  restaurant_id: string;
  period_month: string;
  rescue_count: number;
  amount_jpy: number;
  stripe_transfer_id: string | null;
  status: string;
  created_at: string;
}

export interface ProcessedStripeEventRow {
  id: string;
  processed_at: string;
}

// ── Database interface (Supabase client generic) ──────────────
export interface Database {
  public: {
    Tables: {
      users: {
        Row: UserRow;
        Insert: Partial<UserRow> & { id: string };
        Update: Partial<Omit<UserRow, 'id' | 'created_at'>>;
      };
      restaurants: {
        Row: RestaurantRow;
        Insert: Omit<RestaurantRow, 'id' | 'created_at' | 'rescued_total'> & { id?: string; rescued_total?: number };
        Update: Partial<Omit<RestaurantRow, 'id' | 'created_at'>>;
      };
      subscriptions: {
        Row: SubscriptionRow;
        Insert: Omit<SubscriptionRow, 'id' | 'created_at'> & { id?: string };
        Update: Partial<Omit<SubscriptionRow, 'id' | 'created_at'>>;
      };
      food_listings: {
        Row: FoodListingRow;
        Insert: Omit<FoodListingRow, 'id' | 'created_at' | 'qty_claimed'> & { id?: string; qty_claimed?: number };
        Update: Partial<Omit<FoodListingRow, 'id' | 'created_at'>>;
      };
      reservations: {
        Row: ReservationRow;
        Insert: Omit<ReservationRow, 'id' | 'created_at'> & { id?: string };
        Update: Partial<Omit<ReservationRow, 'id' | 'created_at'>>;
      };
      notifications: {
        Row: NotificationRow;
        Insert: Omit<NotificationRow, 'id' | 'created_at'> & { id?: string };
        Update: Partial<Omit<NotificationRow, 'id' | 'created_at'>>;
      };
      store_applications: {
        Row: StoreApplicationRow;
        Insert: Omit<StoreApplicationRow, 'id' | 'created_at' | 'status'> & { id?: string; status?: ApplicationStatus };
        Update: Partial<Omit<StoreApplicationRow, 'id' | 'created_at'>>;
      };
      payouts: {
        Row: PayoutRow;
        Insert: Omit<PayoutRow, 'id' | 'created_at'> & { id?: string };
        Update: Partial<Omit<PayoutRow, 'id' | 'created_at'>>;
      };
      processed_stripe_events: {
        Row: ProcessedStripeEventRow;
        Insert: Omit<ProcessedStripeEventRow, 'processed_at'> & { processed_at?: string };
        Update: Partial<ProcessedStripeEventRow>;
      };
    };
    Functions: {
      get_user_role: { Args: Record<string, never>; Returns: UserRole };
    };
    Enums: {
      plan_kind: PlanKind;
      subscription_status: SubscriptionStatus;
      listing_status: ListingStatus;
      reservation_status: ReservationStatus;
      application_status: ApplicationStatus;
      user_role: UserRole;
    };
  };
}
