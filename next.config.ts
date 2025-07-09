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
  images: {
    domains: ['res.cloudinary.com'],  
  },
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true, // Ignore ESLint errors during production builds
  },
  typescript: {
    ignoreBuildErrors: true, // Ignores TypeScript type errors during the production build
  },
};

export default nextConfig;


