const dotenv = require('dotenv');

dotenv.config();

module.exports = {
  env: {
    DEPLOYMENT_URL: process.env.DEPLOYMENT_URL,
    MONGODB_URI: process.env.MONGODB_URI,
  },
};
