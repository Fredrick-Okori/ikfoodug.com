import { createClient } from "@supabase/supabase-js";

export type OrderStatus = "new" | "contacted" | "confirmed" | "completed" | "cancelled";

export interface Order {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  quantity: string;
  unit: string;
  date_needed: string | null;
  status: OrderStatus;
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);
