import { config } from 'dotenv';

config();

const configuration = Object.freeze({
    port: process.env.PORT,
    env: process.env.NODE_ENV,
    serviceUrl: process.env.BASE_URL,
});
export default configuration;
