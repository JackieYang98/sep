'use strict';

const DATABASE = {
    username: "external",
    // refer to messenger for password
    password: "",
    database: "sep",
    host: "45.63.28.92",
    port: 3306,
    dialect: "mysql",
    operatorsAliases: false,
}

const EMAIL = {
    "auth": {
        // put your email username here 
        "user": "",
        // put your email password here
        "pass": "",
    },
    // this is predefined for office365 emails 
    "host": "smtp.office365.com",
    "port": "587",
    "tls": "true",
};

const DEV_PORT = process.env.PORT || 8080;

module.exports = {
    DATABASE: DATABASE,
    DEV_PORT: DEV_PORT,
    EMAIL: EMAIL,
}