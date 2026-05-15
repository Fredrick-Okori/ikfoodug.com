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
  { src: "/IMG_4873_converted.avif",                                    caption: "Grade A Vanilla Beans",                     category: "Vanilla" },
  { src: "/vanilla_bean_harvest.avif",                                  caption: "Vanilla Bean Harvest",                      category: "Vanilla" },
  { src: "/vanilla_bean_green.avif",                                    caption: "Fresh Green Vanilla Beans on the Vine",      category: "Vanilla" },
  { src: "/79a461de-c579-4d35-bc23-b1e5ba5f51f3_converted.avif",        caption: "Vanilla Vine Close-up",                     category: "Farm" },
  { src: "/IMG_4165_converted.avif",                                    caption: "Sun-Cured Ugandan Vanilla Pods",             category: "Vanilla" },
  { src: "/Screenshot 2026-05-06 at 15.31.13_converted.avif",           caption: "Farmer Inspecting Vanilla Vines",           category: "Community" },
  { src: "/Screenshot 2026-05-06 at 14.42.53_converted.avif",           caption: "Sorting & Grading Vanilla Beans",           category: "Processing" },
  { src: "/Screenshot 2026-05-06 at 14.46.21_converted.avif",           caption: "Community Processing",                      category: "Community" },
  { src: "/372838c3-c504-48e1-b9b1-3b34442d01d2_converted.avif",        caption: "Export-Ready Packaged Vanilla",             category: "Export" },
  { src: "/ibanda.avif",                                                caption: "Ibanda Region — Vanilla Farming Area",       category: "Farm" },
  { src: "/IMG_3172_converted.avif",                                    caption: "Uganda's Lush Farming Landscape",           category: "Farm" },
  { src: "/IMG_7924_converted.avif",                                    caption: "IK Food Uganda Farmers",                    category: "Community" },
  { src: "/IMG_7806_converted.avif",                                    caption: "Vanilla Processing Operation",              category: "Processing" },
  { src: "/IMG_7929_converted.avif",                                    caption: "Quality Assurance",                         category: "Processing" },
  { src: "/IMG_3045_converted.avif",                                    caption: "Fresh Organic Produce",                     category: "Products" },
  { src: "/IMG_7889_converted.avif",                                    caption: "Hass Avocado Farm",                         category: "Products" },
  { src: "/IMG_4160_converted.avif",                                    caption: "Organic Cocoa Beans",                       category: "Products" },
  { src: "/IMG_3062_converted.avif",                                    caption: "Garden Eggs — Fresh & Vibrant",             category: "Products" },
  { src: "/coffee-plantation.jpg",                                      caption: "Fine Robusta Coffee Plantation",            category: "Products" },
  { src: "/quality_split.avif",                                         caption: "Farm-to-Export Quality Standard",           category: "Farm" },
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
            finest organic vanilla.
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
