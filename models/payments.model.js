// models/payments.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const paymentSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  amount: { type: Number, required: true },
  paymentMethod: { type: String, required: true },  // e.g., 'Credit Card', 'PayPal'
  status: { type: String, enum: ['Pending', 'Completed', 'Failed'], required: true }
}, { timestamps: true });

const Payment = mongoose.model('Payment', paymentSchema);
export default Payment;
