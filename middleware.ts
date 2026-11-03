import { NextRequest, NextResponse } from "next/server";
import { countryLanguages } from "@/lib/languages";
import { DEFAULT_REGION, regionCodes, regions } from "@/lib/regions";

const ONE_YEAR = 60 * 60 * 24 * 365;

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin")) {
    if (!pathname.startsWith("/admin/login")) {
      const session = request.cookies.get("ik_admin");
      if (session?.value !== process.env.ADMIN_PASSWORD) {
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }
    }
    return NextResponse.next();
  }

  // The default region is served without a prefix: "/about" renders app/(main)/[region]
  // with region "ug", and "/ug/about" redirects back to the clean URL.
  const segment = `/${DEFAULT_REGION}`;
  if (pathname === segment || pathname.startsWith(`${segment}/`)) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(segment.length) || "/";
    return NextResponse.redirect(url, 308);
  }

  const prefixed = regionCodes.some((code) => {
    const { prefix } = regions[code];
    return prefix && (pathname === prefix || pathname.startsWith(`${prefix}/`));
  });
  let response: NextResponse;
  if (prefixed) {
    response = NextResponse.next();
  } else {
    const url = request.nextUrl.clone();
    url.pathname = `${segment}${pathname === "/" ? "" : pathname}`;
    response = NextResponse.rewrite(url);
  }

  const country = (
    request.headers.get("x-vercel-ip-country") ?? request.headers.get("cf-ipcountry")
  )?.toUpperCase();
  if (!country) return response;

  const attrs = `Path=/; Max-Age=${ONE_YEAR}; SameSite=Lax`;
  // Read client-side by RegionBanner to suggest the visitor's local site.
  if (request.cookies.get("ik_country")?.value !== country) {
    response.headers.append("Set-Cookie", `ik_country=${country}; ${attrs}`);
  }

  // First visit: pick a language from the visitor's country so the very first
  // page load is already translated (no English render + reload). `ik_geo`
  // marks detection as done so choosing English later is respected.
  if (!request.cookies.has("googtrans") && !request.cookies.has("ik_geo")) {
    response.headers.append("Set-Cookie", `ik_geo=1; ${attrs}`);
    const language = countryLanguages[country];
    // Raw header: Google Translate expects the unencoded "/en/xx" value.
    if (language) response.headers.append("Set-Cookie", `googtrans=/en/${language}; ${attrs}`);
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
