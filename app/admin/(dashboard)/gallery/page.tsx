import { supabase, type GalleryItem } from "@/lib/supabase";
import AdminGallery from "@/components/AdminGallery";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const { data, error } = await supabase
    .from("gallery")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    return (
      <div className="flex items-center justify-center py-20">
        <p className="text-red-400 text-sm">Failed to load gallery: {error.message}</p>
      </div>
    );
  }

  return <AdminGallery items={(data as GalleryItem[]) ?? []} />;
}
