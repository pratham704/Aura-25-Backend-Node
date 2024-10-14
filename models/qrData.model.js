// models/qrData.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const qrDataSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  qrUrl: { type: String },
  vip: { type: Boolean, default: false }, // Changed to Boolean with default value false
  code: { type: String, required: true }  // Typically userId itself
}, { timestamps: true });

const QrData = mongoose.model('QrData', qrDataSchema);
export default QrData;
