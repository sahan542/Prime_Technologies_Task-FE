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
    ignoreDuringBuilds: true, // This will ignore ESLint errors during production builds
  },
};

export default nextConfig;
