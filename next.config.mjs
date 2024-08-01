// next.config.mjs
import withTM from 'next-transpile-modules';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'ajs-files.hostdonor.com', 'example.com'],
  },
};

export default withTM(['engine.io-parser', 'socket.io-client'])(nextConfig);
