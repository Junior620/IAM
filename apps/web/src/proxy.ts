import { NextResponse, type NextRequest } from "next/server";

const PUBLIC_FILE = /\.[^/]+$/;
const INTERNAL_LOCALE_HEADER = "x-iam-internal-locale";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/studio") ||
    pathname === "/favicon.ico" ||
    pathname === "/icon" ||
    pathname === "/apple-icon" ||
    pathname === "/robots.txt" ||
    pathname === "/sitemap.xml" ||
    PUBLIC_FILE.test(pathname)
  ) {
    return NextResponse.next();
  }

  if (
    (pathname === "/fr" || pathname.startsWith("/fr/")) &&
    request.headers.get(INTERNAL_LOCALE_HEADER) !== "fr"
  ) {
    const destination = pathname === "/fr" ? "/" : pathname.slice(3);
    return NextResponse.redirect(new URL(destination, request.url), 308);
  }

  if (pathname === "/en" || pathname.startsWith("/en/")) {
    return NextResponse.next();
  }

  const rewritten = request.nextUrl.clone();
  rewritten.pathname = `/fr${pathname === "/" ? "" : pathname}`;
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(INTERNAL_LOCALE_HEADER, "fr");
  return NextResponse.rewrite(rewritten, {
    request: { headers: requestHeaders },
  });
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"],
};
