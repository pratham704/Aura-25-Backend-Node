import jwt from 'jsonwebtoken';
import jwtSecretKey from '../../config/constants.js';

export const generateToken = (payload) => {
    return jwt.sign(payload, jwtSecretKey.jwtSecret, { expiresIn: '10y' });
};


export const verifyToken = (token) => {
    try {
        return jwt.verify(token, jwtSecretKey.jwtSecret);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

export const decodeToken = (token) => {
    try {
        return jwt.decode(token);
    } catch (error) {
        throw new Error('Failed to decode token');
    }
};



export const getData = (req) => {
    try {

        const authHeader = req.headers.authorization;
        const token = authHeader.split('Bearer ')[1];
        return jwt.decode(token);
    } catch (error) {
        throw new Error('Failed to decode token');
    }
};



