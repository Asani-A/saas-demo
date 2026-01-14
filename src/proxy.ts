// src/proxy.ts
import { withAuth } from "next-auth/middleware";

// In Next.js 16.1, the default export of this file acts as the proxy function.
// next-auth's withAuth helper is compatible with this new convention.
export default withAuth({
  callbacks: {
    authorized: ({ token }) => !!token,
  },
  pages: {
    signIn: "/api/auth/signin",
  },
});

// The matcher remains the same as the old middleware convention
export const config = {
  matcher: [
    "/dashboard/:path*", 
    "/api/tasks/:path*"
  ],
};
