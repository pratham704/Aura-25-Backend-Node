import mongoose from "mongoose";
import Payment from "./models/payments.model.js";

// Connect to the MongoDB database
await mongoose.connect('mongodb+srv://nshriram1326:vxdQ7yYDz74A9TMR@cluster0.usl45.mongodb.net/checkmate?retryWrites=true&w=majority');

try {
  // Delete all documents from the Payment collection
  const result = await Payment.deleteMany({});
  console.log(`Deleted ${result.deletedCount} documents from the Payment collection`);

} catch (error) {
  console.error('Error deleting data:', error);
} finally {
  // Close the connection to the database
  mongoose.connection.close();
}
