const mysql = require('mysql');

// const db =  mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: "",
//     database:"projet7"
//   });

const db =  mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database:"groupomania"
  });

module.exports = db