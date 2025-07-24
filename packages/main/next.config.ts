import type { NextConfig } from 'next';
const isDev = process.env.NODE_ENV === 'development';

const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  basePath: isDev ? '' : '/miniature-carnival',
};

export default nextConfig;
