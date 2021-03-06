var Movie = require('../models/movie');
var Actor = require('../models/actor');

module.exports = {

  getAll: function(req, res, next) {
    Movie.find(function(err, movies) {
      if (err) return res.status(400).json(err);

      res.status(200).json(movies);
    });
  },


  createOne: function(req, res, next) {
    req.checkBody('title', 'Title should not be empty').notEmpty(); 
    req.checkBody('year', 'Invalid year').notEmpty().isInt();
    var errors = req.validationErrors();
    if (errors) {
    console.log("checkBody  errors");
    return next(errors);
    }
    else {
  Movie.create(req.body, function(err, movie) {

      if (err) return res.status(400).json(err);

      res.status(201).json(movie);
    });
}
    
  },


  getOne: function(req, res, next) {
    Movie.findOne({ id: req.params.id })
    .populate('actors')
    .exec(function(err, movie) {
      if (err) return res.status(400).json(err);
      if (!movie) return res.status(404).json();

      res.status(200).json(movie);
    });
  },


  updateOne: function(req, res, next) {
    Movie.findOneAndUpdate({ id: req.params.id }, req.body, function(err, movie) {
      if (err) return res.status(400).json(err);
      if (!movie) return res.status(404).json();

      res.status(200).json(movie);
    });
  },


  deleteOne: function(req, res, next) {
    Movie.findOneAndRemove({ id: req.params.id }, function(err) {
      if (err) return res.status(400).json(err);

      res.status(204).json();
    });
  },


  addActor: function(req, res, next) {
    Movie.findOne({ id: req.params.id }, function(err, movie) {
      if (err) return res.status(400).json(err);
      if (!movie) return res.status(404).json();

      Actor.findOne({ id: req.body.id }, function(err, actor) {
        if (err) return res.status(400).json(err);
        if (!actor) return res.status(404).json();

        movie.actors.push(actor);
        movie.save(function(err) {
          if (err) return res.status(500).json(err);

          res.status(201).json(movie);
        });
      })
    });
  },


  deleteActor: function(req, res, next) {
    Movie.findOne({ id: req.params.id }, function(err, movie) {
      console.log('actor => '+ req.params.id);
      if (err) return res.status(400).json(err);
      if (!movie) return res.status(404).json();
      Actor.findOne({ id: req.body.id }, function(err, actor) {
        console.log('movie => '+ req.body.id);
        if (err) return res.status(400).json(err);
        if (!actor) return res.status(404).json();

        movie.actors.remove(actor);
        movie.save(function(err) {
          if (err) return res.status(500).json(err);

          res.status(201).json(movie);
        });

     
    });
  });

}
}

