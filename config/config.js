import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });

const environment = process.env.NODE_ENV || "development";


const config = {
    development: {
        port: process.env.DEV_PORT || 4000,
        db: {
            uri: process.env.DEV_MONGO_URI, // MongoDB URI for development
        },
    },
    production: {
        port: process.env.PROD_PORT || 80,
        db: {
            uri: process.env.PROD_MONGO_URI, // MongoDB URI for production
        },
    },
    test: {
        port: process.env.TEST_PORT || 3001,
        db: {
            uri: process.env.TEST_MONGO_URI, // MongoDB URI for testing
        },
    },
};



export default config[environment];