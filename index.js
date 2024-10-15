import express from "express";
import dotenv from "dotenv";
import helmet from "helmet";
import cors from "cors";
import rateLimit from "express-rate-limit";
import studentRoutes from "./routes/student.routes.js";
import adminRoutes from "./routes/admin.routes.js"
import payment from "./routes/payment.routes.js"
import { connectDB, disconnectDB } from "./config/database.js";
import morgan from "morgan";
import { authenticate } from "./middlewares/auth.middleware.js";
import qr from "./routes/qr.routes.js"
dotenv.config();
import path from 'path';

import { fileURLToPath } from 'url';
const __filename = fileURLToPath(
    import.meta.url);
const __dirname = path.dirname(__filename);


const app = express();
app.use(morgan('dev'))
app.use(express.json());
app.use(helmet());
// app.use(cors({ origin: process.env.ALLOWED_ORIGINS || '*'}));
app.use(cors());

// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, 
//     max: 100
// });
// app.use(limiter);

app.use((err, req, res, next) => {
    console.error(err.message);
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
    res.status(statusCode).json({ message });
});


const rootDirectory = path.resolve(__dirname, './build');
app.use(express.static(rootDirectory));

app.get('*', (req, res) => {
    res.sendFile(path.resolve(rootDirectory, 'index.html'));
});




// Routes
app.use("/api/entrysystem", studentRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payment",authenticate,  payment);
app.use("/api/qr",  qr);






// starting the server 
const port = process.env.NODE_ENV === 'production' ?
    process.env.PROD_PORT :
    process.env.NODE_ENV === 'test' ?
    process.env.TEST_PORT :
    process.env.DEV_PORT;


const startServer = async () => {
    try {
        await connectDB();
        app.listen(port, () => {
            console.log(`Server is running in ${process.env.NODE_ENV} mode on port ${port}`);
        });
    } catch (error) {
        console.error("Failed to start server:", error.message);
        process.exit(1);
    }
};

['SIGINT', 'SIGTERM'].forEach(signal => {
    process.on(signal, async () => {
        console.log(`${signal} signal received: closing HTTP server`);
        await disconnectDB();
        process.exit(0);
    });
});


startServer()






