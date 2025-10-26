import crypto from 'crypto';

// Generate a CSRF token
export function generateCsrfToken() {
  return crypto.randomBytes(32).toString('hex');
}

// Validate CSRF token
export function validateCsrfToken(token: string) {
  const expectedToken = process.env.NEXT_PUBLIC_CSRF_TOKEN;
  return token === expectedToken;
}
