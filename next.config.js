/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  // env: {
  //   BASE_URL: process.env.BASE_URL,
  // },
  images: {
    domains: ["lh3.googleusercontent.com", "firebasestorage.googleapis.com"],
  },
};

module.exports = nextConfig;
