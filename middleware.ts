// middleware.ts

/**
 * Middleware to protect authenticated routes (e.g., /dashboard, /profile, /admin).
 * In production, it checks for a valid session token using next-auth's getToken().
 * If not authenticated, it redirects to the sign-in page with a callback to return after login.
 *
 * In development, the middleware is disabled to avoid cookie/session detection issues.
 */

import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // ✅ Skip auth checks during development
  if (process.env.NODE_ENV !== "production") {
    return NextResponse.next();
  }

  // Check for a valid JWT session token
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const isAuth = !!token;

  // Protect only these specific routes
  const protectedPaths = ["/dashboard", "/profile", "/admin"];
  const isProtected = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  // If route is protected and user is not authenticated, redirect to sign-in
  if (isProtected && !isAuth) {
    const signInUrl = new URL("/api/auth/signin", req.url);
    signInUrl.searchParams.set("callbackUrl", req.nextUrl.pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Otherwise, allow request to continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/admin/:path*"],
};
