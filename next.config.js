module.exports = {
  typescript: {
    ignoreBuildErrors: true,
  },
  env: {
    DEPLOYMENT_URL: process.env.DEPLOYMENT_URL,
    MONGODB_URI: process.env.MONGODB_URI,
  },
  resolutions: {
    webpack: '^5.0.0-beta.22',
  },
};
