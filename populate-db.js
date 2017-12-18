var http = require("./http-service.js");
var db = require("./connection.js");
var path = require("path");
var data = [];
var flattenedData = [];


http
  .get()
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error.message);
  });

  function connectToSql() {
    db.connect(function (err) {
        if (err)
            throw err
        else {
            console.log("Connected to MySQL");
            // db.query("CREATE DATABASE IF NOT EXISTS test", function (err, result) {
            //     if (err) throw err;
            //     console.log(result);
            // });
            // var sql = "CREATE TABLE IF NOT EXISTS `test` (symbol VARCHAR(65), price DECIMAL(65), size DECIMAL(65), time DECIMAL(65))";
            // db.query(sql, function (err, result) {
            //     if (err) throw err;
            //     console.log("table created");
            //     addToDb();
            // });
        }
    });
};

connectToSql();