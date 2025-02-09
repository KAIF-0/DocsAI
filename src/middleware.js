import { NextResponse } from "next/server";
import { env } from "@/env";

export function middleware(request) {
  const sessionToken = request.cookies.get("sessionToken");
  const { pathname } = request.nextUrl;

  console.log(sessionToken, pathname);

  //   // Public paths that don't require authentication
  //   const publicPaths = [
  //     "/",
  //     "/auth/login",
  //     "/auth/signup",
  //     "/auth/signup/otp",
  //     "/auth/signup/success",
  //     "/auth/google/success",
  //   ];

  //   // Check if the current path is public
  //   const isPublicPath = publicPaths.some(path => pathname.startsWith(path));

  //   // If no session token and trying to access protected route
  //   if (!sessionToken && !isPublicPath) {
  //     return NextResponse.redirect(new URL("/auth/login", request.url));
  //   }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
