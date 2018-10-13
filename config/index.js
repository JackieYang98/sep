'use strict';

const DATABASE = {
    username: "external",
    password: "",
    database: "sep",
    host: "45.63.28.92",
    port: 3306,
    dialect: "mysql",
    operatorsAliases: false,
}

const DEV_PORT = process.env.PORT || 8080;

module.exports = {
    DATABASE: DATABASE,
    DEV_PORT: DEV_PORT,
}