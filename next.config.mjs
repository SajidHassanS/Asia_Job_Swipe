// next.config.mjs
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'ajs-files.hostdonor.com','example.com'], 
  },
};
          
export default nextConfig;



// // next.config.mjs
// import withTM from 'next-transpile-modules';
// import { createRequire } from 'module';

// const require = createRequire(import.meta.url);

// const nextConfig = {
//   webpack: (config) => {
//     config.resolve.alias = {
//       ...config.resolve.alias,
//       'engine.io-client': require.resolve('engine.io-client'),
//       'engine.io-parser': require.resolve('engine.io-parser'),
//     };
//     return config;
//   },
// };

// export default withTM(['engine.io-client', 'engine.io-parser', 'socket.io-client'])(nextConfig);
