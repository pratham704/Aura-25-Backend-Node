// models/qrData.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const schema = new Schema({
  numberofppl: { type: Number, required: true },
  dynamiccode: { type: String}   , 
  qrCode: { type: String}   , 
  entered : {type : Number , default : 0},

}, { timestamps: true });

const DynamicQr = mongoose.model('dynamicQr', schema);
export default DynamicQr;
