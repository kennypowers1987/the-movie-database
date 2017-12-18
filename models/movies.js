var db = require('../connection.js'); //reference of dbconnection.js  
var Movie = {  
    getAllMovies: function(callback) {  
        return db.query("Select * from movies", callback);  
    },  
    getMovieById: function(id, callback) {  
        return db.query("select * from movies where id=?", [id], callback);  
    },
};  
module.exports = Movie;