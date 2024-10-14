import mongoose from "mongoose";
import DynamicQr from "./models/dynamicqr.model.js";
import { encrypt } from "./utils/payment/encrypt.util.js"; // Ensure this function is implemented correctly

async function connectAndProcess() {
    try {
        // Connect to MongoDB
        await mongoose.connect('mongodb+srv://nshriram1326:vxdQ7yYDz74A9TMR@cluster0.usl45.mongodb.net/checkmate?retryWrites=true&w=majority', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        // Create a new DynamicQr document
        const newQrData = new DynamicQr({
            numberofppl: 8,
        });

        // Save the document to the database
        const savedData = await newQrData.save();

        // Encrypt the ID of the saved document
        const encryptedId = encrypt(savedData._id.toString()); // Ensure _id is a string
        console.log("Encrypted ID:", encryptedId);

        // Update the document with the encrypted ID
        savedData.dynamiccode = encryptedId; 
        await savedData.save();  

        // Log the updated document
        console.log("Updated Data with Encrypted ID:", savedData);

    } catch (error) {
        console.error("Error:", error);
    } finally {
        // Close the connection
        mongoose.connection.close(); 
    }
}

connectAndProcess();
