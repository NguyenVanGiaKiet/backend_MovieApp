const mongoose = require('mongoose');

const popularMovieSchema = new mongoose.Schema({
  id: String,
  name_movie: String,
  time: String,
  director: String,
  actor: String,
  list: String,
  category: String,
  year: Number,
  nation: String,
  poster_path: String,
  videoUrl: [
    {
      tap: String,
      url: String,
    }
  ]
});

module.exports = mongoose.model('PopularMovie', popularMovieSchema);
