"use client";

import { useState, useTransition, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Plus, Pencil, Trash2, X, Loader2, FileText, ImageIcon, Upload,
} from "lucide-react";
import { type BlogPost } from "@/lib/supabase";
import { createBlogPost, updateBlogPost, deleteBlogPost, uploadBlogImage } from "@/app/admin/actions";

const CATEGORIES = ["Natural", "Export", "Farming", "Harvest"];

type FormData = {
  title: string;
  slug: string;
  category: string;
  read_time: string;
  published_at: string;
  excerpt: string;
  image_url: string;
  content: string;
  featured: boolean;
  published: boolean;
};

const emptyForm = (): FormData => ({
  title: "",
  slug: "",
  category: "Natural",
  read_time: "5 min",
  published_at: new Date().toISOString().slice(0, 10),
  excerpt: "",
  image_url: "",
  content: "",
  featured: false,
  published: false,
});

function toSlug(str: string) {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

function fmt(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" });
}

const inputCls =
  "w-full px-3 py-2 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 text-gray-900 dark:text-white text-sm focus:outline-none focus:ring-2 focus:ring-gold-400";
const labelCls =
  "block text-xs font-medium text-gray-500 dark:text-white/40 uppercase tracking-widest mb-1.5";

function PostModal({
  post,
  onClose,
  onSaved,
}: {
  post: BlogPost | null;
  onClose: () => void;
  onSaved: () => void;
}) {
  const [form, setForm] = useState<FormData>(
    post
      ? {
          title: post.title,
          slug: post.slug,
          category: post.category,
          read_time: post.read_time,
          published_at: post.published_at ? post.published_at.slice(0, 10) : new Date().toISOString().slice(0, 10),
          excerpt: post.excerpt ?? "",
          image_url: post.image_url ?? "",
          content: post.content ?? "",
          featured: post.featured,
          published: post.published,
        }
      : emptyForm()
  );
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(post?.image_url ?? null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState("");

  const set = (field: keyof FormData, value: string | boolean) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleTitleChange = (val: string) => {
    setForm((prev) => ({
      ...prev,
      title: val,
      slug: post ? prev.slug : toSlug(val),
    }));
  };

  const handleImageSelect = (file: File) => {
    if (!file.type.startsWith("image/")) { setError("Please select an image file."); return; }
    if (file.size > 8 * 1024 * 1024) { setError("File must be under 8 MB."); return; }
    setImageFile(file);
    setImagePreview(URL.createObjectURL(file));
    setError("");
  };

  const clearImage = () => {
    setImageFile(null);
    setImagePreview(null);
    setForm((prev) => ({ ...prev, image_url: "" }));
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const submit = () => {
    if (!form.title.trim() || !form.slug.trim()) {
      setError("Title and slug are required.");
      return;
    }
    setError("");
    startTransition(async () => {
      try {
        let image_url = form.image_url;
        if (imageFile) {
          const fd = new FormData();
          fd.append("file", imageFile);
          image_url = await uploadBlogImage(fd);
        }
        const payload = {
          ...form,
          image_url,
          published_at: form.published_at || new Date().toISOString().slice(0, 10),
        };
        if (post) {
          await updateBlogPost(post.id, payload);
        } else {
          await createBlogPost(payload);
        }
        onSaved();
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : "Save failed.");
      }
    });
  };

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center p-4 pt-12 bg-black/50 backdrop-blur-sm overflow-y-auto">
      <div className="bg-white dark:bg-[#0a0f14] border border-gray-200 dark:border-white/10 rounded-2xl w-full max-w-2xl shadow-2xl mb-12">
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 dark:border-white/8">
          <h2 className="text-sm font-semibold text-gray-800 dark:text-white">
            {post ? "Edit Post" : "New Post"}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 dark:text-white/30 hover:text-gray-700 dark:hover:text-white transition"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-6 py-5 flex flex-col gap-4">
          <div>
            <label className={labelCls}>Title</label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Post title"
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Slug</label>
            <input
              type="text"
              value={form.slug}
              onChange={(e) => set("slug", e.target.value)}
              placeholder="post-slug"
              className={inputCls}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelCls}>Category</label>
              <select
                value={form.category}
                onChange={(e) => set("category", e.target.value)}
                className={inputCls}
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelCls}>Read Time</label>
              <input
                type="text"
                value={form.read_time}
                onChange={(e) => set("read_time", e.target.value)}
                placeholder="6 min"
                className={inputCls}
              />
            </div>
          </div>

          <div>
            <label className={labelCls}>Published Date</label>
            <input
              type="date"
              value={form.published_at}
              onChange={(e) => set("published_at", e.target.value)}
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Excerpt</label>
            <textarea
              rows={3}
              value={form.excerpt}
              onChange={(e) => set("excerpt", e.target.value)}
              placeholder="Short description of the article"
              className={inputCls}
            />
          </div>

          <div>
            <label className={labelCls}>Cover Image</label>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageSelect(f); }}
            />
            {imagePreview ? (
              <div className="relative rounded-xl overflow-hidden border border-gray-200 dark:border-white/10">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={imagePreview} alt="Cover preview" className="w-full h-40 object-cover" />
                <button
                  type="button"
                  onClick={clearImage}
                  className="absolute top-2 right-2 w-7 h-7 flex items-center justify-center rounded-lg bg-black/60 text-white hover:bg-black/80 transition"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex flex-col items-center justify-center gap-2 py-8 rounded-xl border-2 border-dashed border-gray-200 dark:border-white/10 text-gray-400 dark:text-white/25 hover:border-gold-400 hover:text-gold-500 transition-colors"
              >
                <Upload className="w-5 h-5" />
                <span className="text-xs font-medium">Click to upload image</span>
                <span className="text-[11px]">PNG, JPG, AVIF — max 8 MB</span>
              </button>
            )}
          </div>

          <div>
            <label className={labelCls}>Content</label>
            <textarea
              rows={10}
              value={form.content}
              onChange={(e) => set("content", e.target.value)}
              placeholder="Full article body…"
              className={inputCls}
            />
          </div>

          <div className="flex gap-3">
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Featured</label>
              <button
                type="button"
                onClick={() => set("featured", !form.featured)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  form.featured
                    ? "bg-gold-400/15 text-gold-600 dark:text-gold-400 border-gold-200 dark:border-gold-400/30"
                    : "bg-gray-100 dark:bg-white/5 border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/40"
                }`}
              >
                {form.featured ? "Featured" : "Not Featured"}
              </button>
            </div>
            <div className="flex flex-col gap-1.5">
              <label className={labelCls}>Status</label>
              <button
                type="button"
                onClick={() => set("published", !form.published)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold border transition-all ${
                  form.published
                    ? "bg-green-50 border-green-200 text-green-600 dark:bg-green-400/10 dark:border-green-400/30 dark:text-green-400"
                    : "bg-gray-100 border-gray-200 text-gray-500 dark:bg-white/5 dark:border-white/10 dark:text-white/40"
                }`}
              >
                {form.published ? "Published" : "Draft"}
              </button>
            </div>
          </div>

          {error && (
            <p className="text-xs text-red-500 dark:text-red-400">{error}</p>
          )}

          <div className="flex gap-2 pt-1">
            <button
              onClick={onClose}
              className="flex-1 text-sm px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/50 hover:text-gray-900 dark:hover:text-white transition"
            >
              Cancel
            </button>
            <button
              onClick={submit}
              disabled={isPending}
              className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl bg-gold-400 text-forest-950 hover:bg-gold-500 transition disabled:opacity-60"
            >
              {isPending && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              {isPending ? "Saving…" : "Save Post"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PostRow({
  post,
  onEdit,
  onDeleted,
}: {
  post: BlogPost;
  onEdit: () => void;
  onDeleted: () => void;
}) {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      try {
        await deleteBlogPost(post.id);
        onDeleted();
      } catch {
        setConfirmDelete(false);
      }
    });
  };

  return (
    <tr className="border-b border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
      <td className="px-4 py-3">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-lg bg-gray-100 dark:bg-white/5 flex items-center justify-center shrink-0">
            <FileText className="w-3.5 h-3.5 text-gray-400 dark:text-white/25" />
          </div>
          <div>
            <p className="text-sm font-medium text-gray-800 dark:text-white line-clamp-1">{post.title}</p>
            <p className="text-[11px] text-gray-400 dark:text-white/30 mt-0.5">/{post.slug}</p>
          </div>
        </div>
      </td>
      <td className="px-4 py-3 text-xs text-gray-500 dark:text-white/40">{post.category}</td>
      <td className="px-4 py-3">
        {post.featured ? (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border bg-gold-400/15 text-gold-600 dark:text-gold-400 border-gold-200 dark:border-gold-400/30">
            Featured
          </span>
        ) : (
          <span className="text-xs text-gray-300 dark:text-white/20">—</span>
        )}
      </td>
      <td className="px-4 py-3">
        {post.published ? (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border bg-green-50 border-green-200 text-green-600 dark:bg-green-400/10 dark:border-green-400/30 dark:text-green-400">
            Published
          </span>
        ) : (
          <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-semibold border bg-gray-100 border-gray-200 text-gray-500 dark:bg-white/5 dark:border-white/10 dark:text-white/40">
            Draft
          </span>
        )}
      </td>
      <td className="px-4 py-3 text-xs text-gray-400 dark:text-white/30 whitespace-nowrap">
        {fmt(post.published_at ?? post.created_at)}
      </td>
      <td className="px-4 py-3">
        {confirmDelete ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-gray-500 dark:text-white/40">Confirm?</span>
            <button
              onClick={handleDelete}
              disabled={isPending}
              className="flex items-center gap-1 text-xs font-semibold text-red-600 dark:text-red-400 hover:underline disabled:opacity-60"
            >
              {isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : null}
              Yes, Delete
            </button>
            <button
              onClick={() => setConfirmDelete(false)}
              className="text-xs text-gray-400 dark:text-white/30 hover:text-gray-700 dark:hover:text-white"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1">
            <button
              onClick={onEdit}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 dark:text-white/30 hover:text-gray-700 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/8 transition"
              title="Edit"
            >
              <Pencil className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setConfirmDelete(true)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-gray-400 dark:text-white/30 hover:text-red-500 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-400/5 transition"
              title="Delete"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
}

export default function AdminBlog({ posts }: { posts: BlogPost[] }) {
  const router = useRouter();
  const [modal, setModal] = useState<"new" | BlogPost | null>(null);

  const refresh = () => router.refresh();

  const handleSaved = () => {
    setModal(null);
    refresh();
  };

  const published = posts.filter((p) => p.published).length;
  const drafts = posts.filter((p) => !p.published).length;

  return (
    <div className="flex flex-col flex-1 p-6 md:p-8 space-y-7">

      <div className="flex items-center justify-between pt-2 md:pt-0">
        <div className="pl-12 md:pl-0">
          <h1 className="text-xl font-bold font-heading text-gray-900 dark:text-white">Blog Posts</h1>
          <p className="text-gray-500 dark:text-white/35 text-sm mt-0.5">Create and manage blog articles</p>
        </div>
        <button
          onClick={() => setModal("new")}
          className="flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-xl bg-gold-400 text-forest-950 hover:bg-gold-500 transition"
        >
          <Plus className="w-4 h-4" />
          New Post
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total", value: posts.length, color: "text-gray-800 dark:text-white" },
          { label: "Published", value: published, color: "text-green-600 dark:text-green-400" },
          { label: "Drafts", value: drafts, color: "text-gray-400 dark:text-white/40" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white dark:bg-[#0a0f14] border border-gray-200 dark:border-white/8 rounded-2xl p-5 shadow-sm dark:shadow-none">
            <p className="text-xs text-gray-400 dark:text-white/35 uppercase tracking-widest mb-2">{label}</p>
            <p className={`text-3xl font-bold font-heading ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      <div className="bg-white dark:bg-[#0a0f14] border border-gray-200 dark:border-white/8 rounded-2xl overflow-hidden">
        {posts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3 text-center px-6">
            <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center">
              <FileText className="w-5 h-5 text-gray-300 dark:text-white/20" />
            </div>
            <p className="text-sm text-gray-400 dark:text-white/30">No blog posts yet. Create your first one.</p>
            <button
              onClick={() => setModal("new")}
              className="flex items-center gap-2 text-xs font-semibold px-4 py-2 rounded-xl bg-gold-400 text-forest-950 hover:bg-gold-500 transition mt-1"
            >
              <Plus className="w-3.5 h-3.5" />
              New Post
            </button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-100 dark:border-white/5">
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 dark:text-white/30 uppercase tracking-widest">Title</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 dark:text-white/30 uppercase tracking-widest">Category</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 dark:text-white/30 uppercase tracking-widest">Featured</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 dark:text-white/30 uppercase tracking-widest">Status</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 dark:text-white/30 uppercase tracking-widest">Date</th>
                  <th className="px-4 py-3 text-left text-[11px] font-semibold text-gray-400 dark:text-white/30 uppercase tracking-widest">Actions</th>
                </tr>
              </thead>
              <tbody>
                {posts.map((post) => (
                  <PostRow
                    key={post.id}
                    post={post}
                    onEdit={() => setModal(post)}
                    onDeleted={refresh}
                  />
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {modal !== null && (
        <PostModal
          post={modal === "new" ? null : modal}
          onClose={() => setModal(null)}
          onSaved={handleSaved}
        />
      )}
    </div>
  );
}
