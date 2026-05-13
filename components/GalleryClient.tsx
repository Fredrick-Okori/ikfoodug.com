"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { X, ChevronLeft, ChevronRight, ZoomIn } from "lucide-react";

export interface GalleryImage {
  src: string;
  caption: string;
  category: string;
}

export default function GalleryClient({ images }: { images: GalleryImage[] }) {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const open  = (i: number) => setLightboxIndex(i);
  const close = () => setLightboxIndex(null);

  const prev = useCallback(() =>
    setLightboxIndex((i) => (i !== null ? (i - 1 + images.length) % images.length : null)),
    [images.length]
  );
  const next = useCallback(() =>
    setLightboxIndex((i) => (i !== null ? (i + 1) % images.length : null)),
    [images.length]
  );

  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft")  prev();
      if (e.key === "ArrowRight") next();
      if (e.key === "Escape")     close();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, prev, next]);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [lightboxIndex]);

  return (
    <>
      {/* ── Thumbnail grid ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
        {images.map((img, i) => (
          <button
            key={i}
            onClick={() => open(i)}
            className="group relative aspect-square rounded-2xl overflow-hidden cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400 focus-visible:ring-offset-2 focus-visible:ring-offset-cream"
            aria-label={`View ${img.caption}`}
          >
            <Image
              src={img.src}
              alt={img.caption}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            <div className="absolute inset-0 bg-forest-950/0 group-hover:bg-forest-950/50 transition-all duration-300 flex flex-col items-center justify-center gap-2">
              <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-lg" aria-hidden="true" />
              <p className="text-white text-xs font-medium px-3 text-center leading-snug opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-sm">
                {img.caption}
              </p>
            </div>
          </button>
        ))}
      </div>

      {/* ── Lightbox ── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-[100] bg-forest-950/96 backdrop-blur-md flex flex-col"
          role="dialog"
          aria-modal="true"
          aria-label="Image viewer"
        >
          {/* Top bar */}
          <div className="flex items-center justify-between px-5 py-4 shrink-0 border-b border-white/8">
            <div>
              <p className="text-white font-semibold text-sm leading-none">
                {images[lightboxIndex].caption}
              </p>
              <p className="text-gold-400 text-[11px] uppercase tracking-widest mt-1">
                {images[lightboxIndex].category}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-white/35 text-xs tabular-nums">
                {lightboxIndex + 1} / {images.length}
              </span>
              <button
                onClick={close}
                aria-label="Close"
                className="text-white/50 hover:text-white bg-white/8 hover:bg-white/15 rounded-xl p-2 transition-all"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Main image area */}
          <div className="flex-1 relative flex items-center justify-center min-h-0 px-4 py-4">
            {/* Prev */}
            <button
              onClick={prev}
              aria-label="Previous image"
              className="absolute left-3 z-10 text-white/60 hover:text-white bg-white/8 hover:bg-white/18 rounded-full p-3 transition-all"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            <div className="relative w-full h-full max-w-5xl mx-auto">
              <Image
                src={images[lightboxIndex].src}
                alt={images[lightboxIndex].caption}
                fill
                className="object-contain"
                sizes="100vw"
                priority
              />
            </div>

            {/* Next */}
            <button
              onClick={next}
              aria-label="Next image"
              className="absolute right-3 z-10 text-white/60 hover:text-white bg-white/8 hover:bg-white/18 rounded-full p-3 transition-all"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Thumbnail strip */}
          <div className="shrink-0 border-t border-white/8 px-4 py-4">
            <div className="flex gap-2 overflow-x-auto pb-1 justify-start">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setLightboxIndex(i)}
                  aria-label={img.caption}
                  className={`relative w-14 h-14 rounded-xl overflow-hidden shrink-0 transition-all duration-200 border-2 ${
                    i === lightboxIndex
                      ? "border-gold-400 opacity-100 scale-105"
                      : "border-transparent opacity-35 hover:opacity-65"
                  }`}
                >
                  <Image
                    src={img.src}
                    alt={img.caption}
                    fill
                    className="object-cover"
                    sizes="56px"
                  />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
