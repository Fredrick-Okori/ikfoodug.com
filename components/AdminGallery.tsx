"use client";

import { useState, useRef, useCallback, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  Upload, Trash2, ImageIcon, RefreshCw, X,
  Loader2, CheckCircle2, AlertCircle, Pencil,
} from "lucide-react";
import { type GalleryItem } from "@/lib/supabase";
import {
  uploadGalleryImage,
  deleteGalleryImage,
  updateGalleryCaption,
} from "@/app/admin/actions";

const CATEGORIES = [
  "Vanilla", "Farm", "Community", "Processing", "Export", "Products", "General",
];

function UploadZone({ onSuccess }: { onSuccess: () => void }) {
  const [dragging, setDragging] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("General");
  const [status, setStatus] = useState<"idle" | "uploading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const selectFile = (f: File) => {
    if (!f.type.startsWith("image/")) { setErrorMsg("Please select an image file."); return; }
    if (f.size > 8 * 1024 * 1024) { setErrorMsg("File must be under 8 MB."); return; }
    setFile(f);
    setPreview(URL.createObjectURL(f));
    setErrorMsg("");
    setStatus("idle");
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const f = e.dataTransfer.files[0];
    if (f) selectFile(f);
  }, []);

  const reset = () => {
    setFile(null);
    setPreview(null);
    setCaption("");
    setCategory("General");
    setStatus("idle");
    setErrorMsg("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const upload = async () => {
    if (!file) return;
    setStatus("uploading");
    try {
      const fd = new FormData();
      fd.append("file", file);
      fd.append("caption", caption);
      fd.append("category", category);
      await uploadGalleryImage(fd);
      setStatus("success");
      setTimeout(() => { reset(); onSuccess(); }, 800);
    } catch (err: unknown) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Upload failed");
    }
  };

  const inputCls = "w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0d1117] text-gray-800 dark:text-white placeholder:text-gray-400 dark:placeholder:text-white/25 text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 transition";

  return (
    <div className="bg-white dark:bg-[#0a0f14] border border-gray-200 dark:border-white/8 rounded-2xl p-6">
      <h2 className="text-sm font-semibold text-gray-700 dark:text-white mb-4">Upload New Image</h2>

      {!file ? (
        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => inputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all ${
            dragging
              ? "border-gold-400 bg-gold-400/5"
              : "border-gray-200 dark:border-white/10 hover:border-gold-400/60 hover:bg-gray-50 dark:hover:bg-white/[0.02]"
          }`}
        >
          <div className="w-12 h-12 rounded-2xl bg-gray-100 dark:bg-white/5 flex items-center justify-center">
            <Upload className="w-5 h-5 text-gray-400 dark:text-white/30" />
          </div>
          <div className="text-center">
            <p className="text-sm font-medium text-gray-600 dark:text-white/50">
              Drag & drop or <span className="text-gold-600 dark:text-gold-400">browse</span>
            </p>
            <p className="text-xs text-gray-400 dark:text-white/25 mt-1">JPG, PNG, WebP, AVIF — max 8 MB</p>
          </div>
          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => { const f = e.target.files?.[0]; if (f) selectFile(f); }}
          />
        </div>
      ) : (
        <div className="flex gap-5 flex-col sm:flex-row">
          {/* Preview */}
          <div className="relative w-full sm:w-40 h-40 rounded-2xl overflow-hidden shrink-0 bg-gray-100 dark:bg-white/5">
            {preview && (
              <Image src={preview} alt="Preview" fill className="object-cover" unoptimized />
            )}
            <button
              onClick={reset}
              className="absolute top-2 right-2 w-6 h-6 rounded-lg bg-black/50 text-white flex items-center justify-center hover:bg-black/70 transition"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Fields */}
          <div className="flex-1 flex flex-col gap-3">
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-white/35 mb-1.5">Caption</label>
              <input
                type="text"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="e.g. Grade A Vanilla Pods"
                className={inputCls}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-500 dark:text-white/35 mb-1.5">Category</label>
              <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
                {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            {errorMsg && (
              <p className="flex items-center gap-1.5 text-xs text-red-500 dark:text-red-400">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />{errorMsg}
              </p>
            )}

            <button
              onClick={upload}
              disabled={status === "uploading" || status === "success"}
              className="mt-auto flex items-center justify-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl bg-gold-400 text-forest-950 hover:bg-gold-500 transition disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "uploading" && <Loader2 className="w-4 h-4 animate-spin" />}
              {status === "success" && <CheckCircle2 className="w-4 h-4" />}
              {status === "uploading" ? "Uploading…" : status === "success" ? "Done!" : "Upload Image"}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function EditModal({
  item,
  onClose,
  onSaved,
}: { item: GalleryItem; onClose: () => void; onSaved: () => void }) {
  const [caption, setCaption] = useState(item.caption);
  const [category, setCategory] = useState(item.category);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    try {
      await updateGalleryCaption(item.id, caption, category);
      onSaved();
    } finally {
      setSaving(false);
    }
  };

  const inputCls = "w-full px-3 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 bg-white dark:bg-[#0d1117] text-gray-800 dark:text-white text-sm focus:outline-none focus:ring-1 focus:ring-gold-400 transition";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-[#0a0f14] border border-gray-200 dark:border-white/10 rounded-2xl p-6 w-full max-w-sm shadow-2xl">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-semibold text-gray-800 dark:text-white">Edit Image</h3>
          <button onClick={onClose} className="text-gray-400 dark:text-white/30 hover:text-gray-700 dark:hover:text-white transition">
            <X className="w-4 h-4" />
          </button>
        </div>
        <div className="relative aspect-video rounded-xl overflow-hidden bg-gray-100 dark:bg-white/5 mb-4">
          <Image src={item.url} alt={item.caption} fill className="object-cover" unoptimized />
        </div>
        <div className="flex flex-col gap-3">
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-white/35 mb-1.5">Caption</label>
            <input type="text" value={caption} onChange={(e) => setCaption(e.target.value)} className={inputCls} />
          </div>
          <div>
            <label className="block text-xs font-medium text-gray-500 dark:text-white/35 mb-1.5">Category</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} className={inputCls}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="flex gap-2 mt-1">
            <button
              onClick={onClose}
              className="flex-1 text-sm px-4 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 text-gray-600 dark:text-white/50 hover:text-gray-900 dark:hover:text-white transition"
            >
              Cancel
            </button>
            <button
              onClick={save}
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-xl bg-gold-400 text-forest-950 hover:bg-gold-500 transition disabled:opacity-60"
            >
              {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function GalleryCard({
  item,
  onDeleted,
  onEdited,
}: { item: GalleryItem; onDeleted: () => void; onEdited: () => void }) {
  const [deleting, setDeleting] = useState(false);
  const [editing, setEditing] = useState(false);
  const [, startTransition] = useTransition();

  const handleDelete = () => {
    if (!confirm(`Delete "${item.caption || "this image"}"?`)) return;
    setDeleting(true);
    startTransition(async () => {
      try {
        await deleteGalleryImage(item.id, item.storage_path);
        onDeleted();
      } catch {
        setDeleting(false);
      }
    });
  };

  return (
    <>
      <div className="group bg-white dark:bg-[#0a0f14] border border-gray-200 dark:border-white/8 rounded-2xl overflow-hidden flex flex-col">
        <div className="relative aspect-square bg-gray-100 dark:bg-white/5">
          <Image
            src={item.url}
            alt={item.caption || "Gallery image"}
            fill
            className="object-cover"
            unoptimized
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
          {/* Hover actions */}
          <div className="absolute inset-0 bg-forest-950/0 group-hover:bg-forest-950/55 transition-all flex items-center justify-center gap-2 opacity-0 group-hover:opacity-100">
            <button
              onClick={() => setEditing(true)}
              className="w-9 h-9 rounded-xl bg-white/15 text-white hover:bg-white/25 flex items-center justify-center transition"
              title="Edit"
            >
              <Pencil className="w-4 h-4" />
            </button>
            <button
              onClick={handleDelete}
              disabled={deleting}
              className="w-9 h-9 rounded-xl bg-red-500/80 text-white hover:bg-red-500 flex items-center justify-center transition disabled:opacity-50"
              title="Delete"
            >
              {deleting ? <Loader2 className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
            </button>
          </div>
        </div>
        <div className="px-3 py-2.5">
          <p className="text-xs font-medium text-gray-700 dark:text-white/70 truncate">{item.caption || "—"}</p>
          <p className="text-[10px] text-gold-600 dark:text-gold-400 uppercase tracking-widest mt-0.5">{item.category}</p>
        </div>
      </div>

      {editing && (
        <EditModal
          item={item}
          onClose={() => setEditing(false)}
          onSaved={() => { setEditing(false); onEdited(); }}
        />
      )}
    </>
  );
}

export default function AdminGallery({ items }: { items: GalleryItem[] }) {
  const router = useRouter();

  const refresh = () => router.refresh();

  return (
    <div className="flex flex-col flex-1 p-6 md:p-8 space-y-7">

      {/* Header */}
      <div className="flex items-center justify-between pt-2 md:pt-0">
        <div className="pl-12 md:pl-0">
          <h1 className="text-xl font-bold font-heading text-gray-900 dark:text-white">Gallery</h1>
          <p className="text-gray-500 dark:text-white/35 text-sm mt-0.5">Upload and manage gallery images</p>
        </div>
        <button
          onClick={refresh}
          className="flex items-center gap-2 text-xs text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 px-3 py-2 rounded-xl transition-all bg-white dark:bg-transparent"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Refresh
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
        {[
          { label: "Uploaded",   value: items.length, color: "text-gray-800 dark:text-white" },
          { label: "Categories", value: new Set(items.map((i) => i.category)).size, color: "text-gold-600 dark:text-gold-400" },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-white dark:bg-[#0a0f14] border border-gray-200 dark:border-white/8 rounded-2xl p-5 shadow-sm dark:shadow-none">
            <p className="text-xs text-gray-400 dark:text-white/35 uppercase tracking-widest mb-2">{label}</p>
            <p className={`text-3xl font-bold font-heading ${color}`}>{value}</p>
          </div>
        ))}
      </div>

      {/* Upload zone */}
      <UploadZone onSuccess={refresh} />

      {/* Uploaded images grid */}
      <div>
        <h2 className="text-xs font-semibold text-gray-400 dark:text-white/30 uppercase tracking-widest mb-4">
          Uploaded Images ({items.length})
        </h2>

        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-300 dark:text-white/20">
            <ImageIcon className="w-10 h-10 mb-3 opacity-30" />
            <p className="text-sm">No images uploaded yet. Use the form above to add your first one.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {items.map((item) => (
              <GalleryCard key={item.id} item={item} onDeleted={refresh} onEdited={refresh} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
