const mysql = require('mysql');

const DB =  mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
})

DB.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
  const sql = 'CREATE DATABASE IF NOT EXISTS groupomania'
  DB.query(sql, (error, result) => {
    if (err) throw err
    
    const Db =  mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "",
      database:"groupomania"
    });
    Db.connect((error) => {
      if (err) throw err;

      const tableUser = "CREATE TABLE IF NOT EXISTS user (id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT, userName VARCHAR(50) NOT NULL, email VARCHAR(100) NOT NULL, password VARCHAR(100) NOT NULL, admin VARCHAR(5) NOT NULL DEFAULT 'false', PRIMARY KEY (id)) ENGINE = InnoDB"
      Db.query(tableUser, (error, result) => {
        if (err) throw err
        console.log('table Create')
      })
      
      const tablePost = 'CREATE TABLE IF NOT EXISTS post (id SMALLINT UNSIGNED NOT NULL AUTO_INCREMENT, userId SMALLINT NOT NULL, userName VARCHAR(50) NOT NULL, titrePost TEXT NOT NULL, post TEXT NOT NULL, commentaire JSON NOT NULL, date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (id)) ENGINE = InnoDB'
      Db.query(tablePost, (error, result) => {
        if (err) throw err
        console.log('table Create')
      })
    })

  })
});

module.exports = DB