var http = require("./http-service.js");
var db = require("./connection.js");
var path = require("path");
var data = [];
var flattenedData = [];


http
  .get()
  .then(response => {    
    data = response.data.results;
    data = data.slice(0, 100);
    console.log(data.length);
    debugger;
    console.log(response.data.results);
    connectToSql();
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
      db.query("CREATE DATABASE IF NOT EXISTS test", function (err, result) {
        if (err) throw err;
        console.log(result);
      });
      var sql = "CREATE TABLE if not exists `movies` (`id` int(11) NOT NULL,`adult` varchar(10) DEFAULT NULL,`backdrop_path` varchar(100) DEFAULT NULL, `original_language` varchar(20) DEFAULT NULL,`original_title` varchar(100) DEFAULT NULL,`overview` text,`popularity` decimal(10,6) DEFAULT NULL,`poster_path` varchar(100) DEFAULT NULL, `release_date` datetime DEFAULT NULL, `title` varchar(100) DEFAULT NULL, `video` varchar(10) DEFAULT NULL, `vote_average` decimal(4,2) DEFAULT NULL, `vote_count` int(11) DEFAULT NULL, PRIMARY KEY (`id`))";
      db.query(sql, function (err, result) {
        if (err) throw err;
        else {
          console.log("table created");
          addToDb();
        }
      });
    }
  });
};
// need to figure out how to add genre_ids
function addToDb() {
  console.log("adding to db");
  for (var i = 0; i < data.length; i++) {
    flattenedData.push([data[i].id, data[i].adult, data[i].backdrop_path, data[i].original_language, data[i].original_title, data[i].overview, data[i].popularity, data[i].poster_path, data[i].release_date, data[i].title, data[i].video, data[i].vote_average, data[i].vote_count]);
    //console.log(flattenedData);
  }
  // insert into db
  db.query("INSERT INTO movies (id, adult, backdrop_path, original_language, original_title, overview, popularity, poster_path, release_date, title, video, vote_average, vote_count ) values ?", [flattenedData], function (err, result) {
    if (err) {
      throw err;
    }
    else {
      console.log(result);
    }
  });
};