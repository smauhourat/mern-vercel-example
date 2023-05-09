const path = require('path');
const dotenv = require('dotenv');
const env_file = process.env.NODE_ENV !== undefined ? `.env.${process.env.NODE_ENV.trim()}` : '.env';
dotenv.config({ path: path.resolve(__dirname, env_file) })
const env = process.env;

const environment = {
    mongoUri: env.MONGO_URI
}

module.exports = environment;
