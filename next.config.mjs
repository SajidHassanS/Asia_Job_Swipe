import withTM from 'next-transpile-modules';

export default withTM({
  transpileModules: ['engine.io-parser', 'socket.io-client'],
  images: {
    domains: ['localhost', 'ajs-files.hostdonor.com', 'example.com'],
  },
});
