/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // images: {
  //   remotePatterns: [
  //     {
  //       protocol: 'https',
  //       hostname: 'rickandmortyapi.com',
  //       pathname: '/api/character/avatar/**'
  //     }
  //   ]
  // },
  i18n: {
    locales: ['en', 'ru'],
    defaultLocale: 'ru',
    domains: [
        {
          domain: 'pictures-of-life.online',
          defaultLocale: 'en'
        }
    ]},
};

export default nextConfig;
