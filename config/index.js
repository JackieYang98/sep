'use strict';
const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
const EMAIL_NAME = process.env.EMAIL_NAME;
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD;
const DATABASE = {
    username: "external",
    // refer to messenger for password
    password: DATABASE_PASSWORD,
    database: "sep",
    host: "45.63.28.92",
    port: 3306,
    dialect: "mysql",
    operatorsAliases: false,
}

const EMAIL = {
    "auth": {
        // put your email username here 
        "user": EMAIL_NAME,
        // put your email password here
        "pass": EMAIL_PASSWORD,
    },
    // this is predefined for office365 emails 
    "host": "smtp.gmail.com",
    "port": "587",
    "tls": "true",
};

const DEV_PORT = process.env.PORT || 8080;

module.exports = {
    DATABASE: DATABASE,
    DEV_PORT: DEV_PORT,
    EMAIL: EMAIL,
}