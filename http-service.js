var axios = require("axios");
const url = "https://api.themoviedb.org/3/movie/76341?api_key=2a50cf9123dfee853fd0b0a451cce6b3";
var HTTP = axios.create({
    baseURL: url,
});
module.exports = HTTP;