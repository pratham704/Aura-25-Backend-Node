import mongoose from "mongoose";

const { Schema } = mongoose;

const studentSchema = new Schema({
    // The `_id` field is automatically created as the primary key in MongoDB
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other'],
        required: true
    },
    createdAt: { type: Date, default: Date.now },
    updatedAt: {
        type: Date,
        default: Date.now,
        index: true
    }
}, {
    timestamps: {
        createdAt: 'createdAt',
        updatedAt: 'updatedAt'
    }
});

const StudentModel = mongoose.model('Student', studentSchema);

export default StudentModel;