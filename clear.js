import mongoose from "mongoose";
import User from "./models/users.model.js";
import Payment from "./models/payments.model.js";

// Connect to MongoDB
mongoose.connect('mongodb+srv://nshriram1326:vxdQ7yYDz74A9TMR@cluster0.usl45.mongodb.net/checkmate?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log("Connected to MongoDB"))
.catch(err => console.log("Failed to connect to MongoDB", err));

async function clearDatabase() {
  try {
    // Delete all documents from the User and Payment collections
    await User.deleteMany({});
    await Payment.deleteMany({});

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
