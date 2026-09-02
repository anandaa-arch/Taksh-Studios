/**
 * Reads the stored admin Basic-Auth token from sessionStorage and returns
 * the Authorization header. Falls back to an empty string if not found.
 */
function getAdminAuthHeader(): string {
  if (typeof window === 'undefined') return '';
  return sessionStorage.getItem('admin_auth') || '';
}

/**
 * Wrapper around fetch() that automatically attaches the admin
 * Basic-Auth header for /api/admin/* requests.
 */
export async function adminFetch(
  input: string,
  init: RequestInit = {}
): Promise<Response> {
  const authHeader = getAdminAuthHeader();
  return fetch(input, {
    ...init,
    headers: {
      ...(init.headers || {}),
      Authorization: authHeader,
    },
  });
}
