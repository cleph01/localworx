// middleware.ts

// This middleware checks if the user is authenticated before allowing access to the specified routes.
// If not authenticated, it redirects to the sign-in page with a callback URL to return to the original page after signing in.
// This is useful for protecting routes that require authentication, such as user dashboards or admin pages.

// middleware.ts
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    const signInUrl = new URL("/api/auth/signin", request.url);
    signInUrl.searchParams.set("callbackUrl", request.url);
    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/profile/:path*", "/admin/:path*"],
};
