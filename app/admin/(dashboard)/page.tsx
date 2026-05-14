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
      <div className="flex items-center justify-center h-full py-20">
        <p className="text-red-400 text-sm">Failed to load orders: {error.message}</p>
      </div>
    );
  }

  return <AdminDashboard orders={(data as Order[]) ?? []} />;
}
