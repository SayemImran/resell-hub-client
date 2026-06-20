/** @type {import('next').NextConfig} */
const nextConfig = {
  reactCompiler: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // <--- This allows ANY secure domain
      },
      {
        protocol: "http",
        hostname: "**", // <--- Optional: This allows ANY unsecure domain
      },
    ],
  },
};

export default nextConfig;
