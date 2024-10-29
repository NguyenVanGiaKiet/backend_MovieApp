const express = require('express');
const Movie = require('../models/Movie');
const PopularMovie = require('../models/PopularMovie');
const TopRatedMovie = require('../models/TopRatedMovie');
const router = express.Router();

// Lấy tất cả phim từ cả 2 danh mục
router.get('/', async (req, res) => {
  try {
    const popularMovies = await PopularMovie.find();
    const topRatedMovies = await TopRatedMovie.find();
    const movies = await Movie.find();
    const allMovies = [...popularMovies, ...topRatedMovies, ...movies];
    res.json(allMovies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});


// Lấy danh sách phim popular
router.get('/popular', async (req, res) => {
  try {
    const movies = await PopularMovie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Lấy danh sách phim toprated
router.get('/toprated', async (req, res) => {
  try {
    const movies = await TopRatedMovie.find();
    res.json(movies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
  const movie = new Movie(req.body);
  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Thêm phim vào danh sách popular
router.post('/popular', async (req, res) => {
  const movie = new PopularMovie(req.body);
  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Thêm phim vào danh sách toprated
router.post('/toprated', async (req, res) => {
  const movie = new TopRatedMovie(req.body);
  try {
    const newMovie = await movie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Xóa phim theo ID
router.delete('/:_id', async (req, res) => {
  try {
    const movie = await Movie.findByIdAndDelete(req.params._id);
    if (!movie) return res.status(404).json({ message: 'Không tìm thấy phim' });
    res.json({ message: 'Phim đã được xóa' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/popular/:_id', async (req, res) => {
  try {
    const movie = await PopularMovie.findByIdAndDelete(req.params._id);
    if (!movie) return res.status(404).json({ message: 'Không tìm thấy phim' });
    res.json({ message: 'Phim đã được xóa' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/toprated/:_id', async (req, res) => {
  try {
    const movie = await TopRatedMovie.findByIdAndDelete(req.params._id);
    if (!movie) return res.status(404).json({ message: 'Không tìm thấy phim' });
    res.json({ message: 'Phim đã được xóa' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Cập nhật phim theo ID trong danh mục Movie
router.put('/:_id', async (req, res) => {
  try {
    const updatedMovie = await Movie.findByIdAndUpdate(
      req.params._id,
      req.body,
      { new: true } // Trả về đối tượng đã được cập nhật
    );
    if (!updatedMovie) return res.status(404).json({ message: 'Không tìm thấy phim' });
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Cập nhật phim trong danh mục PopularMovie
router.put('/popular/:_id', async (req, res) => {
  try {
    const updatedMovie = await PopularMovie.findByIdAndUpdate(
      req.params._id,
      req.body,
      { new: true }
    );
    if (!updatedMovie) return res.status(404).json({ message: 'Không tìm thấy phim' });
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Cập nhật phim trong danh mục TopRatedMovie
router.put('/toprated/:_id', async (req, res) => {
  try {
    const updatedMovie = await TopRatedMovie.findByIdAndUpdate(
      req.params._id,
      req.body,
      { new: true }
    );
    if (!updatedMovie) return res.status(404).json({ message: 'Không tìm thấy phim' });
    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
