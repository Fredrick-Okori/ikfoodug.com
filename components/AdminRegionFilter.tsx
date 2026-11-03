"use client";

import { regionCodes, regions, type RegionCode } from "@/lib/regions";

export type RegionFilter = RegionCode | "all";

/** Rows saved before the region column existed belong to Uganda. */
export function rowRegion(row: { region?: RegionCode | null }): RegionCode {
  return row.region ?? "ug";
}

export default function AdminRegionFilter({ value, onChange }: { value: RegionFilter; onChange: (value: RegionFilter) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value as RegionFilter)}
      aria-label="Filter by site"
      className="text-xs bg-white dark:bg-transparent border border-gray-200 dark:border-white/10 text-gray-500 dark:text-white/60 rounded-xl px-3 py-2 focus:outline-none focus:ring-1 focus:ring-gold-400 cursor-pointer"
    >
      <option value="all">All sites</option>
      {regionCodes.map((code) => (
        <option key={code} value={code}>{regions[code].name}</option>
      ))}
    </select>
  );
}
