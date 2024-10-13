// models/users.js
import mongoose from 'mongoose';

const { Schema } = mongoose;
const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  firebaseUID: { type: String, required: true, unique: true }, 
  profileDetails: {
    name: { type: String},
    college: { type: String },
    phoneNumber: { type: String },
    imageURL: { type: String },
    collegeID: { type: String },     
    collegeIdUrl: { type: String }   
  },
  paymentStatus: { type: Boolean, default: false } 
}, { timestamps: true });


const User = mongoose.model('User', userSchema);
export default User;
