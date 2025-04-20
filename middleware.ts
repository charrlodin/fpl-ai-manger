import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define public routes that don't require authentication
const isPublic = createRouteMatcher(["/"]);

export default function middleware(req: NextRequest) {
  // Use Clerk middleware
  return clerkMiddleware()(req);
}
 
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"]
};
