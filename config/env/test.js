export default {
    PORT: process.env.TEST_PORT || 3001,
    DB: {
        HOST: process.env.TEST_DB_HOST || 'default-test-host',
        USER: process.env.TEST_DB_USER || 'default-test-user',
        NAME: process.env.TEST_DB_NAME || 'default-test-db',
        PASSWORD: process.env.TEST_DB_PASS || 'default-test-password'
    }
};