import type { Metadata } from "next";
import GalleryClient, { type GalleryImage } from "@/components/GalleryClient";
import { supabase } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Gallery | IK Food Uganda",
  description: "Photos from IK Food Uganda's vanilla farms, farming communities, processing operations, and export-grade products across Uganda's highlands.",
  openGraph: {
    title: "Gallery | IK Food Uganda",
    url: "https://ikfoodug.com/gallery",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
  },
  alternates: { canonical: "https://ikfoodug.com/gallery" },
};

const staticImages: GalleryImage[] = [
  // ── Products folder — all images ──────────────────────────────────────
  { src: "/products/grade-A-quality.avif",                                   caption: "Grade A Vanilla — Premium Quality",        category: "Vanilla" },
  { src: "/products/grade-A_converted.avif",                                 caption: "Grade A Vanilla Beans",                    category: "Vanilla" },
  { src: "/products/grade-B_quality_converted.avif",                         caption: "Grade B Vanilla Beans",                    category: "Vanilla" },
  { src: "/products/splits-quality_converted.avif",                          caption: "Split Vanilla Beans",                      category: "Vanilla" },
  { src: "/products/vanilla_paste.avif",                                     caption: "Vanilla Paste",                            category: "Products" },
  { src: "/products/vanilla_powder.avif",                                    caption: "Vanilla Powder",                           category: "Products" },
  { src: "/products/vanilla_caviar.jpg",                                     caption: "Vanilla Caviar",                           category: "Products" },
  { src: "/products/green_bean.avif",                                        caption: "Vanilla Green Beans",                      category: "Vanilla" },
  { src: "/products/product_hero.avif",                                      caption: "IK Food Uganda Premium Products",          category: "Products" },
  { src: "/products/IMG_0501.JPG",                                           caption: "Vanilla Product Range",                    category: "Products" },
  { src: "/products/IMG_2200_converted.avif",                                caption: "Vanilla Quality Inspection",               category: "Processing" },
  { src: "/products/IMG_2201_converted.avif",                                caption: "Ugandan Vanilla Pods",                     category: "Vanilla" },
  { src: "/products/IMG_2216_converted.avif",                                caption: "Vanilla Processing",                       category: "Processing" },
  { src: "/products/IMG_2653_converted.avif",                                caption: "Premium Vanilla Beans",                    category: "Vanilla" },
  { src: "/products/IMG_2654_converted.avif",                                caption: "Vanilla Harvest",                          category: "Farm" },
  { src: "/products/IMG_4069_converted.avif",                                caption: "Export-Grade Vanilla",                     category: "Export" },
  { src: "/products/IMG_4074_converted.avif",                                caption: "Premium Vanilla Pods",                     category: "Vanilla" },
  { src: "/products/IMG_4394_converted.avif",                                caption: "Vanilla Grading & Sorting",                category: "Processing" },
  { src: "/products/IMG_7159_converted.avif",                                caption: "IK Food Uganda Vanilla",                   category: "Vanilla" },
  { src: "/products/IMG_7160_converted.avif",                                caption: "Natural Vanilla Beans",                    category: "Vanilla" },
  { src: "/products/IMG_7161_converted.avif",                                caption: "Vanilla Farm Uganda",                      category: "Farm" },
  { src: "/products/IMG_7165_converted.avif",                                caption: "Vanilla Bean Curing",                      category: "Processing" },
  { src: "/products/IMG_7166_converted.avif",                                caption: "Vanilla Pods Ready for Export",            category: "Export" },
  { src: "/products/ed0a6bce-3812-4326-aa6c-8e9a6502aa34_converted.avif",   caption: "Ugandan Vanilla — Farmgate",               category: "Farm" },
  // ── Retained farm & community shots ───────────────────────────────────
  { src: "/vanilla_bean_harvest.avif",                                        caption: "Vanilla Bean Harvest",                     category: "Vanilla" },
  { src: "/79a461de-c579-4d35-bc23-b1e5ba5f51f3_converted.avif",             caption: "Vanilla Vine Close-up",                    category: "Farm" },
  { src: "/IMG_4165_converted.avif",                                          caption: "Sun-Cured Ugandan Vanilla Pods",           category: "Vanilla" },
  { src: "/Screenshot 2026-05-06 at 15.31.13_converted.avif",                caption: "Farmer Inspecting Vanilla Vines",          category: "Community" },
  { src: "/Screenshot 2026-05-06 at 14.42.53_converted.avif",                caption: "Sorting & Grading Vanilla Beans",          category: "Processing" },
  { src: "/Screenshot 2026-05-06 at 14.46.21_converted.avif",                caption: "Community Processing",                     category: "Community" },
  { src: "/372838c3-c504-48e1-b9b1-3b34442d01d2_converted.avif",             caption: "Export-Ready Packaged Vanilla",            category: "Export" },
  { src: "/ibanda.avif",                                                      caption: "Ibanda Region — Vanilla Farming Area",     category: "Farm" },
  { src: "/IMG_7924_converted.avif",                                          caption: "IK Food Uganda Farmers",                   category: "Community" },
  { src: "/IMG_7806_converted.avif",                                          caption: "Vanilla Processing Operation",             category: "Processing" },
  { src: "/IMG_7929_converted.avif",                                          caption: "Quality Assurance",                        category: "Processing" },
  { src: "/quality_split.avif",                                               caption: "Farm-to-Export Quality Standard",          category: "Farm" },
];

export default async function GalleryPage() {
  const { data } = await supabase
    .from("gallery")
    .select("url, caption, category")
    .order("created_at", { ascending: false });

  const dbImages: GalleryImage[] = (data ?? []).map((item) => ({
    src: item.url,
    caption: item.caption || "",
    category: item.category || "General",
  }));

  const allImages = [...dbImages, ...staticImages];

  return (
    <>
      {/* ── Hero ── */}
      <section className="pt-32 pb-12 bg-forest-950 noise-overlay relative" aria-label="Gallery hero">
        <div className="max-w-7xl mx-auto container-px">
          <span className="section-eyebrow-light mb-4">Our Gallery</span>
          <h1 className="text-display-2xl font-bold text-white text-balance max-w-xl">
            From Farm to Export
          </h1>
          <p className="text-white/50 text-lg mt-4 max-w-2xl leading-relaxed">
            A visual journey through Uganda&apos;s vanilla farms, the communities
            behind our harvest, and the quality process that delivers the world&apos;s
            finest natural vanilla.
          </p>
          <p className="text-white/30 text-sm mt-6">
            Click any image to view full screen &mdash; use arrow keys or thumbnails to navigate.
          </p>
        </div>
      </section>

      {/* ── Gallery grid ── */}
      <section className="section-y bg-cream map-bg" aria-label="Photo gallery">
        <div className="max-w-7xl mx-auto container-px">
          <GalleryClient images={allImages} />
        </div>
      </section>
    </>
  );
}
