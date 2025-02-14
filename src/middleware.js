import { NextResponse } from "next/server";
import { env } from "@/env";
import { cookies } from "next/headers";

export async function middleware(request) {
  // const pathname = request.nextUrl.pathname;
  // const sessionToken = await request.cookies.get("sessionToken")?.value;
  // // console.log(sessionToken);

  // const authProtectedRoutes = ["/chat", "/dashboard", "/feed-docs", "/plan"];

  // //auth middleware
  // if (authProtectedRoutes.some((route) => pathname.startsWith(route))) {
  //   if (!sessionToken) {
  //     console.log("No session token found. Redirecting to Sign-In page");
  //     return NextResponse.redirect(new URL("/auth/signin", request.url));
  //   }
  // }

  // //if user is already logged in so protecting auth routes
  // const loggedInProtectedRoutes = ["/auth"];
  // if (loggedInProtectedRoutes.some((route) => pathname.startsWith(route))) {
  //   if (sessionToken) {
  //     console.log("User already logged in! Redirecting to Dashboard...");
  //     return NextResponse.redirect(new URL("/dashboard", request.url));
  //   }
  // }
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
