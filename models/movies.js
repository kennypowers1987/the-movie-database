var db = require('../config/connection.js'); //reference of dbconnection.js  
var Price = {  
    getAllMovies: function(callback) {  
        return db.query("Select * from movies", callback);  
    },  
    getMovieById: function(time, callback) {  
        return db.query("select * from movies where id=?", [id], callback);  
    }    
};  
module.exports = Price;