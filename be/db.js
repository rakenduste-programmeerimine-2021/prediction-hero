const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "kasutaja",
    host: "localhost",
    port: 5432,
    database: "hero"
});

module.exports = pool;