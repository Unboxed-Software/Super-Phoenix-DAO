/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: "/",
        destination: "/coming-soon",
        permanent: false,
      },
      {
        source: "/placeholder",
        destination: "/coming-soon",
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
