import type { NextConfig } from 'next';

import { securityHeaders } from './src/lib/security-headers';

const nextConfig: NextConfig = {
  poweredByHeader: false,
  experimental: {
    inlineCss: true,
  },
  headers: async () => [
    {
      source: '/:path*',
      headers: securityHeaders(process.env.NODE_ENV === 'development'),
    },
  ],
};

export default nextConfig;
