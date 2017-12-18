var express = require('express');
var router = express.Router();
var Movie = require('../models/Movies');
router.get('/:id?', function (req, res, next) {
  if (req.params.id) {
    Movie.getMovieById(req.params.time, function (err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  } else {
    Movie.getAllMovies(function (err, rows) {
      if (err) {
        res.json(err);
      } else {
        res.json(rows);
      }
    });
  }
});

module.exports = router;