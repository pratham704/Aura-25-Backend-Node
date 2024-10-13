// services/student.service.js
import StudentModel from "../models/student.model.js";
export const getAllStudents = async() => {
    try {
        const students = await StudentModel.find().exec();
        return students;
    } catch (error) {
        throw new Error("Failed to fetch students: " + error.message);
    }
};

export const getStudentById = async(id) => {
    try {
        const student = await StudentModel.findById(id).exec();
        if (!student) {
            throw new Error("Student not found");
        }
        return student;
    } catch (error) {
        throw new Error("Failed to fetch student: " + error.message);
    }
};

export const updateStudent = async(id, studentData) => {
    try {
        const { firstName, lastName, email, dateOfBirth, gender } = studentData;
        const result = await StudentModel.findByIdAndUpdate(id, {
            firstName,
            lastName,
            email,
            dateOfBirth,
            gender,
            updatedAt: Date.now()
        }, { new: true }).exec();

        if (!result) {
            throw new Error("Student not found");
        }

        return result;
    } catch (error) {
        throw new Error("Failed to update student: " + error.message);
    }
};

export const deleteStudent = async(id) => {
    try {
        const result = await StudentModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new Error("Student not found");
        }
        return true;
    } catch (error) {
        throw new Error("Failed to delete student: " + error.message);
    }
};