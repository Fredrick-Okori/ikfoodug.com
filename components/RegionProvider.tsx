"use client";

import { createContext, useContext } from "react";
import NextLink from "next/link";
import { regions, regionPath, DEFAULT_REGION, type RegionCode } from "@/lib/regions";

const RegionContext = createContext<RegionCode>(DEFAULT_REGION);

export function RegionProvider({ region, children }: { region: RegionCode; children: React.ReactNode }) {
  return <RegionContext.Provider value={region}>{children}</RegionContext.Provider>;
}

export function useRegion() {
  return regions[useContext(RegionContext)];
}

/** Drop-in `next/link` that keeps visitors inside their region ("/about" → "/us/about"). */
export function RegionLink({ href, ...props }: React.ComponentProps<typeof NextLink>) {
  const region = useContext(RegionContext);
  return <NextLink href={typeof href === "string" ? regionPath(region, href) : href} {...props} />;
}
