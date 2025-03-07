/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: 'http://127.0.0.1:30009',
  },
  output: 'standalone',
};

export default nextConfig;
