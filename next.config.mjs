/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: "/",
          destination: "/placeholder",
          permanent: true,
        },
      ];
    },
  };
  
  export default nextConfig;