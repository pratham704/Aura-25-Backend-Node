import StudentModel from "../../models/student.model.js";
import * as pass from "../../utils/auth/bcrypt.password.js";
import * as jwtFunction from "../../utils/auth/jwt.utils.js";
import { mongooseErrorMap } from "../../utils/responses/mongooseErrorMap.js";

export const createStudentService = async(studentData) => {
    try {
        const { firstName, lastName, email, dateOfBirth, gender, password } =
        studentData;
        const hashedPassword = await pass.encryptPassword(password);

        const student = new StudentModel({
            firstName,
            lastName,
            email,
            dateOfBirth,
            gender,
            password: hashedPassword,
        });

        const savedStudent = await student.save();


        const token = jwtFunction.generateToken({
            id: savedStudent._id,
            email: savedStudent.email,
            firstName: savedStudent.firstName,
        });

        const response = {
            id: savedStudent._id,
            firstName: savedStudent.firstName,
            lastName: savedStudent.lastName,
            email: savedStudent.email,
            token,
        };

        return { status_code: 201, obj: response };
    } catch (error) {
        console.log(error, "From auth.service.student.js ");
        if (!error.error_status_code && !error.error_message) {
            if (mongooseErrorMap[error.code]) {
                const { status, message } = mongooseErrorMap[error.code];
                error.error_status_code = status;
                error.error_message = message;
            } else {
                error.error_status_code = 500;
                error.error_message = "Something went wrong.";
            }
        }

        throw error;
    }
};

export const loginStudentService = async(loginInfo) => {
    const { email, password } = loginInfo;
    try {
        const student = await StudentModel.findOne({ email });

        if (!student) {
            const error = new Error("No student found with this email.");
            error.error_status_code = 404;
            error.error_message = "Student not found";
            throw error;
        }

        // Verify the password
        const isPasswordValid = await pass.isPasswordCorrect(
            password,
            student.password
        );

        if (!isPasswordValid) {
            const error = new Error("Invalid password.");
            error.error_status_code = 401;
            error.error_message = "Invalid password";
            throw error;
        }

        const token = jwtFunction.generateToken({
            id: student._id,
            email: student.email,
            firstName: student.firstName,
        });

        const response = {
            id: student._id,
            firstName: student.firstName,
            lastName: student.lastName,
            email: student.email,
            token,
        };

        return { status_code: 200, obj: response };
    } catch (error) {
        console.log(error, "From auth.service.student.js ");
        if (!error.error_status_code && !error.error_message) {
            if (mongooseErrorMap[error.code]) {
                const { status, message } = mongooseErrorMap[error.code];
                error.error_status_code = status;
                error.error_message = message;
            } else {
                error.error_status_code = 500;
                error.error_message = "Something went wrong.";
            }
        }

        throw error;
    }
};