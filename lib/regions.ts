import type { Metadata } from "next";

export const SITE_URL = "https://ikfoodug.com";

export type RegionCode = "ug" | "us";

export interface Region {
  code: RegionCode;
  /** URL prefix. Uganda is the default site and is served without one. */
  prefix: string;
  name: string;
  /** Registered company name, used in the copyright line and structured data. */
  legalName: string;
  country: string;
  countryCode: string;
  hreflang: string;
  /** Drives spelling, units and date formats. */
  locale: "en-GB" | "en-US";
  /**
   * While false the region is reachable for preview but is noindexed, left out of
   * the sitemap / hreflang tags, and never suggested to visitors.
   */
  live: boolean;
  phone: { display: string; href: string };
  email: string;
  address: { lines: string[]; locality: string; regionName?: string; postalCode?: string };
  hours: { days: string; time: string; timezone: string };
  locationLabel: string;
  locationSub: string;
  /** Quantity units offered on the order form; the first is the default. */
  units: string[];
  currency: string;
  /** Default country on the order form. */
  orderCountry: string;
  /** Per-path SEO copy that replaces the page's default title and description. */
  pageMeta?: Record<string, { title: string; description: string; keywords?: string[] }>;
}

const US_KEYWORDS = [
  "IK Food USA", "Ugandan vanilla USA", "vanilla beans USA", "buy vanilla beans wholesale",
  "bulk vanilla beans United States", "vanilla bean supplier USA", "Grade A vanilla beans USA",
  "vanilla powder wholesale", "vanilla paste bulk", "natural vanilla supplier",
];

export const regions: Record<RegionCode, Region> = {
  ug: {
    code: "ug",
    prefix: "",
    name: "IK Food Uganda",
    legalName: "IK Food Uganda",
    country: "Uganda",
    countryCode: "UG",
    hreflang: "en-UG",
    locale: "en-GB",
    live: true,
    phone: { display: "+256 776 341 713", href: "tel:+256776341713" },
    email: "ikfoodugandalimited@gmail.com",
    address: { lines: ["P.O.Box 110281, Atenyi Rd Seguku"], locality: "Kampala", regionName: "Central Region" },
    hours: { days: "Mon–Fri", time: "8am – 5pm", timezone: "EAT (UTC+3)" },
    locationLabel: "Kampala, Uganda",
    locationSub: "East African headquarters",
    units: ["kg", "tonnes"],
    currency: "USD",
    orderCountry: "",
  },
  // TODO(us-launch): confirm the email and opening hours, run the region migration, then set `live: true`.
  us: {
    code: "us",
    prefix: "/us",
    name: "IK Food USA",
    legalName: "IK Food U LLC",
    country: "United States",
    countryCode: "US",
    hreflang: "en-US",
    locale: "en-US",
    live: false,
    phone: { display: "+1 (630) 656-3972", href: "tel:+16306563972" },
    email: "sales@ikfooduganda.com",
    address: { lines: ["2405 Essington Road, Suite B"], locality: "Joliet", regionName: "IL", postalCode: "60435" },
    hours: { days: "Mon–Fri", time: "9am – 5pm", timezone: "CT (UTC−6)" },
    locationLabel: "Joliet, Illinois, USA",
    locationSub: "US office",
    units: ["lb", "kg"],
    currency: "USD",
    orderCountry: "United States",
    pageMeta: {
      "/": {
        title: "IK Food USA | Premium Ugandan Vanilla Beans for US Buyers",
        description: "IK Food USA is the US franchise of IK Food Uganda, supplying hand-harvested, sun-cured Ugandan vanilla beans, powder, paste and caviar to food manufacturers, bakeries and retailers across the United States. Request a quote or sample.",
        keywords: US_KEYWORDS,
      },
      "/about": {
        title: "About IK Food USA | Ugandan Vanilla from Farm to US Buyers",
        description: "IK Food USA brings vanilla from IK Food Uganda, founded in Kampala in 2015 and partnering with 20,000+ smallholder farmers, to buyers across the United States.",
      },
      "/products": {
        title: "Vanilla Beans, Powder & Paste | IK Food USA",
        description: "Grade A and Grade B vanilla beans, vanilla powder, paste, caviar, split beans and green beans from Uganda, available to US buyers. Samples available on request.",
        keywords: US_KEYWORDS,
      },
      "/impact": {
        title: "Our Impact | IK Food USA",
        description: "Every IK Food USA order supports 20,000+ smallholder vanilla farmers in Central Uganda through fair pricing, training and direct market access.",
      },
      "/case-studies": {
        title: "Case Studies | IK Food USA",
        description: "How IK Food sources, cures and supplies premium Ugandan vanilla, and the farmer-first model behind every bean we bring to the United States.",
      },
      "/blog": {
        title: "Vanilla News & Insights | IK Food USA",
        description: "News, sourcing guides and industry insight on Ugandan vanilla for US food manufacturers, bakers and retailers.",
      },
      "/gallery": {
        title: "Gallery | IK Food USA",
        description: "Photos from the Ugandan vanilla farms, farming communities and processing operations behind IK Food USA.",
      },
      "/contact": {
        title: "Contact IK Food USA | Request a Vanilla Quote or Sample",
        description: "Contact the IK Food USA team for pricing, samples and delivery of premium Ugandan vanilla in the United States.",
      },
    },
  },
};

