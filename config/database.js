import mongoose from "mongoose";
import config from "../config/config.js";

const DB_URI = config.db.uri;

let isConnected = false;

export const connectDB = async() => {
    if (isConnected) {
        console.log("Already connected to MongoDB Atlas");
        return;
    }

    try {
        await mongoose.connect(DB_URI);
        isConnected = true;
        console.log("Connected to MongoDB Atlas using Mongoose");

        process.on("SIGINT", async() => {
            await disconnectDB();
        });

        mongoose.connection.on("disconnected", () => {
            console.log("MongoDB connection lost. Attempting to reconnect...");
            connectDB().catch(error => {
                console.error("Failed to reconnect to MongoDB Atlas:", error.message);
            });
        });

    } catch (error) {
        console.error("Error connecting to MongoDB Atlas:", error.message);
        throw error;
    }
};

export const disconnectDB = async() => {
    if (isConnected) {
        try {
            await mongoose.connection.close();
            isConnected = false;
            console.log("MongoDB connection closed");
        } catch (error) {
            console.error("Error closing MongoDB connection:", error.message);
        }
    }
};