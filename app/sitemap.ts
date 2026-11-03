import type { MetadataRoute } from "next";
import { regionCodes, regions, regionUrl, regionAlternates } from "@/lib/regions";

type Entry = MetadataRoute.Sitemap[number];

const pages: { path: string; changeFrequency: Entry["changeFrequency"]; priority: number }[] = [
  { path: "/",             changeFrequency: "weekly",  priority: 1.0 },
  { path: "/products",     changeFrequency: "weekly",  priority: 0.9 },
  { path: "/about",        changeFrequency: "monthly", priority: 0.8 },
  { path: "/impact",       changeFrequency: "monthly", priority: 0.8 },
  { path: "/case-studies", changeFrequency: "monthly", priority: 0.8 },
  { path: "/blog",         changeFrequency: "weekly",  priority: 0.8 },
  { path: "/gallery",      changeFrequency: "monthly", priority: 0.7 },
  { path: "/contact",      changeFrequency: "yearly",  priority: 0.6 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return regionCodes
    .filter((code) => regions[code].live)
    .flatMap((code) =>
      pages.map(({ path, changeFrequency, priority }) => {
        const languages = regionAlternates(code, path)?.languages as Record<string, string> | undefined;
        return {
          url: regionUrl(code, path),
          lastModified: now,
          changeFrequency,
          priority,
          ...(languages && { alternates: { languages } }),
        };
      }),
    );
}
