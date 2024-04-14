/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/landing",
        permanent: true,
      },
      {
        source: "/placeholder",
        destination: "/landing",
        permanent: true,
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "shdw-drive.genesysgo.net",
      },
      {
        protocol: "https",
        hostname: "fakeimg.pl",
      },
    ],
  },
};

export default nextConfig;
