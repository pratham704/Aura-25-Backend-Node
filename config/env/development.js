export default {
    PORT: process.env.DEV_PORT || 4000,
    DB: {
        HOST: process.env.DEV_DB_HOST || 'default-development-host',
        USER: process.env.DEV_DB_USER || 'default-development-user',
        NAME: process.env.DEV_DB_NAME || 'default-development-db',
        PASSWORD: process.env.DEV_DB_PASS || 'default-development-password'
    }
};