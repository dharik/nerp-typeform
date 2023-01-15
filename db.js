const pgPromise = require("pg-promise")({});

const db = pgPromise("postgresql://postgres:postgres@localhost/postgres");

module.exports = db;
