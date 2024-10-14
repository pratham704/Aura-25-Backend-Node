// models/entryExit.model.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const entryExitSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  currentStatus: { type: Boolean, required: true },
  code: { type: Number, default: 0  },
  frequencyEntry: { type: Number, default: 0 },
  frequencyExit: { type: Number, default: 0 }, 
  mainGate : {type : Boolean , default : false},
  mainGateFreq : {type : Number , default : 0},

}, { timestamps: true });

const EntryExit = mongoose.model('EntryExit', entryExitSchema);
export default EntryExit;
