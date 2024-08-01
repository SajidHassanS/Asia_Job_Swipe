// next.config.mjs
import engineIoParser from 'engine.io-parser';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'ajs-files.hostdonor.com', 'example.com'], 
  },
  webpack: (config) => {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      'engine.io-parser': engineIoParser,
    };
    return config;
  },
};

export default nextConfig;