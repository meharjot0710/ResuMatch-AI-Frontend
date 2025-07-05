import CopyWebpackPlugin from 'copy-webpack-plugin';

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
    
    // Copy the test PDF file to the build output
    config.plugins.push(
      new CopyWebpackPlugin({
        patterns: [
          {
            from: 'public/05-versions-space.pdf',
            to: '05-versions-space.pdf',
          },
        ],
      })
    );
    
    return config;
  },
}

export default nextConfig
