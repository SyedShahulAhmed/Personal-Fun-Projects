import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Public routes
  if (
    pathname === "/api/widget" ||
    pathname === "/login" ||
    pathname === "/api/auth/login" ||
    pathname === "/api/auth/logout"
  ) {
    return NextResponse.next();
  }

  const token = request.cookies.get("admin_session")?.value;

  if (!token || !process.env.AUTH_SECRET) {
    return redirectToLogin(request);
  }

  try {
    const secret = new TextEncoder().encode(
      process.env.AUTH_SECRET
    );

    const { payload } = await jwtVerify(token, secret);

    if (
      payload.role !== "admin" ||
      payload.username !== process.env.ADMIN_USERNAME
    ) {
      return redirectToLogin(request);
    }

    return NextResponse.next();
  } catch {
    return redirectToLogin(request);
  }
}

function redirectToLogin(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // API callers should receive JSON, not an HTML redirect.
  if (pathname.startsWith("/api/")) {
    return NextResponse.json(
      { error: "Unauthorized" },
      { status: 401 }
    );
  }

  const loginUrl = new URL("/login", request.url);

  return NextResponse.redirect(loginUrl);
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml).*)",
  ],
};