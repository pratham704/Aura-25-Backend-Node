import { statusMessages } from "./status.messages.js";
/**
 * @param {Object} res - Express response object.
 * @param {number} [statusCode=200] - HTTP status code.
 * @param {Object} [data=null] - Optional data to send in the response.
 * @param {string} [message] - Optional message (default based on status code).
 */
export const success_response = (res, statusCode = 200, message , data) => {
    res.status(statusCode).json({
        success: true,
        message: message || statusMessages[statusCode] || 'Success',
        data
    });
};

/**
 * @param {Object} res - Express response object.
 * @param {boolean} isSuccess - Whether the response is successful.
 * @param {number} statusCode - HTTP status code.
 * @param {Object} [data=null] - Optional data to send in the response (for success).
 * @param {string} [message] - Optional message (default based on status code).
 */
export const sendResponse = (res, isSuccess, statusCode, data = null, message = null) => {
    if (isSuccess) {
        success_response(res, statusCode, data, message);
    } else {
        errorResponse(res, statusCode, message);
    }
};

/**
 * @param {Object} res - Express response object.
 * @param {number} statusCode - HTTP status code.
 * @param {string} [message] - Optional error message (default based on status code).
 */
export const fail_response = (res, statusCode, message) => {
    res.status(statusCode).json({
        success: false,
        message: message || statusMessages[statusCode] || 'An error occurred'
    });
};