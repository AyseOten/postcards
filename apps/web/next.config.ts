import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Workspace packages ship TypeScript source; Next.js compiles them.
  transpilePackages: ['@postcards/core', '@postcards/data', '@postcards/i18n', '@postcards/tokens'],
};

export default nextConfig;
