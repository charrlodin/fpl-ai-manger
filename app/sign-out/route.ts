import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // Set cookie with expiration in the past to remove it
  const response = NextResponse.redirect(new URL('/', request.url));
  
  // Clear any auth cookies by setting them to expire in the past
  response.cookies.set('__session', '', { expires: new Date(0) });
  response.cookies.set('__clerk_db_jwt', '', { expires: new Date(0) });
  
  return response;
}
