/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
      return [
        {
          source: "/",
          destination: "/coming-soon",
          permanent: false,
        }
      ];
    },
  };
  
  export default nextConfig;