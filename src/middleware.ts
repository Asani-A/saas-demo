import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const isAuth = !!token;
    const isDashboardPage = req.nextUrl.pathname.startsWith("/dashboard");

    if (isDashboardPage && !isAuth) {
      return NextResponse.redirect(new URL("/api/auth/signin", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

// This "matcher" is the key part. It tells Next.js: 
// "Only run this middleware on these routes."
export const config = {
  matcher: ["/dashboard/:path*", "/api/tasks/:path*"],
};
