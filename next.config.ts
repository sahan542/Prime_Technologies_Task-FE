// import type { NextConfig } from "next";

// const nextConfig: NextConfig = {
//   images: {
//     domains: ['res.cloudinary.com'],  
//   },
//   reactStrictMode: true,  
// };

// export default nextConfig;

import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Config for Image Optimization, allowing only Cloudinary images.
  images: {
    domains: ['res.cloudinary.com'],  
  },
  
  // React strict mode for development to help identify potential issues.
  reactStrictMode: true,

  // ESLint configuration to ignore lint errors during production builds
  eslint: {
    ignoreDuringBuilds: true,  // Ignores ESLint errors in production builds.
  },

  // Optional: TypeScript configuration to ignore type errors during the build process
  typescript: {
    ignoreBuildErrors: true, // Ignores TypeScript type errors during the production build
  },

  // Optional: Add further configurations for optimizing builds (e.g., future webpack optimizations)
  future: {
    webpack5: true,  // Ensures using Webpack 5 for bundling
  },
};

export default nextConfig;

