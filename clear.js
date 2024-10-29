import mongoose from "mongoose";
import Payment from "./models/payments.model.js";
import QrData from "./models/qrData.model.js";
import EntryExit from "./models/entryExit.model.js";
import User from "./models/users.model.js";
import dotenv from 'dotenv'
import DynamicQr from "./models/dynamicqr.model.js";
import StudentModel from "./models/student.model.js";


dotenv.config()

// Connect to MongoDB
const conn = await mongoose.connect('')

async function clearDatabase() {
  try {
    await Payment.deleteMany({});
    await QrData.deleteMany({});
    await EntryExit.deleteMany({});
    await User.deleteMany({});
    await DynamicQr.deleteMany({});
    await StudentModel.deleteMany({});

    console.log("All User and Payment documents have been deleted.");
  } catch (error) {
    console.error("Error while deleting documents:", error);
  } finally {
    // Close the MongoDB connection
    mongoose.connection.close();
  }
}

// Call the function to clear the database
clearDatabase();
