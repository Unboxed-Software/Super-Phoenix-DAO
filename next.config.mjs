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
          }
      ];
    },
  };
  
  export default nextConfig;