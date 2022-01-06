const router = require("express").Router();
const Movies = require("../models/Movie.model");
const mongoose = require("mongoose");

// console.log(router);

router.get("/movielist", (req, res) => {
  //what we see on the url
  Movies.find()
    .then((dbResponse) => {
      console.log("Database response:", dbResponse);
      res.render("movies/moviesList", {
        movies: dbResponse,
      });
    })
    .catch((e) => console.error(e));
});

router.get("/movies/:id", (req, res, next) => {
  const isValidId = mongoose.isValidObjectId(req.params.id);
  const id = req.params.id;
  if (isValidId) {
    Movies.findById(id)
      .then((movie) => {
        console.log("Movie's detail:", movie);
        res.render("movies/oneMovie", {
          movie: movie,
        });
      })
      .catch((e) => console.error(e));
  } else {
    next();
  }
});

module.exports = router;
