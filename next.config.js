module.exports = {
  reactStrictMode: true,
  defaultLocale: 'en-US',
  images: {
    domains: ['source.unsplash.com', 'images.pexels.com'],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [{key: 'Access-Control-Allow-Origin', value: '*'}],
      },
    ];
  },
  async rewrites() {
    return {
      afterFiles: [{source: '/:path*', destination: '/_404/:path*'}],
    };
  },
  webpack: config => {
    config.experiments = config.experiments || {};
    config.experiments.topLevelAwait = true;
    return config;
  },
};
