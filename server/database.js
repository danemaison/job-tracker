const mysql = require('mysql');
const db = mysql.createConnection(process.env.CLEARDB_DATABASE_URL);
module.exports = db;
