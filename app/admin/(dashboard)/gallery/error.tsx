"use client";

export default function GalleryError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center flex-1 py-24 gap-4 text-center px-6">
      <p className="text-red-400 text-sm font-medium">Gallery error</p>
      <p className="text-xs text-gray-400 dark:text-white/30 max-w-sm">{error.message}</p>
      <button
        onClick={reset}
        className="text-xs px-4 py-2 rounded-xl border border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition"
      >
        Try again
      </button>
    </div>
  );
}
