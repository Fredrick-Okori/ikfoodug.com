import { supabase, type GalleryItem } from "@/lib/supabase";
import AdminGallery from "@/components/AdminGallery";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  try {
    const { data, error } = await supabase
      .from("gallery")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-center px-6">
          <p className="text-red-400 text-sm font-medium">Failed to load gallery</p>
          <p className="text-xs text-gray-400 dark:text-white/30 max-w-sm">
            {error.message.includes("does not exist")
              ? "The gallery table hasn't been created in Supabase yet. Run the setup SQL in your Supabase dashboard."
              : error.message}
          </p>
        </div>
      );
    }

    return <AdminGallery items={(data as GalleryItem[]) ?? []} />;
  } catch (err) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-center px-6">
        <p className="text-red-400 text-sm font-medium">Gallery unavailable</p>
        <p className="text-xs text-gray-400 dark:text-white/30 max-w-sm">
          {err instanceof Error ? err.message : "An unexpected error occurred. Check your Supabase configuration."}
        </p>
      </div>
    );
  }
}
