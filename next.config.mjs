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
  // Webpack configuration to handle PDF.js and avoid canvas issues
  webpack: (config, { isServer }) => {
    if (isServer) {
      // Handle canvas module for server-side
      config.externals = config.externals || [];
      config.externals.push({
        canvas: 'canvas',
      });
    }
    
    // Handle PDF.js modules
    config.resolve.fallback = {
      ...config.resolve.fallback,
      canvas: false,
      fs: false,
      path: false,
    };
    
    return config;
  },
}

export default nextConfig
