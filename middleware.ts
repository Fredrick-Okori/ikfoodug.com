import { NextRequest, NextResponse } from "next/server";
import { countryLanguages } from "@/lib/languages";

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

  // First visit: pick a language from the visitor's country so the very first
  // page load is already translated (no English render + reload). `ik_geo`
  // marks detection as done so choosing English later is respected.
  if (!request.cookies.has("googtrans") && !request.cookies.has("ik_geo")) {
    const country = (
      request.headers.get("x-vercel-ip-country") ?? request.headers.get("cf-ipcountry")
    )?.toUpperCase();

    if (country) {
      const response = NextResponse.next();
      const attrs = `Path=/; Max-Age=${ONE_YEAR}; SameSite=Lax`;
      response.headers.append("Set-Cookie", `ik_geo=1; ${attrs}`);
      const language = countryLanguages[country];
      // Raw header: Google Translate expects the unencoded "/en/xx" value.
      if (language) response.headers.append("Set-Cookie", `googtrans=/en/${language}; ${attrs}`);
      return response;
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/|api/|.*\\..*).*)"],
};
