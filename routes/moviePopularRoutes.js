const express = require('express');
const PopularMovie = require('../models/PopularMovie');
const router = express.Router();

// Lấy tất cả phim từ cả 2 danh mục
router.get('/', async (req, res) => {
  try {
    const popularMovies = await PopularMovie.find();
    res.json(popularMovies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', async (req, res) => {
    // Kiểm tra nếu req.body là một mảng
    const movies = Array.isArray(req.body) ? req.body : [req.body];
  
    try {
      // Sử dụng Promise.all để lưu từng phim trong mảng và đợi tất cả hoàn tất
      const newMovies = await Promise.all(
        movies.map(async (movieData) => {
          const movie = new PopularMovie(movieData);
          return await movie.save();
        })
      );
  
      res.status(201).json(newMovies);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

// Xóa phim theo ID
router.delete('/:_id', async (req, res) => {
  try {
    const movie = await PopularMovie.findByIdAndDelete(req.params._id);
    if (!movie) return res.status(404).json({ message: 'Không tìm thấy phim' });
    res.json({ message: 'Phim đã được xóa' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// PUT: Cập nhật phim theo ID trong danh mục Movie
router.put('/:_id', async (req, res) => {
  try {
    const updatedMovie = await PopularMovie.findByIdAndUpdate(
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

module.exports = router;
