import express from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import studentRoutes from './routes/student.routes.js';
import basicRoutes from './Api-Basic/routes/basic.routes.js';
import { connectDB, disconnectDB } from './config/database.js';
import cluster from 'cluster';
import os from 'os';

dotenv.config();

const numCPUs = os.cpus().length; // Get the number of CPU cores

const createServer = () => {
    const app = express();

    app.use(express.json());
    app.use(helmet());
    app.use(cors({
        origin: process.env.ALLOWED_ORIGINS || '*',
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"]
    }));

    const limiter = rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100
    });
    app.use(limiter);

    // Routes
    app.use("/api/v1/basic", basicRoutes);
    app.use("/api/v1/students", studentRoutes);

    app.get('/', (req, res) => {
        res.send('Welcome to the School CRUD API');
    });

    app.use((err, req, res, next) => {
        console.error(err.message);
        const statusCode = err.statusCode || 500;
        const message = err.message || "Internal Server Error";
        res.status(statusCode).json({ message });
    });

    return app;
};

if (cluster.isMaster) {
    // Fork workers.
    console.log(`Master ${process.pid} is running`);

    // Fork workers based on the number of CPU cores
    for (let i = 0; i < numCPUs; i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`Worker ${worker.process.pid} died`);
        // Optionally restart the worker
        cluster.fork();
    });

    // Handle shutdown signals
    const shutdown = async(signal) => {
        console.log(`${signal} signal received: closing HTTP server`);
        try {
            await disconnectDB();
            console.log("Database connection closed.");
            process.exit(0);
        } catch (error) {
            console.error("Error during shutdown:", error.message);
            process.exit(1);
        }
    };

    process.on("SIGINT", () => shutdown("SIGINT"));
    process.on("SIGTERM", () => shutdown("SIGTERM"));

} else {
    // Workers can share the same port
    const app = createServer();

    const port = process.env.NODE_ENV === 'production' ?
        process.env.PROD_PORT :
        process.env.NODE_ENV === 'test' ?
        process.env.TEST_PORT :
        process.env.DEV_PORT;

    app.listen(port, () => {
        console.log(`Worker ${process.pid} listening on port ${port}`);
    });

    connectDB().catch((error) => {
        console.error("Failed to connect to the database:", error.message);
        process.exit(1);
    });
}