import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getCountryFromRequest, isOfacBlockedCountry } from '@/lib/geo';

export function middleware(request: NextRequest) {
  if (request.nextUrl.pathname.startsWith('/unavailable')) {
    return NextResponse.next();
  }

  const country = getCountryFromRequest(request.headers) ?? request.geo?.country ?? null;

  if (isOfacBlockedCountry(country)) {
    return NextResponse.rewrite(new URL('/unavailable', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon.png|icons/).*)'],
};
