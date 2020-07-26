const pgp = require('pg-promise')();
const connection = {
    host: 'localhost',
    port: 5432,
    database: 'db_donor_darah',
    user: 'postgres',
    password: 'root',
    max: 10000 // use up to 30 connections
};
const db = pgp(connection);

module.exports = db;