import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  const isAdminRoute = request.nextUrl.pathname.startsWith('/admin');

  if (isAdminRoute) {
    const adminPassword = process.env.ADMIN_PASSWORD;

    if (!adminPassword) {
      console.error('[proxy] ADMIN_PASSWORD environment variable is not set.');
      return new NextResponse('Server configuration error', { status: 500 });
    }

    const authHeader = request.headers.get('authorization');

    if (!authHeader) {
      return new NextResponse('Authentication required', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="Taksh Studios Admin"',
        },
      });
    }

    try {
      const authValue = authHeader.split(' ')[1];
      if (!authValue) {
        return new NextResponse('Invalid authorization header', { status: 400 });
      }
      const decoded = atob(authValue);
      const [user, pwd] = decoded.split(':');

      if (user !== 'admin' || pwd !== adminPassword) {
        return new NextResponse('Invalid credentials', { status: 401 });
      }
    } catch {
      return new NextResponse('Invalid authorization header', { status: 400 });
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
