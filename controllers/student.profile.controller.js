import {
    success_response,
    fail_response,
} from "../utils/responses/responses.js";
import User from "../models/users.model.js";
import * as jwt from "../utils/auth/jwt.utils.js"

const getStudentProfile = async (req, res) => {
    try {
        const { id, email } = jwt.getData(req);
        const data = await User.findOne({
            _id: id
        })
        success_response(res, 200, "success", data)
    } catch (error) {
        fail_response(res, 500, "failed")
    }

}



const getProfileChecker = async (req, res) => {
    try {
        const { id } = jwt.getData(req);
        const data = await User.findOne({ _id: id });


        if (!data) return fail_response(res, 404, "User not found");


        const requiredFields = {
            email: data.email,
            firebaseUID: data.firebaseUID,
            profileDetails: {
                name: data.profileDetails.name,
                college: data.profileDetails.college,
                phoneNumber: data.profileDetails.phoneNumber,
                imageURL: data.profileDetails.imageURL,
                collegeID: data.profileDetails.collegeID,
                collegeIdUrl: data.profileDetails.collegeIdUrl,
            },
            paymentStatus: data.paymentStatus
        };

        const missingFields = [];
        if (!requiredFields.email) missingFields.push('email');
        if (!requiredFields.firebaseUID) missingFields.push('firebaseUID');
        if (!requiredFields.paymentStatus && requiredFields.paymentStatus !== false) {
            missingFields.push('paymentStatus');
        }
        for (const field in requiredFields.profileDetails) {
            if (!requiredFields.profileDetails[field]) {
                missingFields.push(field);
            }
        }


        success_response(res, 200, "Success", {
            "missing": missingFields,
            "paymentStatus": data.paymentStatus

        },

        );
    } catch (error) {
        console.error("Error fetching profile:", error);
        fail_response(res, 500, "Internal server error");
    }
};



const getAllStudents = async (req, res) => {
    try {
        const students = await User.find();
        success_response(res, 200, "success", students);
    } catch (error) {
        fail_response(res, 500, "success");
    }
};




export { getAllStudents, getStudentProfile, getProfileChecker }

