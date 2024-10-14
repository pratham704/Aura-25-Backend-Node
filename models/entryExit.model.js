// models/entryExit.model.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const entryExitSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  currentStatus: { type: Boolean, required: true },
  code: { type: String, required: true },
  frequencyEntry: { type: Number, default: 0 },
  frequencyExit: { type: Number, default: 0 }
}, { timestamps: true });

const EntryExit = mongoose.model('EntryExit', entryExitSchema);
export default EntryExit;
