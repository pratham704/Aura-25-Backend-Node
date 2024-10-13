import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';

const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);

// Function to try loading .env from different levels upto 4 levels 
const loadEnv = () => {
    let envPath;
    for (let i = 0; i <= 4; i++) {
        envPath = path.join(__dirname, ...Array(i).fill('..'), '.env');
        const result = dotenv.config({ path: envPath });
        if (!result.error) {
            console.log(`Loaded .env from ${envPath}`);
            return;
        }
    }
    console.warn('No .env file found');
};

loadEnv();

const environment = process.env.NODE_ENV || 'development';