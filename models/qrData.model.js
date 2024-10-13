// models/qrData.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const qrDataSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  qrUrl: { type: String, required: true },
  code: { type: String, required: true }  // Typically userId itself
}, { timestamps: true });

const QrData = mongoose.model('QrData', qrDataSchema);
export default QrData;
