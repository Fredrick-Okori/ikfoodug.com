import { supabase, type BlogPost } from "@/lib/supabase";
import AdminBlog from "@/components/AdminBlog";

export const dynamic = "force-dynamic";

export default async function AdminBlogPage() {
  try {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return (
        <div className="flex flex-col items-center justify-center py-24 gap-3 text-center px-6">
          <p className="text-red-400 text-sm font-medium">Failed to load blog posts</p>
          <p className="text-xs text-gray-400 dark:text-white/30 max-w-sm">
            {error.message.includes("does not exist")
              ? "The blog_posts table hasn't been created in Supabase yet. Run the setup SQL in your Supabase dashboard."
              : error.message}
          </p>
        </div>
      );
    }

    return <AdminBlog posts={(data as BlogPost[]) ?? []} />;
  } catch (err) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-3 text-center px-6">
        <p className="text-red-400 text-sm font-medium">Blog posts unavailable</p>
        <p className="text-xs text-gray-400 dark:text-white/30 max-w-sm">
          {err instanceof Error ? err.message : "An unexpected error occurred. Check your Supabase configuration."}
        </p>
      </div>
    );
  }
}
