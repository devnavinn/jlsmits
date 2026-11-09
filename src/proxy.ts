import { NextResponse, type NextRequest } from "next/server";

// Optimistic redirect only: the real session check is requireAdmin() in the admin layout and actions.
export function proxy(request: NextRequest) {
  const isLogin = request.nextUrl.pathname === "/admin/login";
  if (!isLogin && !request.cookies.has("admin_session")) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
