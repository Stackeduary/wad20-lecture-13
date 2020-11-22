const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "user",
    password: "password",
    database: "lecture13"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

module.exports = connection;