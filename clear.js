import mongoose from "mongoose";
import Payment from "./models/payments.model.js";
import QrData from "./models/qrData.model.js";
import EntryExit from "./models/entryExit.model.js";

// Connect to MongoDB
mongoose.connect(process.env.TEST_MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("Failed to connect to MongoDB", err));

async function clearDatabase() {
  try {
    await Payment.deleteMany({});
    await QrData.deleteMany({});
    await EntryExit.deleteMany({});

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
