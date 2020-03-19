const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  env: {
    DEPLOYMENT_URL: process.env.DEPLOYMENT_URL,
    MONGODB_URI: process.env.MONGODB_URI,
  },

  webpack(config) {
    config.resolve.alias = {
      ...config.resolve.alias,
      '@self': path.resolve(__dirname),
    };

    return config;
  },
};
