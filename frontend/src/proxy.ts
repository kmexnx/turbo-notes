import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const token = request.cookies.get('accessToken')?.value;
  
  const path = request.nextUrl.pathname;

  const isPublicPath = path === '/login' || path === '/signup';

  // Redirect logic
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}


export const config = {
  matcher: [
    '/',
    '/note/:path*',
    '/login',
    '/signup',
  ],
};