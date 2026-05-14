import { supabase, type Enquiry } from "@/lib/supabase";
import AdminEnquiries from "@/components/AdminEnquiries";

export const dynamic = "force-dynamic";

export default async function EnquiriesPage() {
  const { data, error } = await supabase
    .from("enquiries")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-red-400 text-sm">Failed to load enquiries: {error.message}</p>
      </div>
    );
  }

  return <AdminEnquiries enquiries={(data as Enquiry[]) ?? []} />;
}
