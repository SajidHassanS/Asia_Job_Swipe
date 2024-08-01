// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'ajs-files.hostdonor.com', 'example.com'], 
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'engine.io-parser': false, // If the package is not needed or causing issues
    };
    return config;
  },
};

export default nextConfig;
