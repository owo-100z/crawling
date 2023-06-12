const maria = require('mysql');

const conn = maria.createConnection({
    host: process.env.DB_HOST
    , port: process.env.DB_PORT
    , user: process.env.DB_USERNAME
    , password: process.env.DB_PASS
    , database: process.env.DB_NAME
});

module.exports = conn;