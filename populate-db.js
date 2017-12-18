var http = require("./http-service.js");

http
  .get()
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.log(error);
  });