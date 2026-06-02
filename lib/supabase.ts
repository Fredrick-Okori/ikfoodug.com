import { createClient } from "@supabase/supabase-js";

export type OrderStatus = "new" | "contacted" | "confirmed" | "completed" | "cancelled";

export interface Order {
  id: string;
  created_at: string;
  name: string;
  email: string;
  phone: string;
  country: string;
  product: string | null;
  is_sample: boolean;
  quantity: string;
  unit: string;
  date_needed: string | null;
  status: OrderStatus;
}

export type EnquiryStatus = "unread" | "read" | "replied" | "archived";

export interface Enquiry {
  id: string;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  enquiry_type: string;
  message: string;
  status: EnquiryStatus;
}

export interface GalleryItem {
  id: string;
  created_at: string;
  storage_path: string;
  url: string;
  caption: string;
  category: string;
  sort_order: number;
}

export interface BlogPost {
  id: string;
  created_at: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  image_url: string | null;
  category: string;
  read_time: string;
  featured: boolean;
  published: boolean;
  published_at: string | null;
}

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);
