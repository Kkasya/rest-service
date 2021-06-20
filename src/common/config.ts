import dotenv = require('dotenv');
import path = require('path');

dotenv.config({
  path: path.join(__dirname, '../../.env')
});

const config = {
  PORT: process.env,
  NODE_ENV: process.env,
  MONGO_CONNECTION_STRING: process.env,
  JWT_SECRET_KEY: process.env,
  AUTH_MODE: process.env
};

export {config};
