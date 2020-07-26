const dotenv = require('dotenv');
const pgp = require('pg-promise')();

dotenv.config();

const connection = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    database: process.env.DB_DATABASE,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    max: process.env.DB_MAX
};
const db = pgp(connection);

module.exports = db;