/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  // Vercel-specific optimizations
  serverExternalPackages: ['mongoose'],
  // Handle large file uploads
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },
  // Ensure test files are included in the build
  webpack: (config) => {
    config.module.rules.push({
      test: /\.pdf$/,
      type: 'asset/resource',
    });
    return config;
  },
}

export default nextConfig
