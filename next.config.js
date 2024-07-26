
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-eval' https://www.googletagmanager.com; img-src 'self' data: https:; connect-src 'self' https://www.google-analytics.com;",
          },
        ],
      },
    ];
  },
}

module.exports = nextConfig
    