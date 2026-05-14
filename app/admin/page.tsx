import { supabase, type Order } from "@/lib/supabase";
import AdminDashboard from "@/components/AdminDashboard";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const { data, error } = await supabase
    .from("orders")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="min-h-screen bg-forest-950 flex items-center justify-center">
        <p className="text-red-400 text-sm">Failed to load orders: {error.message}</p>
      </div>
    );
  }

  return <AdminDashboard orders={(data as Order[]) ?? []} />;
}
