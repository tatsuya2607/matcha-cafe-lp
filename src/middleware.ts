import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  // Match all pathnames except for static assets and API/Next internals
  matcher: ['/', '/(ja|en)/:path*', '/((?!_next|_vercel|.*\\..*).*)']
};
