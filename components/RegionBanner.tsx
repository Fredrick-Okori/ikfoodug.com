"use client";

import { useEffect, useState } from "react";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import { X } from "lucide-react";
import { useRegion } from "./RegionProvider";
import { regionCodes, regions, regionPath, stripRegion, type Region } from "@/lib/regions";

const ONE_YEAR = 60 * 60 * 24 * 365;

function readCookie(name: string) {
  return document.cookie.match(new RegExp(`(?:^|;\\s*)${name}=([^;]*)`))?.[1];
}

/**
 * Suggests the visitor's local site instead of redirecting them, so search
 * engines (which mostly crawl from the US) can still index every region.
 */
export default function RegionBanner() {
  const current = useRegion();
  const pathname = usePathname();
  const [suggested, setSuggested] = useState<Region | null>(null);

  useEffect(() => {
    if (readCookie("ik_region_choice")) return;
    const country = readCookie("ik_country");
    const match = regionCodes
      .map((c) => regions[c])
      .find((r) => r.live && r.countryCode === country && r.code !== current.code);
    setSuggested(match ?? null);
  }, [current.code]);

  if (!suggested) return null;

  const remember = (code: string) => {
    document.cookie = `ik_region_choice=${code}; Path=/; Max-Age=${ONE_YEAR}; SameSite=Lax`;
    setSuggested(null);
  };

  const path = stripRegion(pathname);

  return (
    <div className="fixed bottom-4 inset-x-4 sm:inset-x-auto sm:right-6 z-[65] sm:max-w-sm bg-forest-950 text-white border border-gold-400/25 rounded-2xl shadow-2xl p-4 flex items-start gap-3" role="region" aria-label="Regional site suggestion">
      <div className="flex-1 text-sm">
        <p className="text-white/70">Visiting from {suggested.country}?</p>
        <NextLink
          href={regionPath(suggested.code, path)}
          onClick={() => remember(suggested.code)}
          className="font-semibold text-gold-400 hover:text-gold-300 link-underline"
        >
          Go to {suggested.name} →
        </NextLink>
      </div>
      <button
        onClick={() => remember(current.code)}
        className="w-7 h-7 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-400"
        aria-label={`Stay on ${current.name}`}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
