import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://ikfoodug.com";
  const now = new Date();

  return [
    { url: base,                        lastModified: now, changeFrequency: "weekly",  priority: 1.0 },
    { url: `${base}/products`,          lastModified: now, changeFrequency: "weekly",  priority: 0.9 },
    { url: `${base}/about`,             lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/impact`,            lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/case-studies`,      lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/blog`,              lastModified: now, changeFrequency: "weekly",  priority: 0.8 },
    { url: `${base}/gallery`,           lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${base}/contact`,           lastModified: now, changeFrequency: "yearly",  priority: 0.6 },
  ];
}
