import jwt from 'jsonwebtoken';

const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, "django-insecure-2d1#vd+=ig6)vj8wxsqp@6w$(6xi-)ja2y-%b&cd%0swj41(gt");
        console.log('Token successfully verified:', decoded); // Log the decoded token
        return decoded;
    } catch (error) {
        console.error('Invalid or expired token:', error.message); // Log the error message
        throw new Error('Invalid or expired token');
    }
};

// Example usage
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI5NDg5MzYzLCJpYXQiOjE3Mjg4ODQ1NjMsImp0aSI6Ijc1MTNlOTlkYjg1ZTQ3MDBhOTZjOGFjNmFhZWM5YWE2IiwiZW1haWwiOiJwcm9qZWN0aW52aXRhdGlvbjI0QGdtYWlsLmNvbSIsInVzZXJfaWQiOiI2NzBjYWY1MzI0MWQ1MGI3YWQ4NDg0N2QifQ.KJbtUuxzbiKGIWjNXl4MNvDn5w2Jw5QVf_xDJ_0ruIU';
verifyToken(token);
