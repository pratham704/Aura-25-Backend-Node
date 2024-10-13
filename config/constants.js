import { fileURLToPath } from "url";
import path from "path";
import dotenv from "dotenv";
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "../.env") });


const environment = process.env.NODE_ENV || "development";
const shortEnv = environment.slice(0, 3).toUpperCase();

const jwtSecretKey = {
    environment,
    jwtSecret: process.env[`JWT_SECRET_KEY_${shortEnv}`] || 'default_secret_key',
};


export default jwtSecretKey;