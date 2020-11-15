const mysql = require('mysql');

const db =  mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"projet7"
  });

module.exports = db