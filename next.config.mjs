// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'ajs-files.hostdonor.com', 'example.com'], 
  },
  webpack: (config) => {
    // Add fallback for engine.io-parser if needed
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'engine.io-parser': require.resolve('engine.io-parser'),
    };
    return config;
  },
};

export default nextConfig;