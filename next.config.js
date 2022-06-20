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
};
