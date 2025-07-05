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
  experimental: {
    serverComponentsExternalPackages: ['mongoose'],
  },
  // Handle large file uploads
  api: {
    bodyParser: {
      sizeLimit: '10mb',
    },
  },
}

export default nextConfig
