var mysql = require("mysql");
var connection = mysql.createConnection({
    host: "localhost",
    user: "webserver",
    password: "vya8bD?r%+4fQRYP>v",
    //port: "3306",
    database: "candidate_leek"
});
module.exports = connection;