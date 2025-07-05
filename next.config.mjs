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
}

export default nextConfig
