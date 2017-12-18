var axios = require("axios");
const url = "https://api.themoviedb.org/3/discover/movie?&api_key=2a50cf9123dfee853fd0b0a451cce6b3&certification=R&primary_release_year=2015&with_genres=878&sort_by=popularity.desc";
var HTTP = axios.create({
    baseURL: url,
});
module.exports = HTTP;