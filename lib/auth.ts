import { NextResponse } from 'next/server';

/**
 * Verify Basic Auth credentials from an API request.
 * Used to protect `/api/admin/*` route handlers.
 * Returns true if the credentials match the admin user.
 */
export function verifyAdminAuth(request: Request): boolean {
  const authHeader = request.headers.get('authorization');
  if (!authHeader || !authHeader.startsWith('Basic ')) return false;

  const adminPassword = process.env.ADMIN_PASSWORD;
  if (!adminPassword) return false;

  try {
    const encoded = authHeader.split(' ')[1];
    const decoded = Buffer.from(encoded, 'base64').toString();
    const [user, pwd] = decoded.split(':');
    return user === 'admin' && pwd === adminPassword;
  } catch {
    return false;
  }
}

/**
 * Returns a 401 Unauthorized response for unauthenticated admin requests.
 */
export function unauthorizedResponse() {
  return NextResponse.json(
    { error: 'Unauthorized' },
    { status: 401 }
  );
}
