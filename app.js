var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var cors = require('cors');
var Movies = require('./routes/movies');
var Gather = require('./routes/gather');
var app = express();
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use('/display', express.static(path.join(__dirname, 'public')));
app.use('/gather', Gather);
app.use('/movies', Movies);
app.use(function (req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
if (app.get('env') === 'development') {
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
};
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    message: err.message,
    error: err
  });
});
app.listen(8081, () => console.log('Example app listening on port 8081!'))
module.exports = app;