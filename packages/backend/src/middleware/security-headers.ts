// Security headers middleware

export function securityHeaders(): Record<string, string> {
  return {
    'X-Content-Type-Options': 'nosniff',
    'X-Frame-Options': 'DENY',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'X-XSS-Protection': '0', // Deprecated, CSP handles this
    'Content-Security-Policy': [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' https://api.mapbox.com",
      "worker-src 'self' blob: https://api.mapbox.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "font-src 'self' https://fonts.gstatic.com",
      "img-src 'self' data: blob: https:",
      "media-src 'self' blob: https:",
      "connect-src 'self' https://api.mapbox.com https://events.mapbox.com https://api.stripe.com https://api.deepseek.com",
      "frame-src 'self' https://connect.stripe.com https://verify.stripe.com",
      "form-action 'self' https://connect.stripe.com",
    ].join('; '),
  };
}
