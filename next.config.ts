import type { NextConfig } from 'next';
import withBundleAnalyzer from '@next/bundle-analyzer';

const runWithBundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const securityHeaders = [
  {
    key: 'X-DNS-Prefetch-Control',
    value: 'on',
  },
  {
    key: 'X-XSS-Protection',
    value: '1; mode=block',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Strict-Transport-Security',
    value: 'max-age=63072000; includeSubDomains; preload',
  },
];

const nextConfig: NextConfig = runWithBundleAnalyzer({
  reactStrictMode: true,
  output: 'standalone',
  compiler: {
    removeConsole:
      process.env.NODE_ENV === 'production'
        ? {
            exclude: ['error', 'debug'],
          }
        : false,
  },
  swcMinify: true,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  poweredByHeader: false,
  images: {
    minimumCacheTTL: process.env.NODE_ENV === 'production' ? 60 : 0,
    formats: ['image/webp'],
    remotePatterns:
      process.env.ALLOWED_RESOURCES?.split(',').map((remote) => {
        return { hostname: remote };
      }) ?? [],
  },
});

export default nextConfig;
