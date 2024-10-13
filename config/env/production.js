export default {
    PORT: process.env.PROD_PORT || 80,
    DB: {
        HOST: process.env.PROD_DB_HOST || 'default-production-host',
        USER: process.env.PROD_DB_USER || 'default-production-user',
        NAME: process.env.PROD_DB_NAME || 'default-production-db',
        PASSWORD: process.env.PROD_DB_PASS || 'default-production-password'
    }
};