/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // This is so any styled components keep their CSS when being passed on as children to other components
  compiler: {
    styledComponents: true,
  },
};

module.exports = nextConfig;
