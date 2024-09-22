/** @type {import('next').NextConfig} */
const nextConfig = {
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ru"],
  },
  images:{
    remotePatterns:[
      {hostname:'staging-it-incubator.s3.eu-central-1.amazonaws.com',
      pathname:'/trainee-instagram-api/Image/**',
      protocol:'https'}
    ]
  },
  reactStrictMode: true
};

export default nextConfig;
