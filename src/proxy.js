import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { auth } from "@/lib/auth";

const ROLE_HOME = {
  Buyer: "/dashboard/buyer",
  Seller: "/dashboard/seller",
  Admin: "/dashboard/admin",
};

export async function proxy(request) {
  const { pathname } = request.nextUrl;

  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user) {
    return NextResponse.redirect(new URL("/auth/login", request.url));
  }

  const role = session.user.role || "Buyer";

  const matchedRole = Object.keys(ROLE_HOME).find((r) =>
    pathname.startsWith(`/dashboard/${r.toLowerCase()}`)
  );

  if (matchedRole && matchedRole !== role) {
    return NextResponse.redirect(new URL(ROLE_HOME[role], request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};