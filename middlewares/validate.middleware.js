import * as validator from "../validators/student.validator.js";
import {
    fail_response,
} from "../utils/responses/responses.js";

export const validateStudentCreation = (req, res, next) => {
    const student = req.body;

    const { error } = validator.studentSchemaValidator.validate(student);

    if (error) {
        return fail_response(res, 400, error.details[0].message);
    }

    next();
};

export const validateStudentLogin = (req, res, next) => {
    const student = req.body;

    const { error } = validator.studentLoginValidator.validate(student);
    if (error) {
        return fail_response(res, 400, error.details[0].message);
    }

    next();
};