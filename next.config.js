module.exports = {
  swcMinify: true,
  crossOrigin: 'anonymous',
  reactStrictMode: true,
  images: {
    domains: [
      'source.unsplash.com',
      'images.unsplash.com',
      'images.pexels.com',
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [{key: 'Access-Control-Allow-Origin', value: '*'}],
      },
    ];
  },
};