export const regionCodes = Object.keys(regions) as RegionCode[];
export const DEFAULT_REGION: RegionCode = "ug";

export function isRegion(value: string): value is RegionCode {
  return value in regions;
}

export function getRegion(code: string): Region {
  return isRegion(code) ? regions[code] : regions[DEFAULT_REGION];
}

/** Prefix an internal path with the region's URL prefix ("/about" → "/us/about"). */
export function regionPath(code: RegionCode, path: string) {
  const { prefix } = regions[code];
  if (!prefix || !path.startsWith("/")) return path;
  return path === "/" ? prefix : `${prefix}${path}`;
}

/**
 * Strip the region from a pathname ("/us/about" → "/about"). Uganda pages are
 * prerendered at "/ug/..." but served at "/...", so the server and browser see
 * different pathnames; compare against this to keep hydration consistent.
 */
export function stripRegion(pathname: string) {
  const match = pathname.match(/^\/([a-z]{2})(?=\/|$)/);
  if (!match || !isRegion(match[1])) return pathname;
  return pathname.slice(match[0].length) || "/";
}

export function regionUrl(code: RegionCode, path: string) {
  const p = regionPath(code, path);
  return p === "/" ? SITE_URL : `${SITE_URL}${p}`;
}

/** Canonical + hreflang alternates for a path that exists in every region. */
export function regionAlternates(code: RegionCode, path: string): Metadata["alternates"] {
  const live = regionCodes.filter((c) => regions[c].live);
  if (live.length < 2) return { canonical: regionUrl(code, path) };
  return {
    canonical: regionUrl(code, path),
    languages: {
      ...Object.fromEntries(live.map((c) => [regions[c].hreflang, regionUrl(c, path)])),
      "x-default": regionUrl(DEFAULT_REGION, path),
    },
  };
}

/** Point a page's canonical, hreflang and Open Graph URL at the current region. */
export function withRegion(metadata: Metadata, code: RegionCode, path: string): Metadata {
  const r = regions[code];
  const meta = r.pageMeta?.[path];
  return {
    ...metadata,
    ...(meta && {
      // Absolute so the root "| IK Food Uganda" template isn't appended.
      title: { absolute: meta.title },
      description: meta.description,
      keywords: meta.keywords ?? metadata.keywords,
    }),
    alternates: regionAlternates(code, path),
    // A page-level openGraph replaces the root one wholesale, so only set it when there is something to override.
    ...((metadata.openGraph || meta) && {
      openGraph: {
        images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
        ...metadata.openGraph,
        ...(meta && { title: meta.title, description: meta.description, siteName: r.name }),
        url: regionUrl(code, path),
        locale: r.locale.replace("-", "_"),
      },
    }),
  };
}
