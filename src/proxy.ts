import { withAuth } from "next-auth/middleware";

const proxy = withAuth({
  pages: {
    signIn: "/auth/signin",
  },
});

export { proxy };
export default proxy;

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/analyzer/:path*",
    "/chat/:path*",
    "/api/analyze/:path*",
    "/api/jobs/:path*",
  ],
};
