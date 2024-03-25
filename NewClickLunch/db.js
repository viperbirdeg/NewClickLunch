const { Client } = require('pg');

const client = new Client({
    user: "fl0user",
    host: "ep-proud-band-a5lbhg0g.us-east-2.aws.neon.fl0.io",
    database: "enfermeras-kawaii-db",
    password: "",
    port: 5432,
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = client;
