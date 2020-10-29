module.exports = {
  images: {
    domains: ['picsum.photos'],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    DEPLOYMENT_URL: process.env.DEPLOYMENT_URL,
    MONGODB_URI: process.env.MONGODB_URI,
  },
};
