var http = require("../config/http-service.js");
var db = require("../config/connection.js");
var path = require("path");
var data = [];
var flattenedData = [];
var Gather = {
  getAllMovies: function (callback) {
    http
      .get('&page=1')
      .then(response => {
        data = data.concat(response.data.results);
        console.log(data.length);
        http
          .get('&page=2')
          .then(response => {
            data = data.concat(response.data.results);
            console.log(data.length);
            http
              .get('&page=3')
              .then(response => {
                data = data.concat(response.data.results);
                console.log(data.length);
                http
                  .get('&page=4')
                  .then(response => {
                    data = data.concat(response.data.results);
                    console.log(data.length);
                    http
                      .get('&page=5')
                      .then(response => {
                        data = data.concat(response.data.results);
                        console.log(data.length);
                        db.query("CREATE DATABASE IF NOT EXISTS candidate_leek", function (err, result) {
                          if (err) {
                            throw err;
                          }
                          else console.log(result);
                        });
                        var sql = "CREATE TABLE if not exists `movies` (`id` int(11) NOT NULL,`adult` varchar(10) DEFAULT NULL,`backdrop_path` varchar(100) DEFAULT NULL, `genre_ids` text, `original_language` varchar(20) DEFAULT NULL,`original_title` varchar(100) DEFAULT NULL,`overview` text,`popularity` decimal(10,6) DEFAULT NULL,`poster_path` varchar(100) DEFAULT NULL, `release_date` datetime DEFAULT NULL, `title` varchar(100) DEFAULT NULL, `video` varchar(10) DEFAULT NULL, `vote_average` decimal(4,2) DEFAULT NULL, `vote_count` int(11) DEFAULT NULL, PRIMARY KEY (`id`))";
                        var addToDb = function (time, callback) {
                          console.log("adding to db");
                          for (var i = 0; i < data.length; i++) {
                            flattenedData.push([data[i].id, data[i].adult, data[i].backdrop_path, JSON.stringify(data[i].genre_ids), data[i].original_language, data[i].original_title, data[i].overview, data[i].popularity, data[i].poster_path, data[i].release_date, data[i].title, data[i].video, data[i].vote_average, data[i].vote_count]);
                            //console.log(flattenedData);
                          }
                          db.query("INSERT INTO movies (id, adult, backdrop_path, genre_ids,  original_language, original_title, overview, popularity, poster_path, release_date, title, video, vote_average, vote_count ) values ? ON DUPLICATE KEY UPDATE adult=VALUES(adult), backdrop_path=VALUES(backdrop_path), genre_ids=VALUES(genre_ids), original_language=VALUES(original_language),original_title=VALUES(original_title), overview=VALUES(overview),popularity=VALUES(popularity), poster_path=VALUES(poster_path),release_date=VALUES(release_date), title=VALUES(title), video=VALUES(video), vote_average=VALUES(vote_average), vote_count=VALUES(vote_count)", [flattenedData], function (err, result) {
                            if (err) {
                              throw err;
                            }
                            else {
                              console.log('data inserted' + result);
                            }
                          });
                        };
                        db.query(sql, function (err, result) {
                          if (err) {
                            throw err;
                          }
                          else {
                            console.log("table created" + result);
                            addToDb();
                          }
                        });
                      })
                      .catch(error => {
                        console.log(error.message);
                      });
                  })
                  .catch(error => {
                    console.log(error.message);
                  });
              })
              .catch(error => {
                console.log(error.message);
              });
          })
          .catch(error => {
            console.log(error.message);
          });
      })
      .catch(error => {
        console.log(error.message);
      });
  }
};
module.exports = Gather;