import {
    success_response,
    fail_response,
} from "../../utils/responses/responses.js";

import User from "../../models/users.model.js";
import * as jwt from "../../utils/auth/jwt.utils.js"
import * as validator from "../../utils/validators/validator.js"


export const createStudent = async (req, res) => {
    const studentData = req.body;
    if (!studentData || typeof studentData !== 'object' || Object.keys(studentData).length === 0) return fail_response(res, 400, "Invalid student data");
    if (!validator.isValidEmail(studentData.email)) return fail_response(res, 400, "Ivalid email")
    // if (!validator.isValidFirebaseUID(studentData.firebaseUID)) return fail_response(res, 400, "Ivalid Firebase uuid")

    console.log(studentData)

    try {
        const existingStudent = await User.findOne({
            $or: [
                { email: studentData.email },
                { firebaseUID: studentData.firebaseUID }
            ]
        });

        if (existingStudent) return fail_response(res, 409, `User already exists`);
        
        const newStudent = new User(studentData);
        await newStudent.save();

        const token = jwt.generateToken({ id: newStudent._id, email: newStudent.email });
        success_response(res, 201, "successly registered", {
            "access_key": token
        });
    } catch (error) {
        console.error("Error creating student:", error);
        fail_response(res, 500, "Server error");
    }
};


export const loginStudent = async (req, res) => {
    const { email, firebaseUID  , name } = req.body;

    if(!email || !firebaseUID)  return fail_response(res, 400, "Invalid student data");
    if (!validator.isValidEmail(email)) return fail_response(res, 400, "Ivalid email")
     if (!validator.isValidFirebaseUID(firebaseUID)) return fail_response(res, 400, "Ivalid Firebase uuid")
    
    
    try {
        let student = await User.findOne({ email, firebaseUID });

        let statusCode = 200;  

        if (!student) {
            console.log("Student not found, creating a new student.");

            const newStudentData = {
                email,
                firebaseUID,
                profileDetails: {
                    name: name, 
                    college: "",
                    phoneNumber: "",
                    imageURL: "",
                },
                paymentStatus: false
            };

            student = new User(newStudentData);
            await student.save();

            console.log("New student created:", student);
            statusCode = 201; 
        }

        const token = jwt.generateToken({ id: student._id, email: student.email });

        success_response(res, statusCode, statusCode === 201 ? "Student created and logged in" : "Login successful", {
            "access_token": token
        });

    } catch (error) {
        console.error("Error during student login:", error.message);
        fail_response(res, 500, "Server error", error.message);
    }
};

