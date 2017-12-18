
var express = require('express');
var router = express.Router();
var Gather = require('../models/Gather');
router.get('/', function (req, res, next) {
  Gather.getAllMovies(req.params.time, function (err, rows) {
    if (err) {
      res.json(err);
    } else {
      res.json(rows);
      Gather.addToDb();
    }
  });

});

module.exports = router;