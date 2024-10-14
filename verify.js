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
const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3MGNlMzM4MTFmYzRhYTA0ZTJiN2RkNCIsImVtYWlsIjoicHJhdGhhbS5zaWRkYW5uYXZhcjI4QGdtYWlsLmNvbSIsImlhdCI6MTcyODg5Nzg0OCwiZXhwIjoyMDQ0NDczODQ4fQ.3qAEYSK4YU0AV6NAXK1UTAfLG2A9svXS1dfbsgMlErE';
verifyToken(token);
