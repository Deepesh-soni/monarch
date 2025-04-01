/** @type {import('next').NextConfig} */

const runtimeCaching = require("next-pwa/cache");

const withPWA = require("next-pwa")({
  disable: process.env.NEXT_PUBLIC_ENV === "development" ? false : false,
  dest: "public",
  register: true,
  skipWaiting: true,
  runtimeCaching,
});

module.exports = withPWA({
  reactStrictMode: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
});
