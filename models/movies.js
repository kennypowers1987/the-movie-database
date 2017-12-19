var db = require('../config/connection.js'); //reference of dbconnection.js  
var Price = {
  getAllMovies: function (callback) {
    return db.connect(function (err) {
      if (err)
        throw err
      else {
        db.query("Select * from movies", callback);
      }
    })
  },
  getMovieById: function (id, callback) {
    return db.connect(function (err) {
      if (err)
        throw err
      else {
        db.query("select * from movies where id=?", [id], callback);
      }
    })
  }
};
module.exports = Price;